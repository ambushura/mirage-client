import {Handle, Position} from "@xyflow/react"
import {Box} from "@mui/material"

export const FilialNode = ({data}) => {
    return (
        <Box className='equipment-box'>
            <Handle
                type="target"
                position={Position.Bottom}
                style={{pointerEvents: 'all'}}/>
            <strong>{data.label}</strong>
            <Box>
                <Box>
                    <svg width="220" height="200" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
                        <rect x="30" y="50" width="140" height="100" rx="6" ry="6" fill="#444" stroke="#222"
                              strokeWidth="2"/>
                        <rect x="130" y="110" width="20" height="40" fill="#777" stroke="#333" strokeWidth="1"/>
                        <g fill="#FFDA6B" stroke="#003" strokeWidth="1">
                            <rect x="45" y="65" width="20" height="20"/>
                            <rect x="75" y="65" width="20" height="20"/>
                            <rect x="105" y="65" width="20" height="20"/>
                            <rect x="135" y="65" width="20" height="20"/>
                        </g>
                    </svg>
                </Box>
            </Box>
            <Handle
                type="source"
                position={Position.Top}
                style={{pointerEvents: 'all'}}/>
        </Box>
    )
}