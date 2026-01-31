/**
 * Lazy Video Loader - Powered by Lozad.js
 * Handles: Lazy loading, play/pause on scroll, and blur-to-clear transitions.
 */
import lozad from 'lozad';

if (window.lazyVideoInitialized) {
    console.log("Lazy video script already running.");
} else {
    window.lazyVideoInitialized = true;

    const observer = lozad('.lozad', {
        rootMargin: '500px 0px', // Buffer: Starts loading 500px before entry
        threshold: 0,            // Trigger as soon as the first pixel enters the buffer
        load: function(el) {
            /**
             * PHASE 1: INITIAL LOAD
             * Lozad handles the source swapping automatically, but we call el.load()
             * to ensure the browser realizes new sources are available.
             */
            const sources = el.querySelectorAll("source");
            sources.forEach((source) => {
                if (source.dataset.src) {
                    source.src = source.dataset.src;
                }
            });
            el.load();
            el.dataset.activated = "true";

            // PHASE 2: VISIBLE-ONLY POLLING
            // We check for playback/blur removal only when the video is actually seen
            let blurCheck = setInterval(() => {
                const rect = el.getBoundingClientRect();
                const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

                // Only remove blur if it's on screen AND has started moving
                if (inViewport && el.currentTime > 0 && !el.paused) {
                    el.style.removeProperty("filter");
                    setTimeout(() => el.style.removeProperty("transition"), 1000);
                    clearInterval(blurCheck);
                }
            }, 250);
            
            setTimeout(() => clearInterval(blurCheck), 4000);
        },
        loaded: function(el) {
            /**
             * PHASE 3: PLAYBACK
             * Attempt to play as soon as Lozad marks the element as loaded.
             */
            el.play().catch(() => {
                console.warn("Autoplay prevented for video:", el);
            });
        }
    });

    observer.observe();

    /**
     * PHASE 4: PAUSE ON SCROLL
     * Lozad focuses on loading; we handle the power-saving pause/play toggle here.
     */
    window.addEventListener('scroll', () => {
        document.querySelectorAll('video.lazy-video').forEach(video => {
            const rect = video.getBoundingClientRect();
            // Use the standard AND logic for viewport overlap
            const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (inViewport && video.dataset.activated === "true") {
                video.play().catch(() => {});
            } else if (video.dataset.activated === "true") {
                video.pause();
            }
        });
    }, { passive: true });
}