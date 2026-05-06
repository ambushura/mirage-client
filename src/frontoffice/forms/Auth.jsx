import {useEffect, useState} from 'react'
import {Box, Button, TextField} from '@mui/material'
import 'react-simple-keyboard/build/css/index.css'
import {useDispatch, useSelector} from 'react-redux'
import {setAuthOpened} from '../../redux/interfaceReducer.js'
import DialpadIcon from '@mui/icons-material/Dialpad'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import {addNotification} from '../../redux/notifierReducer.js'
import {login} from '../../service/fetch_service.js'
import {useNavigate} from 'react-router-dom'

const Auth = ({auth_opened}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const filial = useSelector((state) => state.data.filial)

    const [pincode_auth, set_pincode_auth] = useState(true)
    const [login_auth, set_login_auth] = useState(false)

    const [username, set_username] = useState('')
    const [password, set_password] = useState('')

    const apply = async () => {
        if (filial === undefined) {
            dispatch(
                addNotification({
                    message: 'Выберите филиал для входа в систему',
                    severity: 'error',
                    autoHide: true,
                })
            )
        } else if (login_auth && (username === '' || password === '')) {
            dispatch(
                addNotification({
                    message: 'Логин и пароль не могут бысть пустыми',
                    severity: 'error',
                    autoHide: true,
                })
            )
        } else if (pincode_auth && password === '') {
            dispatch(
                addNotification({
                    message: 'Пароль не может бысть пустым',
                    severity: 'error',
                    autoHide: true,
                })
            )
        } else {
            const decode = await dispatch(login(filial, login_auth, pincode_auth, username, password))
            if (decode.center) {
                navigate('/center/shift/revenue')
            }
            dispatch(setAuthOpened(false))
        }
        set_username('')
        set_password('')
    }

    useEffect(() => {
        set_username('')
        set_password('')
        return () => {
            set_username('')
            set_password('')
        }
    }, [pincode_auth, login_auth, auth_opened])

    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: '10px',
                }}
            >
                <Button
                    sx={{marginRight: '5px'}}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        set_pincode_auth(true)
                        set_login_auth(false)
                    }}
                >
                    <DialpadIcon/>
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        set_pincode_auth(false)
                        set_login_auth(true)
                    }}
                >
                    <KeyboardIcon/>
                </Button>
            </Box>
            <Box sx={{width: '100%'}}>
                <Box
                    sx={{
                        width: '100%',
                        display: pincode_auth ? 'flex' : 'none',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box maxWidth={200} mx="auto">
                        <Box sx={{gap: '2px'}} display="grid" gridTemplateColumns="repeat(3, 1fr)">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <Button
                                    color="secondary"
                                    key={num}
                                    variant="contained"
                                    onClick={() => set_password((prev) => prev + num.toString())}
                                >
                                    {num}
                                </Button>
                            ))}
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{fontSize: '70%'}}
                                onClick={() => {
                                    set_password('')
                                }}
                            >
                                DEL
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => set_password((prev) => prev + '0')}
                            >
                                0
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{fontSize: '90%'}}
                                onClick={() => {
                                    apply()
                                }}
                            >
                                Войти
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: login_auth ? 'flex' : 'none',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    }}
                >
                    <Box
                        component="form"
                        sx={{backgroundColor: 'white', padding: '10px', borderRadius: '5px'}}
                    >
                        <TextField
                            sx={{marginBottom: '10px'}}
                            autoComplete="username"
                            color="secondary"
                            label="Логин"
                            variant="outlined"
                            type="text"
                            fullWidth
                            value={username}
                            onChange={(e) => set_username(e.target.value)}
                        />
                        <TextField
                            color="secondary"
                            autoComplete="current-password"
                            label="Пароль"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => set_password(e.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{width: '100%', marginTop: '10px'}}
                        onClick={() => {
                            apply()
                        }}
                    >
                        Войти
                    </Button>
                </Box>
            </Box>
    </Box>
    )
}

export default Auth
