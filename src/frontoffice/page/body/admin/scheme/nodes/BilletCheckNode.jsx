import { Box } from '@mui/material'
import { openModal } from '../../../../../../redux/interfaceReducer.js'
import { Handle, Position } from '@xyflow/react'
import { useDispatch } from 'react-redux'
import { BilletCheckSVG } from '../svg/BilletCheckSVG.jsx'

export function BilletCheckNode({ data }) {
    const dispatch = useDispatch()

    return (
        <Box
            className="equipment-box"
            onClick={() => {
                dispatch(openModal({ type: 'equipment_billet_check', props: { uid: data.uid, label: data.label } }))
            }}
        >
            <Handle type="target" position={Position.Bottom} style={{ pointerEvents: 'all' }} />
            <Box>
                <Box>Билетный контролер</Box>
                <Box>
                    <BilletCheckSVG />
                </Box>
            </Box>
            {data.label ? (
                <Box>
                    <span>Имя </span>
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
