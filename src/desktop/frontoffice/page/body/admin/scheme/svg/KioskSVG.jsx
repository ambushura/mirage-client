export function KioskSVG() {
    return (
        <svg width="200" height="220" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="kioskScreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2DD9E8" />
                    <stop offset="100%" stopColor="#007D85" />
                </linearGradient>
            </defs>

            {/* Корпус киоска */}
            <rect x="60" y="20" width="80" height="160" rx="10" ry="10" fill="#444" stroke="#222" strokeWidth="2" />

            {/* Экран */}
            <rect x="70" y="35" width="60" height="60" rx="5" ry="5" fill="url(#kioskScreen)" stroke="#003" strokeWidth="1" />

            {/* Слот для чеков */}
            <rect x="85" y="105" width="30" height="6" rx="2" ry="2" fill="#222" />
            <rect x="90" y="111" width="20" height="4" fill="#ddd" />

            {/* Платёжный модуль */}
            <rect x="80" y="125" width="40" height="20" rx="4" ry="4" fill="#555" />
            <circle cx="120" cy="135" r="3" fill="#0f0" />
            <circle cx="115" cy="135" r="3" fill="#ff0" />
            <circle cx="110" cy="135" r="3" fill="#f00" />

            {/* Подставка */}
            <rect x="85" y="180" width="30" height="15" rx="3" ry="3" fill="#666" />
            <rect x="75" y="195" width="50" height="10" rx="2" ry="2" fill="#777" />

            {/* Тень */}
            <ellipse cx="100" cy="210" rx="40" ry="5" fill="rgba(0,0,0,0.2)" />
        </svg>
    )
}
