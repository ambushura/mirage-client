import SSSchedule from "./SSSchedule.jsx"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {setSecondScreen} from "../../../redux/interfaceReducer.js"

export default function SecondScreen() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSecondScreen())
    })

    return <SSSchedule/>

}