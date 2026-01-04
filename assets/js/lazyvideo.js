/**
 * Lazy Video Loader - Optimized for Hugo ESBuild
 * * This script prevents videos from downloading until they are about 
 * to enter the user's viewport, saving bandwidth and improving load speed.
 */

// 1. GLOBAL GUARD: Prevents the script from running multiple times if 
// the user navigates back and forth (useful for single-page-app transitions).
if (window.lazyVideoInitialized) {
    console.log("Lazy video script already running.");
} else {
    window.lazyVideoInitialized = true;

    /**
     * The core logic to detect and load videos.
     */
    const initLazyVideos = () => {
        // Find all video elements that we've marked for lazy loading in Hugo
        const lazyVideos = document.querySelectorAll("video.lazy-video");

        // 2. FEATURE DETECTION: Check if the browser supports IntersectionObserver.
        if ("IntersectionObserver" in window) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    
                    // 3. VISIBILITY CHECK: Is the video nearing the viewport?
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        
                        // 4. SOURCE SWAP: Iterate through the <source> tags.
                        // We use Array.from() so we can use modern .forEach on the children.
                        const sources = video.querySelectorAll("source");
                        sources.forEach((source) => {
                            if (source.dataset.src) {
                                source.src = source.dataset.src;
                            }
                        });

                        // 5. TRIGGER DOWNLOAD: Tell the browser to notice the new sources.
                        video.load();

                        // 6. WAIT for the video to actually start before removing blur
                        video.addEventListener('playing', () => {
                            // Remove the inline blur and transition style
                            video.style.removeProperty("filter");

                            // Remove transition after blur is gone to save GPU
                            setTimeout(() => video.style.removeProperty("transition"), 1000);
                        }, { once: true }); // Important: Only run this once per video load
                        
                        // 7. CLEANUP: Remove the class and stop watching this video.
                        video.classList.remove("lazy-video");
                        videoObserver.unobserve(video);
                    }
                });
            }, {
                // 8. BUFFER: "500px" means "start loading when the video is 500px below the screen."
                // This makes the load feel instant to the user.
                rootMargin: "0px 0px 500px 0px" 
            });

            // Start the guard for every video found
            lazyVideos.forEach((lazyVideo) => videoObserver.observe(lazyVideo));
        }
    };

    /**
     * 9. EXECUTION TIMING:
     * If the script is 'deferred' or 'async', it might arrive after the page is ready.
     * We check 'readyState' to ensure the script runs immediately if the page is already 
     * loaded, otherwise it waits for the 'DOMContentLoaded' event.
     */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLazyVideos);
    } else {
        initLazyVideos();
    }
}
