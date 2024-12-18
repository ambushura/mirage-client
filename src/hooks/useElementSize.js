import { useState, useEffect } from "react"
export function useElementSize(ref_element) {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    useEffect(() => {
        if (ref_element === null) {
            return
        }
        const element = ref_element.current
        if (!element) return
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === element) {
                    setHeight(entry.contentRect.height)
                    setWidth(entry.contentRect.width)
                }
            }
        })
        observer.observe(element)
        return () => {
            observer.disconnect()
        }
    }, [ref_element])
    return [width, height]
}