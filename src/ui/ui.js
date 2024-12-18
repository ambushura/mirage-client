import {createTheme} from "@mui/material"
export const theme = createTheme({
    palette: {
        primary: {
            main: '#E3000B',
        },
        secondary: {
            main: '#2E3239',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    textTransform: 'none',
                    height: '42px'
                }
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    height: '42px',
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
        }
    }
})