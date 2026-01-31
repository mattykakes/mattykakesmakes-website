/**
 * Lazy Video Loader - Fail-Safe Edition
 * Forces activation as soon as the buffer is hit.
 */

if (window.lazyVideoInitialized) {
    console.log("Lazy video script already running.");
} else {
    window.lazyVideoInitialized = true;

    const initLazyVideos = () => {
        const lazyVideos = document.querySelectorAll("video.lazy-video");

        if ("IntersectionObserver" in window) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    
                    // Logic: If it's intersecting the rootMargin (buffer), ACTIVATE it.
                    if (entry.isIntersecting) {
                        
                        // PHASE 1: FORCE SOURCE LOAD
                        if (video.dataset.activated !== "true") {
                            const sources = video.querySelectorAll("source");
                            sources.forEach((source) => {
                                if (source.dataset.src) {
                                    source.src = source.dataset.src;
                                }
                            });
                            video.load();
                            video.dataset.activated = "true";

                            video.addEventListener('playing', () => {
                                video.style.removeProperty("filter");
                            }, { once: true });
                        }

                        // PHASE 2: VISIBILITY CHECK FOR PLAYBACK
                        // We check the raw coordinates. 
                        // If top is less than bottom of screen AND bottom is greater than top of screen.
                        const rect = entry.boundingClientRect;
                        const trulyVisible = rect.top < window.innerHeight && rect.bottom > 0;

                        if (trulyVisible) {
                            video.play().catch(() => {});
                        } else {
                            video.pause();
                        }
                    } else {
                        // PHASE 3: OFF-SCREEN
                        // Video has left the 500px buffer entirely.
                        if (video.dataset.activated === "true") {
                            video.pause();
                        }
                    }
                });
            }, {
                rootMargin: "0px 0px 500px 0px",
                // We use 0 specifically so it triggers the INSTANT the buffer is touched.
                threshold: [0, 0.25, 0.5, 0.75, 1] 
            });

            lazyVideos.forEach((v) => videoObserver.observe(v));
        }
    };

    // Immediate execution check
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLazyVideos);
    } else {
        initLazyVideos();
    }
}