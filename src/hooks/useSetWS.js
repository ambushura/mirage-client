import {useEffect, useRef} from "react"
import {v4} from "uuid"
import useWebSocket from "react-use-websocket"
import {useDispatch} from "react-redux"

export function useSetWS() {
    const dispatch = useDispatch()
    const uid_app = useRef(v4())
    const {sendMessage, lastMessage} = useWebSocket(`ws://10.101.3.88:8082/ws?id=${uid_app.current}`, {
        shouldReconnect: () => true,
    })
    useEffect(() => {
        if (lastMessage) {
            dispatch(sendMessage(lastMessage))
        }
    }, [lastMessage, dispatch, sendMessage])
}