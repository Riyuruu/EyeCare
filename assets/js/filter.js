document.addEventListener("DOMContentLoaded", function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.item');

    let activeCategory = null;
    let activeTags = [];

    function updateFilters(filterType, filterValue, isActive) {
        if (filterType === 'category') {
            // Clear other category filters
            document.querySelectorAll('[data-filter-type="category"]').forEach(btn => btn.classList.remove('pressed'));

            if (isActive) {
                activeCategory = filterValue === 'all' ? null : filterValue;
            } else {
                activeCategory = null;
            }
        } else if (filterType === 'tag') {
            if (isActive) {
                activeTags.push(filterValue);
            } else {
                activeTags = activeTags.filter(tag => tag !== filterValue);
            }
        }
    }

    function applyFilters() {
        items.forEach(item => {
            const itemCategories = item.classList;
            const itemTags = item.classList;
            
            const matchesCategory = !activeCategory || itemCategories.contains(activeCategory);
            const matchesTag = activeTags.length === 0 || activeTags.some(tag => itemTags.contains(tag));
            
            item.classList.toggle('hidden', !(matchesCategory && matchesTag));
        });
    }

    filterBtns.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = button.id.split('-')[1];
            const filterType = button.getAttribute('data-filter-type');
            const isActive = button.classList.toggle('pressed');

            updateFilters(filterType, filterValue, isActive);
            applyFilters();
        });
    });

    // Initialize by setting all items visible
    applyFilters();
});
