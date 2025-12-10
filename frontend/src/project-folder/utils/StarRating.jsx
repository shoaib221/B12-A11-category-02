import { useState } from "react";

export const StarRating = ({ value = 0, onChange }) => {
    const [hover, setHover] = useState(0);


    return (
        <div style={{ display: "flex", gap: "6px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    style={{
                        cursor: "pointer",
                        fontSize: "28px",
                        color: (hover || value) >= star ? "#facc15" : "#d1d5db",
                        transition: "color 0.2s",
                    }}
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};