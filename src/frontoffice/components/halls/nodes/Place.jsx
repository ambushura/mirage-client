import {Box} from "@mui/material"
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import LanguageIcon from '@mui/icons-material/Language'
import AccessibleIcon from '@mui/icons-material/Accessible'

export function Place({data}) {

    const place_color = {
        0: {body: 'linear-gradient(180deg, #11383a 0%, #1db1ba 100%)', handler: '#1db1ba'}, // свободное
        1: {body: 'linear-gradient(180deg, #34363b 0%, #767b83 100%)', handler: '#414650'}, // сломанное
        2: {body: 'linear-gradient(180deg, #a0171e 0%, #e3000b 100%)', handler: '#e3000b'}, // занятое
        3: {body: 'linear-gradient(180deg, #ce810c 0%, #f0960e 100%)', handler: '#f0960e'}, // выбранное
        4: {body: 'linear-gradient(180deg, #fd4300 0%, #fd4300 100%)', handler: '#fd4300'}, // занятое (неоплаченное)
    }

    const sourceIcon = {
        w: <LaptopWindowsIcon color="white"/>, k: <SmartphoneIcon color="white"/>, s: <LanguageIcon color="white"/>,
    }

    const handler_array = () => {
        const heads_array = new Array(data.heads).fill(0)
        return <>
            {heads_array.map((head, i) => {
                return <div key={`${data.uid}${i}`}
                            style={{
                                backgroundColor: place_color[data.state].handler,
                                width: '16px',
                                height: '6px',
                                border: '1px solid black',
                                borderRadius: '4px',
                            }}>
                </div>
            })}
        </>
    }

    const isInvalidPlace = typeof data.place_type_name === 'string' && data.place_type_name.toLowerCase().includes('инвалид')

    return <Box
        key={data.uid}
        className='place'
        sx={{
            width: `${data.width}px`, height: `${data.height}px`
        }}>
        <Box className='place-body' style={{background: place_color[data.state].body}}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(0.66)",
                    pointerEvents: "none",
                    transformOrigin: 'center',
                }}
            >{data.source ? sourceIcon[data.source] : isInvalidPlace ? <AccessibleIcon color='white'/> : null}
            </Box>
            <Box className='place-label'>
                <Box className='place-heads'>
                    {handler_array()}
                </Box>
                {data.source === undefined && !isInvalidPlace ? data.number : ''}
            </Box>
        </Box>
    </Box>
}