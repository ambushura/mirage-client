import {useState} from 'react'
import {Box} from "@mui/material"
import "react-simple-keyboard/build/css/index.css"
import Keyboard from "../keyboards/Keyboard.jsx"
import {useDispatch} from "react-redux"
import {login} from "../../redux/interfaceReducer.js"

const Auth = (props) => {
    const dispatch = useDispatch()
    const [password, set_password] = useState('')
    const apply = () => {
        dispatch(props.setAuthOpened(false))
        dispatch(login(1))
    }
    return (
        <Box>
            <Keyboard input={password}
                      setInput={set_password}
                      apply={apply}
                      type="num"/>
        </Box>
    )
}
export default Auth