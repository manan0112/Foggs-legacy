(() => {
  const target = document.getElementById('prg-initiatives-list');
  if (!target) return;

  fetch('assets/data/prg-initiatives.json')
    .then((resp) => resp.json())
    .then((items) => {
      target.innerHTML = '';
      items.forEach((item) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = item.title;

        if (item.external || /^https?:/i.test(item.url)) {
          link.target = '_blank';
          link.rel = 'noopener';
        }

        const dateText = document.createTextNode(` (${item.date})`);
        li.append(link, dateText);
        target.appendChild(li);
      });
    })
    .catch(() => {
      target.innerHTML = '<li>Unable to load initiatives right now.</li>';
    });
})();
