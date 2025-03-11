import {Box} from "@mui/material"

const Payment = (props) => {
    return (
        <Box>
            {props.param.type === 'horeca' ? 'Заказ общепит' : 'Заказ кино'}
        </Box>
    )
}
export default Payment