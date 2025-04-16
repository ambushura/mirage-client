import {useState} from 'react'
import {Box} from "@mui/material"
import "react-simple-keyboard/build/css/index.css"
import Keyboard from "../keyboards/Keyboard.jsx"
import {useDispatch, useSelector} from "react-redux"
import {loginSuccess} from "../../redux/authReducer.js"
import {addNotification} from "../../redux/notifierReducer.js"

const Auth = (props) => {
    const dispatch = useDispatch()
    const [username] = useState("admin")
    const [password, set_password] = useState("")
    const filial = useSelector(state => state.data.filial)
    const apply = async () => {
        try {
            if (filial === undefined) {
                throw new Error("для начала выберите филиал аутентификации")
            } else {
                const response = await fetch(`http://${filial.ip}:${filial.port}/api/login`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username, password})
                })
                if (!response.ok) {
                    throw new Error(response.message)
                }
                const data = await response.json()
                if (data.code === 200) {
                    dispatch(loginSuccess(data.data))
                } else {
                    throw new Error(data.data)
                }
            }
        } catch (error) {
            dispatch(addNotification({
                message: error.message,
                severity: 'error',
                autoHide: true
            }))
        } finally {
            set_password("")
            dispatch(props.setAuthOpened(false))
        }
    }
    return (
        <Box>
            <Box style={{fontWeight: 'bold', textAlign: 'center', paddingBottom: '10px', color: 'var(--text-color)'}}>Введите код сотрудника:</Box>
            <Keyboard input={password}
                      setInput={set_password}
                      apply={apply}
                      type="auth"/>
        </Box>
    )
}

export default Auth