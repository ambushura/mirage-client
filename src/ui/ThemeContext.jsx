import {createContext, useState, useEffect} from 'react'
import {useSelector} from "react-redux"
const ThemeContext = createContext()

export const ThemeBlackWhite = ({children}) => {
    const [theme, set_theme] = useState('light')
    const permissions = useSelector(state => state.auth.permissions)
    useEffect(() => {
        if (permissions.includes('staff')) {
            set_theme('light')
        } else {
            set_theme('dark')
        }
    }, [permissions])
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])
    return (
        <ThemeContext.Provider value={{theme, set_theme}}>
            {children}
        </ThemeContext.Provider>
    )
}