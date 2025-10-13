import {Box, Button, TextField, Typography} from "@mui/material"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch} from "react-redux"
import {DatePicker} from "@mui/x-date-pickers"

const Receipt = ({props}) => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(closeModal())
    }

    return <Box
        id="modal-receipt"
        component="form"
        noValidate
        autoComplete="off"
        sx={{width: '940px'}}
        onSubmit={handleSubmit}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            КАССОВЫЙ ЧЕК
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        ФНС
                    </Typography>
                    <TextField
                        label='Номер чека'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='ФН'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='ФД'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='ФП'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='РН'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <DatePicker
                        label='Момент пробития чека'
                        variant='filled'
                        value={null}
                        sx={{marginBottom: '10px', width: '100%'}}
                        onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                    />
                    <TextField
                        label='Номер смены'
                        variant='filled'
                        slotProps={{input: {readOnly: true}}}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Организация
                    </Typography>
                    <TextField
                        label='Организация'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='ИНН'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Юридический адрес'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Налогообложение'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Торговая точка'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Канал продажи'
                        variant='filled'
                        slotProps={{input: {readOnly: true}}}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Общие
                    </Typography>
                    <DatePicker
                        label='Дата смены'
                        variant='filled'
                        value={null}
                        sx={{marginBottom: '10px'}}
                        onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                    />
                    <DatePicker
                        label='Дата создания'
                        variant='filled'
                        value={null}
                        sx={{marginBottom: '10px'}}
                        onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                    />
                    <DatePicker
                        label='Дата изменения'
                        variant='filled'
                        value={null}
                        sx={{marginBottom: '10px'}}
                        onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                    />
                    <TextField
                        label='Автор'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Кассир'
                        variant='filled'
                        slotProps={{input: {readOnly: true}}}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        Покупатель
                    </Typography>
                    <TextField
                        label='E-mail'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Номер телефона'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                        ЧЗ
                    </Typography>
                    <TextField
                        label='Содержит марки'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Марки проверены'
                        variant='filled'
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {readOnly: true}}}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', m: 1, width: '100%'}}>
                    <TextField
                        label='Вид операции'
                        variant='filled'
                        sx={{marginRight: '10px', flex: 1}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Способ оплаты'
                        variant='filled'
                        sx={{marginRight: '10px', flex: 1}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Цена'
                        variant='filled'
                        sx={{marginRight: '10px', flex: 1}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Сумма скидки'
                        variant='filled'
                        sx={{marginRight: '10px', flex: 1}}
                        slotProps={{input: {readOnly: true}}}
                    />
                    <TextField
                        label='Сумма со скидкой'
                        variant='filled'
                        slotProps={{input: {readOnly: true}}}
                        sx={{flex: 1}}
                    />
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Button fullWidth variant='contained' color='error' sx={{marginRight: 1}}>Удалить</Button>
                <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Товары</Button>
                <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Перейти в заказ</Button>
                <Button fullWidth variant='contained' color='success'>Сохранить</Button>
            </Box>
        </Box>
    </Box>
}

export default Receipt