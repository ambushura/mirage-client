import {Box} from "@mui/material"
import screenSvg from '../../../images/screen.svg'

const Screen = ({data}) => {
    return (
        <Box>
            <img src={screenSvg} alt="экран" width={data.width} height={data.height}/>
        </Box>
    )
}

export default Screen