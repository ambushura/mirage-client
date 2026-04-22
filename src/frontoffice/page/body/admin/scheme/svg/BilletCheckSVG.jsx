export function BilletCheckSVG() {
    return <svg width="200" height="160" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="screenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0af"/>
                <stop offset="100%" stopColor="#004080"/>
            </linearGradient>
        </defs>
        <rect x="70" y="30" width="60" height="100" rx="12" ry="12" fill="#222" stroke="#000"
              strokeWidth="2"/>
        <rect x="76" y="38" width="48" height="84" rx="6" ry="6" fill="url(#screenGradient)"
              stroke="#003366" strokeWidth="1"/>
        <rect x="92" y="34" width="16" height="3" rx="1" fill="#555"/>
        <circle cx="100" cy="135" r="3.5" fill="#888"/>
    </svg>
}