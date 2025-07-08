import { useRef, useEffect } from "react";

export default function VideoItem({ src, autoPlay }) {
    const ref = useRef(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;

        if (autoPlay) {
            video.play().catch(() => {});
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [autoPlay]);

    return (
        <div className="video">
            <video
                ref={ref}
                src={src}
                className="video-content"
                muted
                loop
                playsInline
            />
        </div>
    );
}
