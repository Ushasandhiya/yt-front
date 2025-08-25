

// Sidebar toggle (mobile)
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Search filter
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const grid = document.getElementById('videoGrid');
const cards = Array.from(grid.querySelectorAll('.video-card'));
const noResults = document.getElementById('noResults');

function filterCards() {
  const q = searchInput.value.trim().toLowerCase();
  let shown = 0;

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const match = text.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) shown++;
  });

  noResults.hidden = shown !== 0;
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  filterCards();
});
searchInput.addEventListener('input', filterCards);

// Chip/category filtering
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const tag = chip.dataset.chip;
    if (tag === 'all') {
      cards.forEach(c => (c.style.display = ''));
      noResults.hidden = true;
      filterCards(); // respect current text query
      return;
    }

    let shown = 0;
    const q = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const tags = (card.dataset.tags || '').toLowerCase();
      const textMatch = card.innerText.toLowerCase().includes(q);
      const tagMatch = tags.split(/\s+/).includes(tag);
      const show = tagMatch && textMatch;
      card.style.display = show ? '' : 'none';
      if (show) shown++;
    });

    noResults.hidden = shown !== 0;
  });
});

// Accessible: pressing Enter in search already triggers submit; we also filter on input.