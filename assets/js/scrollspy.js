window.addEventListener('DOMContentLoaded', () => {
  let activeId = null;
  let scrollTimeout = null; // Holder for the debounce timer
  const blogContent = document.getElementById('blog-content');
  const tocNav = document.querySelector('.toc-nav');
  
  if (!blogContent || !tocNav) return;

  const TOP_OFFSET = 100; 

  const handleScroll = () => {
    // 1. Clear the timeout on every scroll event
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // 2. Perform the standard position check
    const headings = Array.from(blogContent.querySelectorAll('h2, h3'));
    const currentHeading = headings
      .filter(h => h.getBoundingClientRect().top <= TOP_OFFSET + 5)
      .pop();

    if (currentHeading) {
      const id = currentHeading.getAttribute('id');
      if (id !== activeId) {
        activeId = id;
        updateActiveLink(id);
      }
    }

    // 3. Set a "trailing" timer to catch the very end of the scroll
    scrollTimeout = setTimeout(() => {
      // Re-run the check one last time after scrolling stops
      const finalHeadings = Array.from(blogContent.querySelectorAll('h2, h3'));
      const finalHeading = finalHeadings
        .filter(h => h.getBoundingClientRect().top <= TOP_OFFSET + 5)
        .pop();
        
      if (finalHeading) {
        updateActiveLink(finalHeading.getAttribute('id'));
      }
    }, 100); // 100ms delay is usually imperceptible but saves frames
  };

  function updateActiveLink(id) {
    const allLinks = document.querySelectorAll('.toc-nav a');
    const targetLink = document.querySelector(`.toc-nav a[href="#${id}"]`);

    allLinks.forEach(link => link.classList.remove('active'));
    
    if (targetLink) {
      targetLink.classList.add('active');
      
      const parentLi = targetLink.closest('li');
      if (parentLi) {
        tocNav.scrollTo({
          top: parentLi.offsetTop - (tocNav.clientHeight / 2),
          behavior: 'smooth'
        });
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Cleanup for peace of mind
  window.addEventListener('unload', () => {
    window.removeEventListener('scroll', handleScroll);
    if (scrollTimeout) clearTimeout(scrollTimeout);
  }, { once: true });
});