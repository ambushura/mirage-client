export function KitchenPoint() {
    return <svg width="150" height="150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="70" width="120" height="80" rx="8" ry="8" fill="#333" stroke="#111"
              strokeWidth="2"/>
        <path
            d="M60,40 h80 a4,4 0 0 1 4,4 v30 a4,4 0 0 1 -4,4 h-80 a4,4 0 0 1 -4,-4 v-30 a4,4 0 0 1 4,-4 z"
            fill="#eee" stroke="#ccc" strokeWidth="1"/>
        <path d="M60,74 v20 a4,4 0 0 0 4,4 h72 a4,4 0 0 0 4,-4 v-20" fill="#eee" stroke="#ccc"
              strokeWidth="1"/>
        <line x1="65" y1="50" x2="135" y2="50" stroke="#aaa" strokeWidth="1.5"/>
        <line x1="65" y1="55" x2="135" y2="55" stroke="#ccc" strokeWidth="1"/>
        <line x1="65" y1="80" x2="135" y2="80" stroke="#ddd" strokeWidth="1"/>
        <line x1="65" y1="85" x2="135" y2="85" stroke="#ccc" strokeWidth="1"/>
        <line x1="40" y1="90" x2="160" y2="90" stroke="#000" strokeWidth="2" strokeDasharray="4,2"/>
        <circle cx="60" cy="135" r="4" fill="#0f0"/>
        <circle cx="75" cy="135" r="4" fill="#f00"/>
        <circle cx="90" cy="135" r="4" fill="#ff0"/>
    </svg>
}