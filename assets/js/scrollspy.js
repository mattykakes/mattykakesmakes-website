window.addEventListener('DOMContentLoaded', () => {
  let activeId = null;
  let scrollTimeout = null;
  const blogContent = document.getElementById('blog-content');
  const tocNav = document.querySelector('.toc-nav');
  
  if (!blogContent || !tocNav) return;

  const TOP_OFFSET = 100; 

  // 1. Move the logic into a standalone function
  const calculateActiveSection = () => {
    const headings = Array.from(blogContent.querySelectorAll('h2, h3'));
    if (headings.length === 0) return;

    // Check if we are at the bottom of the page
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 25);
    
    let currentHeading;

    if (isAtBottom) {
      currentHeading = headings[headings.length - 1];
    } else {
      currentHeading = headings
        .filter(h => h.getBoundingClientRect().top <= TOP_OFFSET + 5)
        .pop();
    }

    if (currentHeading) {
      const id = currentHeading.getAttribute('id');
      if (id !== activeId) {
        activeId = id;
        updateActiveLink(id);
      }
    }
  };

  const handleScroll = () => {
    // Run immediately for responsiveness
    calculateActiveSection();

    // Debounce a final check to catch the "end" of the scroll momentum
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(calculateActiveSection, 150);
  };

  function updateActiveLink(id) {
    const allLinks = document.querySelectorAll('.toc-nav a');
    const targetLink = document.querySelector(`.toc-nav a[href="#${id}"]`);

    allLinks.forEach(link => link.classList.remove('active'));
    
    if (targetLink) {
      targetLink.classList.add('active');
      const parentLi = targetLink.closest('li');
      if (parentLi) {
        // Only scroll the TOC if it's actually overflowing
        tocNav.scrollTo({
          top: parentLi.offsetTop - (tocNav.clientHeight / 2),
          behavior: 'smooth'
        });
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  calculateActiveSection(); // Run once on load
});