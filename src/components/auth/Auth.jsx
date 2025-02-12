import {useState} from 'react'
import {Box} from "@mui/material"
import "react-simple-keyboard/build/css/index.css"
import Keyboard from "../keyboards/Keyboard.jsx"
import {useDispatch, useSelector} from "react-redux"
import {loginSuccess} from "../../redux/authReducer.js"
const Auth = (props) => {
    const dispatch = useDispatch()
    const [username] = useState("admin")
    const [password, set_password] = useState("")
    const filial = useSelector(state => state.data.filial)
    const apply = async () => {
        try {
            const response = await fetch(`http://${filial.ip}:${filial.port}/api/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            })
            if (!response.ok) {
                throw new Error("Ошибка входа")
            }
            const data = await response.json()
            dispatch(loginSuccess(data))
            localStorage.setItem("token", data.token)
            localStorage.setItem("permissions", JSON.stringify(data.permissions))
        } catch (error) {
            alert(error.message || "Ошибка сети")
        } finally {
            set_password("")
            dispatch(props.setAuthOpened(false))
        }
    }
    return (
        <Box>
            <Box style={{fontWeight: 'bold', textAlign: 'center', paddingBottom: '10px'}}>Вход для сотрудников</Box>
            <Keyboard input={password}
                      setInput={set_password}
                      apply={apply}
                      type="auth"/>
        </Box>
    )
}

export default Auth