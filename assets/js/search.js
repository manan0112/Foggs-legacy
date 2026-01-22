document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('[data-pub-search]');
  const rows = Array.from(document.querySelectorAll('[data-pub-row]'));

  if (!searchInput || !rows.length) return;

  const normalize = (text) => text.toLowerCase();

  searchInput.addEventListener('input', () => {
    const term = normalize(searchInput.value || '');
    rows.forEach((row) => {
      const title = normalize(row.dataset.title || '');
      const year = normalize(row.dataset.year || '');
      const match = title.includes(term) || year.includes(term);
      row.style.display = match ? '' : 'none';
    });
  });
});
