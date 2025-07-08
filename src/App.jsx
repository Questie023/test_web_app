export default function App() {
    return (
        <div style={{ height: "100vh", backgroundColor: "black" }}>
            <video
                src="https://storage.coverr.co/videos/coverr-woman-smiling-and-taking-a-selfie-1630/1080p.mp4"
                muted
                autoPlay
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        </div>
    );
}
