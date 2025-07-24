import {Handle, Position} from "@xyflow/react"
import {Box} from "@mui/material"

export const KKTNode = ({data}) => {
    return (
        <Box className='equipment-box'>
            <Handle
                type="target"
                position={Position.Bottom}
                style={{pointerEvents: 'all'}}/>
            <Box>
                <Box>
                    <svg width="150" height="130" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
                        <rect x="70" y="30" width="60" height="30" rx="4" ry="4" fill="#eee" stroke="#bbb"
                              strokeWidth="1"/>
                        <line x1="75" y1="28" x2="125" y2="28" stroke="#aaa" strokeWidth="2"/>
                        <line x1="75" y1="33" x2="125" y2="33" stroke="#aaa" strokeWidth="1"/>
                        <rect x="20" y="60" width="160" height="100" rx="6" ry="6" fill="#444" stroke="#222"
                              strokeWidth="2"/>
                        <rect x="30" y="140" width="140" height="25" rx="2" ry="2" fill="#555" stroke="#333"
                              strokeWidth="1"/>
                        <circle cx="100" cy="152" r="4" fill="#ccc"/>
                        <g fill="#888">
                            <rect x="40" y="95" width="20" height="15" rx="2"/>
                            <rect x="65" y="95" width="20" height="15" rx="2"/>
                        </g>
                    </svg>
                </Box>
            </Box>
            <Box><span>ЗН </span><span style={{fontWeight: 'bold'}}>{data.label}</span></Box>
            <Handle
                type="source"
                position={Position.Top}
                style={{pointerEvents: 'all'}}/>
        </Box>
    )
}