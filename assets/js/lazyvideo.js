/**
 * Lazy Video Loader - Optimized for Hugo ESBuild
 * Handles: Lazy loading, play/pause on scroll, and blur-to-clear transitions.
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
                    
                    // Foolproof Visibility Check: 
                    // This determines if ANY part of the video is currently in the window.
                    const rect = entry.boundingClientRect;
                    const inViewport = rect.top < window.innerHeight || rect.bottom > 0;

                    /**
                     * PHASE 1: INITIAL LOAD
                     * Use the 500px rootMargin to trigger the source swap early.
                     */
                    if (entry.isIntersecting && video.dataset.activated !== "true") {
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
                            setTimeout(() => video.style.removeProperty("transition"), 1000);
                        }, { once: true });
                    }

                    /**
                     * PHASE 2: PLAYBACK CONTROL
                     * We toggle playback based on actual viewport presence, regardless of the 'isIntersecting' 
                     * state (which includes the 500px buffer).
                     */
                    if (video.dataset.activated === "true") {
                        if (inViewport) {
                            // Video is on screen: attempt to play
                            const playPromise = video.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(() => {
                                    // Handle cases where browser blocks autoplay
                                });
                            }
                        } else {
                            // Video is off screen: force pause
                            video.pause();
                        }
                    }
                });
            }, {
                rootMargin: "0px 0px 500px 0px",
                // Passing multiple thresholds ensures the observer wakes up more often 
                // during the scroll, catching fast 'away-and-back' movements.
                threshold: [0, 0.25, 0.5, 0.75, 1.0] 
            });

            lazyVideos.forEach((lazyVideo) => videoObserver.observe(lazyVideo));
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLazyVideos);
    } else {
        initLazyVideos();
    }
}