import { useEffect, useRef, useState } from "react";

export default function useInfiniteScroll(videoCount) {
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(videoCount);

    useEffect(() => {
        const container = containerRef.current;
        container.style.transform = `translateY(-${currentIndex * 100}vh)`;

        let startY = 0;
        let endY = 0;

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            endY = e.changedTouches[0].clientY;
            const delta = endY - startY;

            if (Math.abs(delta) > 50) {
                const direction = delta > 0 ? -1 : 1;
                scrollTo(currentIndex + direction);
            }
        };

        const scrollTo = (newIndex) => {
            const container = containerRef.current;
            container.style.transition = "transform 0.3s ease";
            container.style.transform = `translateY(-${newIndex * 100}vh)`;
            setCurrentIndex(newIndex);

            setTimeout(() => {
                container.style.transition = "none";

                if (newIndex >= videoCount * 2) {
                    setCurrentIndex(videoCount);
                    container.style.transform = `translateY(-${videoCount * 100}vh)`;
                } else if (newIndex < videoCount) {
                    const resetIndex = videoCount + (newIndex % videoCount);
                    setCurrentIndex(resetIndex);
                    container.style.transform = `translateY(-${resetIndex * 100}vh)`;
                }
            }, 350);
        };

        container.addEventListener("touchstart", handleTouchStart);
        container.addEventListener("touchend", handleTouchEnd);

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, [currentIndex, videoCount]);

    return { containerRef, currentIndex };
}
