import { useState, useEffect, useRef } from "react";

const videos = [
    {
        src: "/video1.mp4",
        author: "@naturegirl",
        description: "Чай з видом на гори",
        music: "Relaxing Beats 🎵",
        likes: 1240,
        comments: 87,
    },
    {
        src: "/video2.mp4",
        author: "@greentea",
        description: "Процес заварювання",
        music: "Boil & Chill 🔥",
        likes: 830,
        comments: 54,
    },
    {
        src: "/video3.mp4",
        author: "@tealover",
        description: "Справжня насолода",
        music: "Ambient Chill 🍃",
        likes: 980,
        comments: 61,
    },
    {
        src: "/video4.mp4",
        author: "@zenmode",
        description: "Спокій у кожному ковтку",
        music: "Peace & Tea ☕",
        likes: 1570,
        comments: 102,
    },
];

export default function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const isScrolling = useRef(false);

    // Плавний перехід на наступне/попереднє відео
    const scrollHandler = (e) => {
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;

        if (e.deltaY > 0) {
            // вниз
            setCurrentIndex((i) => (i + 1) % videos.length);
        } else {
            // вверх
            setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);
        }

        setTimeout(() => {
            isScrolling.current = false;
        }, 600);
    };

    // Обробка свайпів (мобільні)
    useEffect(() => {
        let touchStartY = 0;
        let touchEndY = 0;

        function onTouchStart(e) {
            touchStartY = e.changedTouches[0].screenY;
        }
        function onTouchEnd(e) {
            touchEndY = e.changedTouches[0].screenY;
            if (isScrolling.current) return;
            if (touchStartY - touchEndY > 30) {
                isScrolling.current = true;
                setCurrentIndex((i) => (i + 1) % videos.length);
                setTimeout(() => (isScrolling.current = false), 600);
            } else if (touchEndY - touchStartY > 30) {
                isScrolling.current = true;
                setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);
                setTimeout(() => (isScrolling.current = false), 600);
            }
        }

        const el = containerRef.current;
        el.addEventListener("touchstart", onTouchStart);
        el.addEventListener("touchend", onTouchEnd);

        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            onWheel={scrollHandler}
            className="viewport"
            tabIndex={0}
        >
            {videos.map((video, i) => {
                // Визначаємо позицію відео для анімації
                let pos = (i - currentIndex) * 100;
                if (pos < -100) pos += videos.length * 100;
                if (pos > (videos.length - 1) * 100) pos -= videos.length * 100;

                return (
                    <div
                        key={video.src}
                        className="video-slide"
                        style={{
                            transform: `translateY(${pos}vh)`,
                            transition: "transform 0.6s ease",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            overflow: "hidden",
                            zIndex: i === currentIndex ? 10 : 1,
                        }}
                    >
                        <video
                            src={video.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="video"
                        />
                        <div className="video-overlay">
                            <div className="video-info">
                                <p className="author">{video.author}</p>
                                <p className="description">{video.description}</p>
                                <p className="music">🎵 {video.music}</p>
                            </div>
                            <div className="video-actions">
                                <div>❤️ {video.likes}</div>
                                <div>💬 {video.comments}</div>
                                <div>🔗</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
