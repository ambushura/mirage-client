import React, {useEffect, useState} from 'react'
import Place from "./Place"
import screen from "../../../../media/screen.svg"
import {Box, Fade} from "@mui/material"
const Hall = (props) => {
    const [position, setPosition] = useState({x: 0, y: 0}) // позиция схемы зала текущая
    const [offset, setOffset] = useState({x: 0, y: 0}) // позиция схемы зала перемещенная
    const [isDragging, setIsDragging] = useState(false) // схема зала зажата/отпущена мышью
    const [hall_scale, set_hall_scale] = useState(1) // масштаб схемы зала
    const [hall_left, set_hall_left] = useState(0)
    const [hall_left_applied, set_hall_left_applied] = useState(false)
    useEffect(() => {
        if (props.height > 0 && props.width > 0) {
            const k_w = props.width / (props.hall.max_x - props.hall.min_x + 24 * 3 * 2)
            const k_h = (props.height) / (props.hall.max_y - props.hall.min_y + 80)
            const new_scale = Math.min(k_w, k_h)
            const k = props.width / 2 - ((props.hall.max_x - props.hall.min_x) / 2)
            set_hall_left(k > 0 ? k : 0)
            set_hall_scale(new_scale)
            set_hall_left_applied(true)
        }
        const box = document.querySelector('.hall-places')
        const handleWheel = (event) => {
            event.preventDefault()
            const delta = event.deltaY > 0 ? -0.05 : 0.05
            set_hall_scale((prevScale) => Math.max(0.5, Math.min(prevScale + delta, 1.5)))
        }
        box.addEventListener('wheel', handleWheel, {passive: false})
        return () => {
            box.removeEventListener('wheel', handleWheel)
        }
    }, [props.height, props.width, props.hall.max_y, props.hall.max_x, props.hall.min_x, props.hall.min_y])

    return (
        <Fade in={hall_left_applied} timeout={100}>
            <Box id='hall' style={{height: `${props.height}px`}}>
                <div onMouseDown={(e) => {
                    setIsDragging(true)
                    setOffset({
                        x: e.clientX - position.x,
                        y: e.clientY - position.y,
                    })
                }}
                     style={{
                         position: 'absolute',
                         height: props.hall.max_y - props.hall.min_y + 'px',
                         width: props.hall.max_x - props.hall.min_x + 'px',
                         top: '0px',
                         left: hall_left + 'px'
                     }}>
                    <div
                        className='hall-places'
                        onMouseMove={(e) => {
                            if (isDragging) {
                                setPosition({
                                    x: e.clientX - offset.x,
                                    y: e.clientY - offset.y,
                                })
                            }
                        }}
                        onMouseUp={() => {
                            setIsDragging(false)
                        }}
                        onMouseLeave={() => {
                            setIsDragging(false)
                        }}
                        style={{
                            height: props.hall.max_y - props.hall.min_y + 'px',
                            width: props.hall.max_x - props.hall.min_x + 'px',
                            top: position.y + 'px',
                            left: position.x + 'px',
                            transform: `scale(${hall_scale})`,
                            cursor: 'grab',
                            transition: 'transform 0.5s ease',
                            transformOrigin: 'top'
                        }}>
                        {props.hall.rows.map(row => {
                            return (
                                <div key={row.name}>
                                    <div className='hall-row' style={{
                                        left: -24 * 3 + 'px',
                                        top: row.label_y - props.hall.min_y + 'px'
                                    }}>
                                        <div>{row.name}</div>
                                    </div>
                                    <div className='hall-row' style={{
                                        right: -24 * 3 + 'px',
                                        top: row.label_y - props.hall.min_y + 'px'
                                    }}>
                                        <div>{row.name}</div>
                                    </div>
                                    {row.places.map(place => {
                                        let state = 0
                                        if (place.deleted) {
                                            return (<></>)
                                        }
                                        if (place.broken) {
                                            state = 1
                                        } else {
                                            props.booking.find(book => {
                                                if (book.uid_place === place.uid) {
                                                    state = book.state
                                                }
                                            })
                                        }
                                        return (<Place
                                            set_count_book={props.set_count_book}
                                            filial={props.filial}
                                            order={props.order}
                                            seance={props.seance}
                                            key={place.uid + place.ver}
                                            description={{
                                                uid: place.uid,
                                                heads: place.heads,
                                                label: place.number,
                                                type: 1,
                                                state: state,
                                                x: (place.x - props.hall.min_x),
                                                y: (place.y - props.hall.min_y),
                                                width: place.width,
                                                height: place.height
                                            }}/>)
                                    })}
                                </div>)
                        })}
                        <img className='hall-screen' src={screen} alt='экран'/>
                    </div>
                </div>
            </Box>
        </Fade>
    )
}
export default Hall