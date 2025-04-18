import {useState, memo} from 'react'
import {Box, Button, TextField} from "@mui/material"
import "react-simple-keyboard/build/css/index.css"
import {useDispatch, useSelector} from "react-redux"
import {setAuthOpened} from "../../redux/interfaceReducer.js"
import DialpadIcon from '@mui/icons-material/Dialpad'
import Face3Icon from '@mui/icons-material/Face3'
import {addNotification} from "../../redux/notifierReducer.js"
import {login} from "../../service/fetch_service.js"

const Auth = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const [way, set_way] = useState('kiosk')
    const [username, set_username] = useState("")
    const [password, set_password] = useState("")

    const apply = () => {
        if (filial === undefined) {
            dispatch(addNotification({
                message: "для начала выберите филиал аутентификации",
                severity: 'error',
                autoHide: true
            }))
        } else if (way === 'desktop' && (username === '' || password === '')) {
            dispatch(addNotification({
                message: "логин и пароль не могут бысть пустыми",
                severity: 'error',
                autoHide: true
            }))
        } else if (way === 'kiosk' && password === '') {
            dispatch(addNotification({
                message: "пароль не может бысть пустым",
                severity: 'error',
                autoHide: true
            }))
        } else {
            dispatch(login(filial, way, username, password))
            dispatch(setAuthOpened(false))
        }
    }

    return (
        <Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: '10px'
            }}>
                <Button sx={{marginRight: '5px'}} variant='contained' color='primary' onClick={() => {
                    set_way('kiosk')
                }}>
                    <DialpadIcon/>
                </Button>
                <Button variant='contained' color='primary' onClick={() => {
                    set_way('desktop')
                }}>
                    <Face3Icon/>
                </Button>
            </Box>
            <Box sx={{width: '100%'}}>
                <Box sx={{
                    width: '100%',
                    display: way === 'kiosk' ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box maxWidth={200} mx="auto">
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(3, 1fr)"
                            gap={1}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <Button
                                    color='secondary'
                                    key={num}
                                    variant="contained"
                                    onClick={() => set_password((prev) => prev + num.toString())}>
                                    {num}
                                </Button>
                            ))}
                            <Button variant="contained" color='secondary' sx={{fontSize: '70%'}}
                                    onClick={() => {
                                        set_password('')
                                    }}>DEL</Button>
                            <Button variant="contained" color='secondary'
                                    onClick={() => set_password((prev) => prev + '0')}>0</Button>
                            <Button variant="contained" color='primary' sx={{fontSize: '90%'}}
                                    onClick={() => {
                                        apply()
                                    }}>Войти</Button>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    display: way === 'desktop' ? 'flex' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <Box component="form" sx={{backgroundColor: 'white', padding: '10px', borderRadius: '5px'}}>
                        <TextField
                            sx={{marginBottom: '10px'}}
                            autoComplete="username"
                            color='secondary'
                            label='Логин'
                            variant='outlined'
                            type='text'
                            fullWidth
                            value={username}
                            onChange={(e) => set_username(e.target.value)}
                        />
                        <TextField
                            color='secondary'
                            autoComplete="current-password"
                            label='Пароль'
                            variant='outlined'
                            type='password'
                            fullWidth
                            value={password}
                            onChange={(e) => set_password(e.target.value)}
                        />
                    </Box>
                    <Button variant='contained' color='primary' sx={{width: '100%', marginTop: '10px'}}
                            onClick={() => {
                                apply()
                            }}>Войти</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(Auth)