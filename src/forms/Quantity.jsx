import {Box, Button, Typography} from "@mui/material"
import {closeModal} from "../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useState} from "react"
import {horeca_position_add_quantity} from "../service/fetch_service.js"
import {addNotification} from "../redux/notifierReducer.js"

const Quantity = (props) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const {
        uid_order, uid_position, fraction, unit_name, unit_code, v, quantity, ver
    } = props.props

    const [countStr, setCountStr] = useState("")

    const handleClick = (val) => {
        setCountStr(prev => {
            if (val === "." && (!fraction || prev.includes("."))) return prev
            if (val === "." && prev === "") return "0."
            const [intPart, decPart] = (prev + val).split(".")
            if (intPart.length > 3) return prev
            if (decPart && decPart.length > 3) return prev
            return prev + val
        })
    }

    const handleBackspace = () => {
        setCountStr(prev => prev.slice(0, -1))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const quantity = parseFloat(countStr)
        if (!isNaN(quantity) && quantity !== 0) {
            dispatch(horeca_position_add_quantity(filial, uid_order, uid_position, quantity, ver))
            dispatch(closeModal())
        } else {
            dispatch(addNotification({
                message: 'количество должно быть отличным от нуля', severity: 'error', autoHide: true
            }))
        }
    }

    return <Box
        id="modal-quantity"
        component="form"
        noValidate
        autoComplete="off"
        sx={{p: 1, width: 300}}
        onSubmit={handleSubmit}>
        <Typography variant="h6" color="textSecondary" sx={{mb: 1}}>
            Текущее количество
        </Typography>
        <Box
            sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                textAlign: "right",
                fontSize: "1.5rem",
                backgroundColor: "#f9f9f9"
            }}>
            {quantity.toFixed(3)} {unit_name}
        </Box>
        <Typography variant="h6" color="textSecondary" sx={{mb: 1}}>
            Новое количество
        </Typography>
        <Box
            sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                textAlign: "right",
                fontSize: "1.5rem",
                backgroundColor: "#f9f9f9"
            }}>
            {(countStr && parseFloat(countStr).toFixed(3)) || "0.000"} {unit_name}
        </Box>
        <Box
            sx={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1
            }}>
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (<Button
                key={num}
                variant="contained"
                color="secondary"
                sx={{fontSize: "150%"}}
                onClick={() => handleClick(num.toString())}>{num}</Button>))}
            <Button
                variant="contained"
                color="secondary"
                sx={{fontSize: "150%"}}
                onClick={() => handleClick("0")}>0</Button>
            <Button
                variant="contained"
                color="secondary"
                sx={{fontSize: "150%"}}
                onClick={() => handleClick(".")}
                disabled={!fraction}>.</Button>
            <Button
                variant="contained"
                color="secondary"
                sx={{fontSize: "150%"}}
                onClick={handleBackspace}>←</Button>
            <Button
                type="submit"
                autoFocus
                variant="contained"
                color="secondary"
                sx={{fontSize: "120%", gridColumn: "span 3"}}>
                Сохранить
            </Button>
        </Box>
    </Box>
}

export default Quantity