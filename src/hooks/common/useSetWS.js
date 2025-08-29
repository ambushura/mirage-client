import {useEffect} from "react"
import useWebSocket from "react-use-websocket"
import {useDispatch, useSelector} from "react-redux"

export function useSetWS() {

    const dispatch = useDispatch()
    const wp = useSelector(state => state.interface.wp)
    const its_second_screen = useSelector(state => state.interface.its_second_screen)

    const {
        sendMessage,
        lastMessage
    } = useWebSocket(`ws://10.101.3.88:60003/ws?wp=${wp}${its_second_screen ? '&ss=true' : ''}`, {
        shouldReconnect: () => true,
    })

    useEffect(() => {
        if (lastMessage) {
            dispatch(sendMessage(lastMessage))
        }
    }, [lastMessage, dispatch, sendMessage])

}