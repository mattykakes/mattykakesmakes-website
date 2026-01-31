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

                    if (entry.isIntersecting) {
                        /**
                         * PHASE 1: INITIAL LOAD
                         * If the video hasn't been "activated" yet, swap data-src to src.
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
                         */
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => {
                                // Autoplay was prevented by browser policy (usually happens if not muted)
                                console.warn("Autoplay prevented for video:", video);
                            });
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
                threshold: 0.1 // Trigger when 10% of the video is visible
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