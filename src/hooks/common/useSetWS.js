import {useEffect} from "react"
import useWebSocket from "react-use-websocket"
import {useDispatch, useSelector} from "react-redux"
import {setSSState} from "../../redux/secondScreenReducer.js"

export function useSetWS() {

    const dispatch = useDispatch()
    const wp = useSelector(state => state.interface.wp)
    const its_second_screen = useSelector(state => state.interface.its_second_screen)

    const current_page = useSelector(state => state.interface.current_page)
    const param_date = useSelector(state => state.interface.params.param_date)

    const {
        sendMessage,
        lastMessage
    } = useWebSocket(`ws://10.101.3.88:60003/ws?wp=${wp}${its_second_screen ? '&ss=true' : ''}`, {
        shouldReconnect: () => true,
    })

    useEffect(() => {
        if (lastMessage) {
            try {
                const data = JSON.parse(lastMessage.data)
                dispatch(setSSState(data.second_screen))
            } catch (e) {
                console.error(e)
            }
        }
    }, [lastMessage, dispatch, sendMessage])

    useEffect(() => {
        sendMessage(JSON.stringify({
            second_screen: {
                current_page: current_page,
                date_shift: param_date,
            }
        }))
    }, [current_page, param_date, sendMessage])

}