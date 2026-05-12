import { Handle, Position } from '@xyflow/react'
import { Box } from '@mui/material'
import { FilialSVG } from '../svg/FilialSVG.jsx'
import { openModal } from '../../../../../../redux/frontoffice/interfaceReducer.js'
import { useDispatch } from 'react-redux'

export const FilialNode = ({ data }) => {
    const dispatch = useDispatch()

    return (
        <Box
            className="equipment-box"
            onClick={() => {
                dispatch(openModal({ type: 'equipment_filial', props: { uid: data.uid, label: data.label } }))
            }}
        >
            <Handle type="target" position={Position.Bottom} style={{ pointerEvents: 'all' }} />
            <Box>
                <Box>Филиал</Box>
                <Box>
                    <FilialSVG />
                </Box>
                {data.label ? (
                    <Box>
                        <span style={{ fontWeight: 'bold' }}>{data.label}</span>
                    </Box>
                ) : null}
            </Box>
            <Handle type="source" position={Position.Top} style={{ pointerEvents: 'all' }} />
        </Box>
    )
}
