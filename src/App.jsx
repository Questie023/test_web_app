import { useState, useRef, useEffect } from "react";

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
    const isScrolling = useRef(false);
    const containerRef = useRef(null);
    const videosCount = videos.length;

    const scrollTo = (direction) => {
        if (isScrolling.current) return;
        isScrolling.current = true;

        setCurrentIndex((i) =>
            (i + direction + videosCount) % videosCount
        );

        setTimeout(() => {
            isScrolling.current = false;
        }, 600);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        scrollTo(e.deltaY > 0 ? 1 : -1);
    };

    useEffect(() => {
        let startY = 0;

        const onTouchStart = (e) => {
            startY = e.touches[0].screenY;
        };

        const onTouchEnd = (e) => {
            const deltaY = startY - e.changedTouches[0].screenY;
            if (Math.abs(deltaY) > 30) {
                scrollTo(deltaY > 0 ? 1 : -1);
            }
        };

        const el = containerRef.current;
        el.addEventListener("touchstart", onTouchStart);
        el.addEventListener("touchend", onTouchEnd);

        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, [videosCount]);

    const getIndex = (offset) =>
        (currentIndex + offset + videosCount) % videosCount;

    return (
        <div
            ref={containerRef}
            className="viewport"
            onWheel={handleWheel}
            tabIndex={0}
        >
            {[-1, 0, 1].map((pos) => {
                const video = videos[getIndex(pos)];
                return (
                    <div
                        key={video.src}
                        className="video-slide"
                        style={{
                            transform: `translateY(${pos * 100}vh)`,
                            transition: "transform 0.6s ease",
                            zIndex: pos === 0 ? 10 : 1,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            overflow: "hidden",
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
