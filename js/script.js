// Explore Events button -> smooth scroll to events section (Home page only)
const exploreBtn = document.getElementById('exploreBtn');
const eventsSection = document.getElementById('eventsSection');

if (exploreBtn && eventsSection) {
    exploreBtn.addEventListener('click', function () {
        eventsSection.scrollIntoView({ behavior: 'smooth' });
    });
}


// ===== Mobile navbar (hamburger + slide-in menu) =====

const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');
const navOverlay = document.getElementById('navOverlay');

if (hamburgerBtn && mobileNav && navOverlay) {

    function openMenu() {
        mobileNav.classList.add('open');
        navOverlay.classList.add('show');
        hamburgerBtn.classList.add('open');
    }

    function closeMenu() {
        mobileNav.classList.remove('open');
        navOverlay.classList.remove('show');
        hamburgerBtn.classList.remove('open');
    }

    hamburgerBtn.addEventListener('click', function () {
        // If menu is already open, close it. Otherwise open it.
        if (mobileNav.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Tapping the dark overlay closes the menu
    navOverlay.addEventListener('click', closeMenu);

    // Tapping any link inside the menu closes it too
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    for (let i = 0; i < mobileNavLinks.length; i++) {
        mobileNavLinks[i].addEventListener('click', closeMenu);
    }
}


// ===== Events search/filter (Events page only) =====

function filter() {
    const searchInput = document.getElementById('eventSearchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearSearchBtn');
    const categoryFilter = document.getElementById('categoryFilter');
    const noResults = document.getElementById('noResults');

    if (!searchInput || !categoryFilter) return;

    const cards = Array.from(document.querySelectorAll('.eventCard'));

    function applyFilters() {
        const query = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;
        let visibleCount = 0;

        cards.forEach(card => {
            const matchesSearch = card.dataset.name.includes(query);
            const matchesCategory = !category || card.dataset.category === category;
            const show = matchesSearch && matchesCategory;
            card.classList.toggle('hidden', !show);
            if (show) visibleCount++;
        });

        noResults.classList.toggle('show', visibleCount === 0);
        clearBtn.classList.toggle('show', query.length > 0);
    }

    searchInput.addEventListener('input', applyFilters);
    searchBtn.addEventListener('click', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        applyFilters();
        searchInput.focus();
    });
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyFilters();
    });

    applyFilters();
}

filter();