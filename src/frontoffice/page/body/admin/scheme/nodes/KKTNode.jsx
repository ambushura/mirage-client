import { Handle, Position } from '@xyflow/react'
import { Box } from '@mui/material'
import { openModal } from '../../../../../../redux/frontoffice/interfaceReducer.js'
import { useDispatch } from 'react-redux'
import { KKTSVG } from '../svg/KKTSVG.jsx'

export const KKTNode = ({ data }) => {
    const dispatch = useDispatch()

    return (
        <Box
            className="equipment-box"
            onClick={() => {
                dispatch(openModal({ type: 'equipment_kkt', props: { uid: data.uid, label: data.label } }))
            }}
        >
            <Handle type="target" position={Position.Bottom} style={{ pointerEvents: 'all' }} />
            <Box>
                <Box>Касса</Box>
                <Box>
                    <KKTSVG />
                </Box>
            </Box>
            {data.label ? (
                <Box>
                    <span>ЗН </span>
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
