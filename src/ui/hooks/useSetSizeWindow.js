import { useEffect } from 'react'
import { setAppHeight, setAppWidth } from '../../redux/desktop/frontoffice/interfaceReducer.js'
import { useDispatch } from 'react-redux'

export function useSetSizeWindow() {
    const dispatch = useDispatch()
    useEffect(() => {
        const updateDimensions = () => {
            dispatch(setAppWidth(window.innerWidth))
            dispatch(setAppHeight(window.innerHeight))
        }
        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [dispatch])
}
