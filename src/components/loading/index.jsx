import "./style.scss";

export default function Loading() {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Đang tải...</p>
            </div>
        </div>
    );
} 