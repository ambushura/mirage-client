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
    const pre_order = useSelector(state => state.orders.pre_order)
    const seance = useSelector(state => state.schedule.seance)

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
        if ((current_page === 'seance' && seance !== undefined) || current_page !== 'seance') {
            sendMessage(JSON.stringify({
                second_screen: {
                    current_page: current_page,
                    date_shift: param_date,
                    uid_seance: seance !== undefined ? seance.uid : null,
                    uid_order: pre_order.uid,
                }
            }))
        }
    }, [current_page, param_date, sendMessage, pre_order.uid, seance])

}