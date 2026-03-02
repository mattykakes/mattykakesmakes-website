window.addEventListener('DOMContentLoaded', () => {
  let activeId = null;
  const blogContent = document.getElementById('blog-content');
  if (!blogContent) return;

  const observerOptions = {
    root: null,
    // Focus the "spy" area toward the top of the viewport
    rootMargin: '-10% 0px -80% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    // Collect all intersecting entries
    const intersectingEntries = entries.filter(entry => entry.isIntersecting);
    
    // If we have intersecting headings, pick the one furthest up the page
    if (intersectingEntries.length > 0) {
      const latestEntry = intersectingEntries[0];
      const id = latestEntry.target.getAttribute('id');

      if (id !== activeId) {
        activeId = id;
        updateActiveLink(id);
      }
    }
  }, observerOptions);

  function updateActiveLink(id) {
    const allLinks = document.querySelectorAll('.toc-nav a');
    const targetLink = document.querySelector(`.toc-nav a[href="#${id}"]`);

    allLinks.forEach(link => link.classList.remove('active'));
    if (targetLink) {
      targetLink.classList.add('active');
      
      // OPTIONAL: Smoothly scroll the TOC itself to keep active link in view
      const tocContainer = document.querySelector('.toc-nav');
      if (tocContainer) {
        tocContainer.scrollTo({
          top: targetLink.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    }
  }

  const headings = blogContent.querySelectorAll('h1, h2, h3, h4');
  headings.forEach(heading => observer.observe(heading));

  // Cleanup for peace of mind or future SPA transitions
  window.addEventListener('unload', () => {
    observer.disconnect();
  }, { once: true });
});