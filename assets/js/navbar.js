document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.getElementById('menuItems');
  const iconOpen = mobileToggle.querySelector('.icon-hamburger');
  const iconClose = mobileToggle.querySelector('.icon-close');

  // Utility to toggle a menu
  function toggleMenu(menu, { open = null, toggleIcons = false, toggleAria = null } = {}) {
    const isCurrentlyHidden = menu.classList.contains('hidden');
    const shouldOpen = open !== null ? open : isCurrentlyHidden;

    menu.classList.toggle('hidden', !shouldOpen);

    if (toggleIcons) {
      iconOpen.classList.toggle('hidden', shouldOpen);
      iconClose.classList.toggle('hidden', !shouldOpen);
    }

    if (toggleAria !== null) {
      mobileToggle.setAttribute('aria-expanded', String(shouldOpen));
    }

    return shouldOpen;
  }

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    toggleMenu(mobileMenu, { toggleIcons: true, toggleAria: true });
  });

  // Cache all dropdown menus
  const allDropdownMenus = Array.from(document.querySelectorAll('[data-dropdown-menu]'));

  // Event delegation for dropdowns + click-away
  document.addEventListener('click', e => {
    const dropdownButton = e.target.closest('[data-dropdown-button]');
    const dropdown = e.target.closest('[data-dropdown]');

    // Click on a dropdown button
    if (dropdownButton && dropdown) {
      e.stopPropagation();
      const menu = dropdown.querySelector('[data-dropdown-menu]');

      // Close all other dropdowns
      allDropdownMenus.forEach(m => toggleMenu(m, { open: false }));

      // Toggle the clicked dropdown
      toggleMenu(menu);
      return;
    }

    // Click-away logic: close all dropdowns
    if (!dropdown) {
      allDropdownMenus.forEach(m => toggleMenu(m, { open: false }));
    }

    // Click-away for mobile menu
    const clickOutsideMobile = !e.target.closest('#menuItems') && !e.target.closest('[data-mobile-toggle]');
    if (clickOutsideMobile && !mobileMenu.classList.contains('hidden')) {
      toggleMenu(mobileMenu, { open: false, toggleIcons: true, toggleAria: true });
    }
  });
});
