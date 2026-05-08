(() => {
  const section = document.querySelector('section[aria-label="Newsletters"]');
  if (!section) return;

  section.addEventListener('click', (event) => {
    const link = event.target.closest('a[target="_blank"]');
    if (!link) return;
    event.preventDefault();

    const label = (link.textContent || '').trim();
    const href = link.href;
    const opened = window.open(href, '_blank');
    if (!opened) return;

    const setTitle = () => {
      try {
        opened.document.title = label;
      } catch (err) {
        // Ignore cross-origin or timing issues.
      }
    };

    opened.addEventListener('load', setTitle);

    // Fallback: poll a few times in case load fired before binding.
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      setTitle();
      if (attempts >= 20 || opened.closed) {
        clearInterval(timer);
      }
    }, 100);
  });
})();
