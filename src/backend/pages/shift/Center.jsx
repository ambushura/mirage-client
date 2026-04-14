import {useEffect} from 'react'
import Revenue from "./Revenue.jsx"
import Results from "./Results.jsx"
import SubMenu from "../../SubMenu.jsx"
import Operations from "./Operations.jsx"
import {useDispatch} from "react-redux"
import {setCurrentPage} from "../../../redux/center/centerReducer.js"

const Center = ({current_page}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [current_page])

    switch (current_page[1]) {
        case 'revenue':
            return <>
                <SubMenu type={['period', 'filials']}/>
                <Revenue/>
            </>
        case 'results':
            return <>
                <SubMenu type={['date_shift', 'filials']}/>
                <Results/>
            </>
        case 'operations':
            return <>
                <SubMenu type={['date_shift', 'filials']}/>
                <Operations/>
            </>
        default:
            return null
    }
}

export default Center