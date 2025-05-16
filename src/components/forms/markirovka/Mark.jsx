import {Box, Button, TextField, Typography} from "@mui/material"
import {useState} from "react"
import {closeModal} from "../../../redux/interfaceReducer.js"
import {useDispatch} from "react-redux"
import {horeca_position_add_mark} from "../../../service/fetch_service.js"

const Mark = (props) => {

    const dispatch = useDispatch()
    const [mark, set_mark] = useState(null)

    const ruToEnLayout = (text) => {
        const layoutMap = {
            'й': 'q', 'ц': 'w', 'у': 'e', 'к': 'r', 'е': 't', 'н': 'y', 'г': 'u', 'ш': 'i', 'щ': 'o', 'з': 'p',
            'х': '[', 'ъ': ']', 'ф': 'a', 'ы': 's', 'в': 'd', 'а': 'f', 'п': 'g', 'р': 'h', 'о': 'j', 'л': 'k',
            'д': 'l', 'ж': ';', 'э': '\'', 'я': 'z', 'ч': 'x', 'с': 'c', 'м': 'v', 'и': 'b', 'т': 'n', 'ь': 'm',
            'б': ',', 'ю': '.', 'Ё': '~', 'ё': '`', '"': '@', '№': '#', ';': '$', '%': '^', ':': '&', '?': '?'
        }
        return text.split('').map(char => {
            const lower = char.toLowerCase()
            const isUpper = char !== lower
            const replaced = layoutMap[lower] || char
            return isUpper ? replaced.toUpperCase() : replaced
        }).join('')
    }

    return (
        <Box component="form"
             noValidate
             autoComplete="off"
             onSubmit={(e) => {
                 e.preventDefault()
                 dispatch(horeca_position_add_mark(props.props.filial, props.props.wp, props.props.uid_order, props.props.uid_position, mark))
                 dispatch(closeModal())
             }}>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Честный знак
            </Typography>
            <TextField autoFocus label='Марка' sx={{m: 1, minWidth: '400px'}} variant='filled' color="textSecondary"
                       value={mark} onChange={(event) => {
                const raw = event.target.value
                const fixed = /[а-яё]/i.test(raw) ? ruToEnLayout(raw) : raw
                set_mark(fixed)
            }}/>
            <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                <Button variant='contained' color='secondary' type="submit" sx={{marginLeft: '4px'}}>Сохранить</Button>
            </Box>
        </Box>
    )
}

export default Mark