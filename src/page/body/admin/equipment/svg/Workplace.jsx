export function Workplace() {
    return <svg width="200" height="180" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="screenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1EC7D3"/>
                <stop offset="100%" stopColor="#007D85"/>
            </linearGradient>
        </defs>
        <rect x="40" y="40" width="120" height="70" rx="6" ry="6" fill="#333" stroke="#111"
              strokeWidth="2"/>
        <rect x="50" y="50" width="100" height="50" fill="url(#screenGradient)" stroke="#006"
              strokeWidth="1"/>
        <rect x="90" y="112" width="20" height="10" fill="#444"/>
        <rect x="80" y="122" width="40" height="10" rx="2" ry="2" fill="#555"/>
        <rect x="50" y="140" width="100" height="20" rx="3" ry="3" fill="#666"/>
        <line x1="55" y1="145" x2="145" y2="145" stroke="#999" strokeWidth="1"/>
        <line x1="55" y1="150" x2="145" y2="150" stroke="#999" strokeWidth="1"/>
        <line x1="55" y1="155" x2="145" y2="155" stroke="#999" strokeWidth="1"/>
    </svg>
}