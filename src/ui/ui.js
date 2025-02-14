import {createTheme} from "@mui/material"
export const theme = createTheme({
    palette: {
        primary: {
            main: '#E3000B',
        },
        secondary: {
            main: '#2E3239',
        },
        success: {
            main: '#45B97C',
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
                }
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
        MuiPopper: {
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
        }
    }
})