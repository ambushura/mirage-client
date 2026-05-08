import { Box, Button, ButtonGroup } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SaveIcon from '@mui/icons-material/Save'
import ControlledDateTimePicker from '../ui/ControlledDateTimePicker.jsx'
import ControlledTextField from '../ui/ControlledTextField.jsx'

// Подвал документа
export function Footer({ control, creator, saveButton, copyButton, deleteButton }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {[
                    { f: 'date_create', n: 'Создан' },
                    { f: 'date_change', n: 'Изменен' },
                ].map((el, i) => (
                    <ControlledDateTimePicker key={i} readOnly={true} control={control} name={el.f} label={el.n} sx={{ mr: '10px' }} />
                ))}
                {creator && <ControlledTextField control={control} name={'name_creator'} label={'Автор'} multiline sx={{ mr: '10px' }} />}
            </Box>
            <ButtonGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                {deleteButton && (
                    <Button variant="delete" startIcon={<DeleteForeverIcon />}>
                        Удалить
                    </Button>
                )}
                {copyButton && (
                    <Button variant="copy" startIcon={<ContentCopyIcon />}>
                        Скопировать
                    </Button>
                )}
                {saveButton && (
                    <Button variant="save" startIcon={<SaveIcon />}>
                        Сохранить
                    </Button>
                )}
            </ButtonGroup>
        </Box>
    )
}

// Табличные части
export function TableToolbar({ left = [], right = [] }) {
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
                        sx={{ mr: 1 }}
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
                        sx={{ ml: 1 }}
                    >
                        {btn.label}
                    </Button>
                ))}
            </Box>
        </Box>
    )
}

// Автозаполнение табличных частей
export const FIELD_TYPE_MAP = {
    uid_good: 'goods',
    uid_payment_type: 'payment_types',
    uid_discount: 'discounts',
    uid_store: 'stores',
    uid_good_group: 'goods_groups',
    uid_unit: 'units',
    uid_menu: 'menu',
    kitchen_uid_point: 'kitchen_points',
    kitchen_uid_delivery_path: 'kitchen_delivery_path',
    kitchen_uid_store: 'stores',
}

export const fill_name_map = (tables) => {
    const map = new Map()
    tables.forEach((table) => {
        table.rows.forEach((row) => {
            Object.entries(row).forEach(([key, value]) => {
                const type = FIELD_TYPE_MAP[key]
                if (!type || !value) return
                map.set(`${type}-${value}`, { type, value })
            })
        })
    })
    return [...map.values()]
}
export const AutoCompleteCols = [
    'uid_good',
    'uid_payment_type',
    'uid_discount',
    'uid_store',
    'kitchen_uid_store',
    'uid_good_group',
    'uid_unit',
    'uid_menu',
    'kitchen_uid_point',
    'kitchen_uid_delivery_path',
    'kitchen_uid_store',
]
export const DateTimeCols = ['date_create', 'date_change', 'date_shift']
