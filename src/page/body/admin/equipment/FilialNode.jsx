import {Handle, Position} from "@xyflow/react"
import {Box} from "@mui/material"
import {Filial} from "./svg/Filial.jsx"

export const FilialNode = ({data}) => {
    return <Box className='equipment-box'>
        <Handle
            type="target"
            position={Position.Bottom}
            style={{pointerEvents: 'all'}}/>
        <Box>
            <Box>Филиал</Box>
            <Box><Filial/></Box>
        </Box>
        <Handle
            type="source"
            position={Position.Top}
            style={{pointerEvents: 'all'}}/>
    </Box>
}