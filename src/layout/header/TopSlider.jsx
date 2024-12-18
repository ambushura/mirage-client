import React, {useEffect, useState} from 'react'
const TopSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const interval = 1000 * 10
    const images = [
        "/images/top-banner-1.jpg",
        "/images/top-banner-2.jpg",
    ]
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, interval)
        return () => clearInterval(slideInterval)
    }, [currentIndex, interval])
    return (
        <div id="header-slider">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`slide ${index}`}
                    className={`slide${index === currentIndex ? "-active" : ""}`}
                />
            ))}
        </div>
    )
}
export default TopSlider