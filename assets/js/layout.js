// Inject shared header and footer fragments, then set the active nav link.
(async function injectLayout() {
  const headerHost = document.querySelector('[data-include="header"]');
  const footerHost = document.querySelector('[data-include="footer"]');

  await Promise.all([
    maybeInject(headerHost, 'assets/includes/header.html'),
    maybeInject(footerHost, 'assets/includes/footer.html')
  ]);

  setActiveNav();

  async function maybeInject(host, url) {
    if (!host) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
      host.innerHTML = await res.text();
    } catch (err) {
      console.error(err);
    }
  }

  function setActiveNav() {
    const current = currentPage();
    document.querySelectorAll('.nav-links a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === current) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function currentPage() {
    const name = window.location.pathname.split('/').pop() || 'index.html';
    return name === '' ? 'index.html' : name;
  }
})();
