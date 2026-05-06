import {Box, Button, ButtonGroup, Skeleton} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SaveIcon from '@mui/icons-material/Save'
import ControlledDateTimePicker from '../ui/ControlledDateTimePicker.jsx'
import ControlledTextField from '../ui/ControlledTextField.jsx'

// Подвал документа
export function Footer({control, creator, saveButton, copyButton, deleteButton}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {[
                    {f: 'date_create', n: 'Создан'},
                    {f: 'date_change', n: 'Изменен'},
                ].map((el, i) => (
                    <ControlledDateTimePicker
                        key={i}
                        readOnly={true}
                        control={control}
                        name={el.f}
                        label={el.n}
                        sx={{mr: '10px'}}
                    />
                ))}
                {creator && (
                    <ControlledTextField
                        control={control}
                        name={'name_creator'}
                        label={'Автор'}
                        multiline
                        sx={{mr: '10px'}}
                    />
                )}
            </Box>
            <ButtonGroup
                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap'}}
            >
                {deleteButton && (
                    <Button variant="delete" startIcon={<DeleteForeverIcon/>}>
                        Удалить
                    </Button>
                )}
                {copyButton && (
                    <Button variant="copy" startIcon={<ContentCopyIcon/>}>
                        Скопировать
                    </Button>
                )}
                {saveButton && (
                    <Button variant="save" startIcon={<SaveIcon/>}>
                        Сохранить
                    </Button>
                )}
            </ButtonGroup>
    </Box>
    )
}

// Загрузчик
export function LoaderOrder() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                p: 2,
            }}
        >
            <Skeleton variant="rectangular" sx={{width: '100%', height: 'calc(100% / 5)', mb: 2}}/>
            <Skeleton variant="rectangular" sx={{width: '100%', height: 'calc(100% / 5)', mb: 2}}/>
            <Skeleton variant="rectangular" sx={{width: '100%', height: 'calc(100% / 5)', mb: 2}}/>
            <Skeleton variant="rectangular" sx={{width: '100%', height: 'calc(100% / 5)', mb: 2}}/>
            <Skeleton variant="rectangular" sx={{width: '100%', height: 'calc(100% / 5)', mb: 2}}/>
    </Box>
    )
}

// Табличные части
export function TableToolbar({left = [], right = []}) {
    return (
        <Box className="center-toolbar">
            <Box>
                {left.map((btn, i) => (
                    <Button
                        key={i}
                        onClick={btn.onClick}
                        variant={btn.variant || 'tb_add'}
                        size="small"
                        startIcon={btn.icon}
                        sx={{mr: 1}}
                    >
                        {btn.label}
                    </Button>
                ))}
            </Box>
            <Box>
                {right.map((btn, i) => (
                    <Button
                        key={i}
                        onClick={btn.onClick}
                        variant={btn.variant || 'tb_delete'}
                        size="small"
                        startIcon={btn.icon}
                        sx={{ml: 1}}
                    >
                        {btn.label}
                    </Button>
                ))}
            </Box>
    </Box>
    )
}

export const FIELD_TYPE_MAP = {
    uid_good: 'goods',
    uid_payment_type: 'payment_types',
    uid_discount: 'discounts',
    uid_store: 'stores',
}

export const FillNameMap = (tables) => {
    const map = new Map()
    tables.forEach((table) => {
        table.rows.forEach((row) => {
            Object.entries(row).forEach(([key, value]) => {
                const type = FIELD_TYPE_MAP[key]
                if (!type || !value) return
                map.set(`${type}-${value}`, {type, value})
            })
        })
    })
    return [...map.values()]
}

export const AutoCompleteCols = ['uid_good', 'uid_payment_type', 'uid_discount', 'uid_store', 'kitchen_uid_store']
export const DateTimeCols = ['date_create', 'date_change', 'date_shift']
export const MapTypes = {
    uid_good: 'goods',
    uid_payment_type: 'payment_types',
    uid_discount: 'discounts',
    uid_store: 'stores',
    kitchen_uid_store: 'stores',
}
