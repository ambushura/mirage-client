import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { closeModal } from '../../../redux/frontoffice/interfaceReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { horeca_position_add_mark } from '../../../service/fetch_service.js'
import { ruToEnLayout } from '../../../ui/hooks/common_functions.js'

const Mark = ({ props }) => {
    const dispatch = useDispatch()
    const filial = useSelector((state) => state.data.filial)
    const horder = useSelector((state) => state.orders.horder)

    const [rawMark, setRawMark] = useState('')

    const decodePasted = (text = '') => {
        let r = text
        r = r.replace(/\\u001D/g, '\u001D').replace(/\\x1D/g, '\u001D')
        r = r.replace(/\\r/g, '\r').replace(/\\n/g, '\n')
        r = r.replace(/0029/g, '\u001D').replace(/0013/g, '\r')
        return r
    }

    const handleKeyDown = (e) => {
        // специальные клавиши, которые мы хотим обработать сами
        if (e.key === 'Backspace') {
            e.preventDefault()
            setRawMark((p) => p.slice(0, -1))
            return
        }
        if (e.key === 'Enter') {
            e.preventDefault()
            setRawMark((p) => p + '\n')
            return
        }
        if (e.key === 'Tab') {
            e.preventDefault()
            setRawMark((p) => p + '\t')
            return
        }
        if (e.keyCode === 29) {
            // GS
            e.preventDefault()
            setRawMark((p) => p + String.fromCharCode(29))
            return
        }

        // если нажата управляющая комбинация (Cmd, Ctrl и т.д.) — не трогаем
        if (e.metaKey || e.ctrlKey || e.altKey) {
            return
        }

        // обычный символ
        if (e.key && e.key.length === 1) {
            e.preventDefault()
            const ch = /[а-яё]/i.test(e.key) ? ruToEnLayout(e.key) : e.key
            setRawMark((p) => p + ch)
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text')
        const decoded = decodePasted(pasted)
        const translated = /[а-яё]/i.test(decoded) ? ruToEnLayout(decoded) : decoded
        setRawMark((p) => p + translated)
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault()
                if (props.add) {
                    console.log(
                        'rawMark chars:',
                        [...rawMark].map((c) => c.charCodeAt(0))
                    )
                    dispatch(horeca_position_add_mark(filial, horder.uid, null, rawMark))
                } else {
                    console.log(
                        'rawMark chars:',
                        [...rawMark].map((c) => c.charCodeAt(0))
                    )
                    dispatch(horeca_position_add_mark(props.filial, props.uid_order, props.uid_position, rawMark))
                }
                dispatch(closeModal())
            }}
        >
            <Typography variant="h6" color="textSecondary" margin={1}>
                Честный знак
            </Typography>
            <TextField
                autoFocus
                label="Марка"
                sx={{ m: 1, minWidth: '400px' }}
                variant="filled"
                color="textSecondary"
                value={rawMark}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                inputProps={{
                    spellCheck: false,
                    style: { fontFamily: 'monospace', whiteSpace: 'pre' }, // чтобы переносы и табы были видны
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button variant="contained" color="secondary" type="submit" sx={{ marginLeft: '4px' }}>
                    Добавить в заказ
                </Button>
            </Box>
        </Box>
    )
}

export default Mark
