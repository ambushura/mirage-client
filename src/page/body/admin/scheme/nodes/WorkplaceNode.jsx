import {Handle, Position} from "@xyflow/react"
import {Box} from "@mui/material"
import {WorkplaceSVG} from "../svg/WorkplaceSVG.jsx"
import {openModal} from "../../../../../redux/interfaceReducer.js"
import {useDispatch} from "react-redux"
import {KioskSVG} from "../svg/KioskSVG.jsx"

export const WorkplaceNode = ({data}) => {

    const dispatch = useDispatch()

    return <Box className='equipment-box' onClick={() => {
        dispatch(openModal({type: 'equipment_workplace', props: {uid: data.uid, label: data.label, kiosk: data.kiosk}}))
    }}>
        <Handle
            type="target"
            position={Position.Bottom}
            style={{pointerEvents: 'all'}}/>
        <Box>
            <Box>{data.kiosk ? 'Киоск самообслуживания' : 'Рабочее место'}</Box>
            <Box>{data.kiosk ? <KioskSVG/> : <WorkplaceSVG/>}</Box>
        </Box>
        <Box><span>Имя </span><span style={{fontWeight: 'bold'}}>{data.label}</span></Box>
        <Handle
            type="source"
            position={Position.Top}
            style={{pointerEvents: 'all'}}/>
    </Box>
}