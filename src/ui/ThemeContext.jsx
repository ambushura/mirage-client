import {createContext, useState, useEffect} from 'react'
import {useSelector} from "react-redux"
import {createTheme} from "@mui/material"

const ThemeContext = createContext()

export const ThemeBlackWhite = ({children}) => {
    const [theme, set_theme] = useState('light')
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        if (user !== null) {
            set_theme('light')
        } else {
            set_theme('dark')
        }
    }, [user])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, set_theme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#E3000B',
        },
        secondary: {
            main: '#2E3239',
        },
        success: {
            main: '#45B97C',
        },
        grey: {
            main: '#e3e3e3',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    textTransform: 'none',
                    height: '60px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    height: '60px',
                    borderRadius: '12px'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px'
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    borderRadius: '12px'
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: 'white',
                    fontWeight: 'bold',
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2E3239'
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    "&.Mui-selected": {
                        color: '#E3000B',
                        fontWeight: 'bold',
                    },
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    fontSize: '18px',
                }
            }
        },
    }
})