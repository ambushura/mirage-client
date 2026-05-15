import { Handle, Position } from '@xyflow/react'
import { Box } from '@mui/material'
import { openModal } from '../../../../../../../redux/desktop/frontoffice/interfaceReducer.js'
import { useDispatch } from 'react-redux'
import { PinpadSVG } from '../svg/PinpadSVG.jsx'

export const PinpadNode = ({ data }) => {
    const dispatch = useDispatch()

    return (
        <Box
            className="equipment-box"
            onClick={() => {
                dispatch(openModal({ type: 'equipment_pinpad', props: { uid: data.uid, label: data.label } }))
            }}
        >
            <Handle type="target" position={Position.Bottom} style={{ pointerEvents: 'all' }} />
            <Box>
                <Box>Пинпад</Box>
                <Box>
                    <PinpadSVG />
                </Box>
            </Box>
            {data.label ? (
                <Box>
                    <span>ID </span>
                    <span style={{ fontWeight: 'bold' }}>{data.label}</span>
                </Box>
            ) : null}
            {data.port && data.port ? (
                <Box>
                    <span>IP </span>
                    <span style={{ fontWeight: 'bold' }}>
                        {data.ip}:{data.port}
                    </span>
                </Box>
            ) : null}
            {data.mac ? (
                <Box>
                    <span>MAC </span>
                    <span style={{ fontWeight: 'bold' }}>{data.mac}</span>
                </Box>
            ) : null}
            <Handle type="source" position={Position.Top} style={{ pointerEvents: 'all' }} />
        </Box>
    )
}
