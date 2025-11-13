import {Box, Button, Typography} from "@mui/material"
import {useSelector} from "react-redux"
import ControlledLazySelect from "../../../../ui/ControlledLazySelect.jsx"
import {useForm} from "react-hook-form"
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"

const Operation = () => {

    const filial = useSelector(state => state.data.filial)

    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            id: '', wallet_in: '', wallet_out: '', sum: 0, comment: ''
        }
    })

    const onSubmit = (data) => {
        // const prepared = {
        //     ...data,
        //     sno: parseInt(data.sno, 10),
        //     fd: parseFloat(data.fd),
        //     number: parseFloat(data.number),
        //     shift_number: parseFloat(data.shift_number),
        //     uid_order_cinema: data.uid_order_cinema === '' ? null : data.uid_order_cinema,
        //     uid_order_food: data.uid_order_food === '' ? null : data.uid_order_food,
        // }
        // if (prepared.date_shift) prepared.date_shift = dayjs(prepared.date_shift)
        //     .startOf('day')
        //     .format('YYYY-MM-DDTHH:mm:ss+00:00')
        // if (prepared.date_create) prepared.date_create = dayjs(prepared.date_create)
        //     .format('YYYY-MM-DDTHH:mm:ss+00:00')
        // if (prepared.moment) prepared.moment = dayjs(prepared.moment)
        //     .format('YYYY-MM-DDTHH:mm:ss+00:00')
        // dispatch(common_documents_receipt_save(filial, prepared))
        // dispatch(closeModal())
        // dispatch(setReceiptsUpdated())
    }

    return <Box
        sx={{minWidth: '700px', maxHeight: '700px', overflowY: 'auto'}}
        id="modal-operation"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            ОПЕРАЦИЯ ПО КАССЕ
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
            <Box sx={{flex: 1}}>
                <ControlledLazySelect
                    control={control}
                    name="wallet_in"
                    label="Касса источник"
                    type="wallets"
                    filial={filial}
                    rules={{required: 'Укажите кассу-источник'}}
                    sx={{marginRight: '10px'}}
                    fullWidth
                />
            </Box>
            <Box sx={{flex: 1}}>
                <ControlledLazySelect
                    control={control}
                    name="wallet_out"
                    label="Касса приёмник"
                    type="wallets"
                    filial={filial}
                    rules={{required: 'Укажите кассу-приёмник'}}
                    sx={{marginRight: '10px'}}
                    fullWidth
                />
            </Box>
            <Box sx={{flex: 1}}>
                <ControlledMoneyField
                    control={control}
                    name="sum"
                    label="Сумма"
                    fullWidth
                />
            </Box>
        </Box>
        <Box>
            <ControlledTextField
                control={control}
                name="comment"
                label="Комментарий"
                sx={{width: '100%'}}
                multiline
                rows={3}
            />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button fullWidth variant='contained' color='secondary'>Сохранить</Button>
        </Box>
    </Box>
}

export default Operation