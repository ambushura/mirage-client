const Circle = ({color = '#000', size = 32}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="16"
                cy="16"
                r="16"
                fill={color}
            />
        </svg>
    )
}

export default Circle
