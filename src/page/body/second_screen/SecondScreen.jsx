import SSSchedule from "./SSSchedule.jsx"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {setSecondScreen} from "../../../redux/interfaceReducer.js"
import {useSetSecondScreen} from "./useSetSecondScreen.js"

export default function SecondScreen() {

    const dispatch = useDispatch()
    const current_page = useSelector(state => state.second_screen.current_page)

    useSetSecondScreen()

    useEffect(() => {
        dispatch(setSecondScreen())
    })

    if (!['seance'].includes(current_page)) {
        return <SSSchedule/>
    }

}