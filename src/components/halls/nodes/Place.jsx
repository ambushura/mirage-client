import {Box} from "@mui/material"

export function Place({data}) {

    const place_color = {
        0: {body: 'linear-gradient(180deg, #11383a 0%, #1db1ba 100%)', handler: '#1db1ba'}, // свободное
        1: {body: 'linear-gradient(180deg, #34363b 0%, #767b83 100%)', handler: '#414650'}, // сломанное
        2: {body: 'linear-gradient(180deg, #a0171e 0%, #e3000b 100%)', handler: '#e3000b'}, // занятое
        3: {body: 'linear-gradient(180deg, #ce810c 0%, #f0960e 100%)', handler: '#f0960e'}, // выбранное
    }

    const handler_array = () => {
        const heads_array = new Array(data.heads).fill(0)
        return (
            <>
                {heads_array.map((head, i) => {
                    return (
                        <div key={`${data.uid}${i}`}
                             style={{
                                 backgroundColor: place_color[data.state].handler,
                                 width: '16px',
                                 height: '6px',
                                 border: '1px solid black',
                                 borderRadius: '4px',
                             }}>
                        </div>
                    )
                })}
            </>
        )
    }

    return <Box
        key={data.uid}
        className='place'
        sx={{
            width: `${data.width}px`,
            height: `${data.height}px`
        }}>
        <Box className='place-body' sx={{background: place_color[data.state].body}}>
            <Box className='place-label'>
                <Box className='place-heads'>
                    {handler_array()}
                </Box>
                {data.number}
            </Box>
        </Box>
    </Box>
}