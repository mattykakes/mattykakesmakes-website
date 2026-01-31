/**
 * Lazy Video Loader - Powered by Lozad.js
 * Optimized for Firefox iOS and high-speed scrolling.
 */
import lozad from 'lozad';

if (window.lazyVideoInitialized) {
    console.log("Lazy video script already running.");
} else {
    window.lazyVideoInitialized = true;

    const observer = lozad('.lozad', {
        rootMargin: '500px 0px', 
        threshold: 0,
        load: function(el) {
            /**
             * PHASE 1: INITIAL ACTIVATION
             * Swap data-src to src and call load().
             */
            const sources = el.querySelectorAll("source");
            sources.forEach((source) => {
                if (source.dataset.src) {
                    source.src = source.dataset.src;
                }
            });
            el.load();
            el.dataset.activated = "true";
        },
        loaded: function(el) {
            /**
             * PHASE 2: BLUR REMOVAL & PLAYBACK
             * 'loaded' is called by Lozad as soon as the element is handled.
             */
            
            // Function to reveal the video
            const revealVideo = () => {
                el.style.removeProperty("filter");
                // Using a slight delay to ensure the transition feels smooth
                setTimeout(() => el.style.removeProperty("transition"), 1000);
            };

            // If the video is already ready to play, reveal it immediately
            if (el.readyState >= 3) {
                revealVideo();
            } else {
                // Otherwise, wait for the 'canplay' event
                el.addEventListener('canplay', revealVideo, { once: true });
            }

            el.play().catch(() => {
                // Fail-safe: if autoplay is blocked, we should still remove the blur 
                // so the user sees the poster clearly and can click to play.
                revealVideo();
            });
        }
    });

    observer.observe();

    /**
     * PHASE 3: GLOBAL SCROLL LISTENER
     * Handles the play/pause toggle based on viewport presence.
     */
    window.addEventListener('scroll', () => {
        document.querySelectorAll('video.lazy-video').forEach(video => {
            if (video.dataset.activated === "true") {
                const rect = video.getBoundingClientRect();
                const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (inViewport) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            }
        });
    }, { passive: true });
}