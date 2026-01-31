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
                    
                    // Check if the video is actually inside the physical viewport
                    const rect = entry.boundingClientRect;
                    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

                    if (entry.isIntersecting) {
                        /**
                         * PHASE 1: INITIAL LOAD
                         * If the video hasn't been "activated" yet, swap data-src to src.
                         * This triggers early due to the 500px rootMargin.
                         */
                        if (video.dataset.activated !== "true") {
                            const sources = video.querySelectorAll("source");
                            sources.forEach((source) => {
                                if (source.dataset.src) {
                                    source.src = source.dataset.src;
                                }
                            });

                            video.load();
                            video.dataset.activated = "true";

                            // Only remove blur once the video is actually moving
                            video.addEventListener('playing', () => {
                                video.style.removeProperty("filter");
                                // Clean up transition to free up GPU resources
                                setTimeout(() => video.style.removeProperty("transition"), 1000);
                            }, { once: true });
                        }

                        /**
                         * PHASE 2: PLAYBACK
                         * Play the video when it enters the viewport.
                         * Logic fix: Only call .play() if it's actually in the viewport to avoid 
                         * mobile browsers "freezing" the stream before it's seen.
                         */
                        if (inViewport) {
                            const playPromise = video.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(() => {
                                    // Autoplay was prevented by browser policy
                                    console.warn("Autoplay prevented for video:", video);
                                });
                            }
                        }

                    } else {
                        /**
                         * PHASE 3: PAUSE
                         * Stop the video when it leaves the viewport to save CPU/Battery.
                         * Only pause if the video has already been activated.
                         */
                        if (video.dataset.activated === "true") {
                            video.pause();
                        }
                    }
                });
            }, {
                // Buffer: Starts loading 500px before entry, but toggles play/pause accurately
                rootMargin: "0px 0px 500px 0px",
                // Added 0 to threshold to ensure the observer fires as soon as the rootMargin is hit
                threshold: [0, 0.1] 
            });

            lazyVideos.forEach((lazyVideo) => videoObserver.observe(lazyVideo));
        }
    };

    // Execution Timing
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLazyVideos);
    } else {
        initLazyVideos();
    }
}