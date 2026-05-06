import {Box} from '@mui/material'

const RowLabel = ({data}) => {
    return (
        <Box
            key={data.uid}
            className="place"
            sx={{
                width: `${data.width}px`,
                height: `${data.height}px`,
            }}
        >
            <Box
                className="place-body"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: '#8b919b',
                }}
            >
                <Box className="row-label">{data.row}</Box>
            </Box>
    </Box>
    )
}

export default RowLabel
