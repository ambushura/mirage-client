import React, {useEffect, useState} from 'react'
import help from "../../../../media/help.svg"
import {useDispatch} from "react-redux"
import {takeSeat} from "../../../../async_actions/dataService"
const Place = (props) => {

    const dispatch = useDispatch()

    const heads = props.description.heads
    const label = props.description.label
    const state = props.description.state
    const type = props.description.type
    const place_width = 24
    const place_height = [24, 4, 22, 18] // высота внешнего блока, высота кресла, высота внутреннего блока,
    const place_color = {
        0: {body: 'linear-gradient(180deg, #11383a 0%, #1db1ba 100%)', handler: '#1db1ba'}, // свободное
        1: {body: 'linear-gradient(180deg, #34363b 0%, #767b83 100%)', handler: '#414650'}, // сломанное
        2: {body: 'linear-gradient(180deg, #a0171e 0%, #e3000b 100%)', handler: '#e3000b'}, // занятое
        3: {body: 'linear-gradient(180deg, #ce810c 0%, #f0960e 100%)', handler: '#f0960e'}, // выбранное
    }
    const handler_array = () => {
        const heads_array = new Array(heads)
        let i = 0
        while (i < heads) {
            heads_array[i] = i * place_width + place_width / 4
            i++
        }
        return (
            <>
                {heads_array.map(head => {
                    return (
                        <div key={head}
                             style={{
                                 position: 'absolute',
                                 backgroundColor: place_color[state].handler,
                                 width: (place_width / 2) - 2 + 'px',
                                 height: place_height[1] + 'px',
                                 border: '1px solid black',
                                 borderRadius: '2px',
                                 left: head + 'px',
                                 top: 0
                             }}></div>
                    )
                })}
            </>
        )
    }
    const [scale, set_scale] = useState(1)
    useEffect(() => {
        const scale_width = props.description.width / (place_width * heads)
        set_scale(parseFloat((scale_width - 0.2).toFixed(2)))
    }, [heads, props.description.height, props.description.width])

    return (
        <button
            onClick={
                async () => {
                    await dispatch(takeSeat(props.filial, props.seance.uid, props.pre_order.uid, props.description.uid))
                    await props.set_count_book(prev_book_count => prev_book_count + 1)
                }}
            style={{
                background: 'transparent',
                position: 'absolute',
                width: `${place_width * heads}px`,
                height: `${place_height[0]}px`,
                left: `${props.description.x}px`,
                top: `${props.description.y}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'left top'
            }}>
            <div style={{
                position: 'absolute',
                width: place_width * heads + 'px',
                height: place_height[2] + 'px',
                background: place_color[state].body,
                transition: 'background 1s ease',
                borderRadius: '4px',
                bottom: 0,
                cursor: 'pointer',
            }}>
                {type === 0 ? <img style={{
                    position: 'absolute',
                    bottom: 0,
                    left: (place_width * heads / 2) - ((place_width - 4) / 2) + 'px',
                    padding: '2px'
                }} src={help}
                                   width={place_height[3] < place_width ? place_height[3] - 4 + 'px' : place_width - 4 + 'px'}
                                   height={place_height[3] - 4 + 'px'} alt='инвалидное место'/> : <></>}
                {type !== 0 ? <div style={{
                        position: 'absolute',
                        width: place_width * heads + 'px',
                        height: place_height[3] + 'px',
                        bottom: 0,
                        textAlign: 'center',
                        verticalAlign: 'center',
                        color: 'white',
                        fontSize: '10px'
                    }}>{label}</div>
                    : <></>}
            </div>
            {handler_array()}
        </button>
    )
}
export default Place