import {Box, Button, ButtonGroup, DialogTitle, IconButton, Skeleton} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import SaveIcon from "@mui/icons-material/Save"
import {closeModal} from "../redux/interfaceReducer.js"
import CloseIcon from "@mui/icons-material/Close"
import {useDispatch} from "react-redux"
import ControlledDateTimePicker from "../ui/ControlledDateTimePicker.jsx"
import ControlledTextField from "../ui/ControlledTextField.jsx"
import AsyncAutocomplete from "../ui/AsyncAutocomplete.jsx"

// Заголовок документа
export function Title({title}) {
    const dispatch = useDispatch()
    return <DialogTitle sx={{m: 0, p: '10px'}}>
        {title}
        <IconButton
            aria-label="close"
            onClick={() => {
                dispatch(closeModal())
            }}
            sx={{position: "absolute", right: 8, top: 8}}>
            <CloseIcon/>
        </IconButton>
    </DialogTitle>
}

// Подвал документа
export function Footer({control, saveButton, copyButton, deleteButton}) {
    return <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {[{f: 'date_create', n: 'Создан'}, {f: 'date_change', n: 'Изменен'}].map((el, i) =>
                <ControlledDateTimePicker
                    key={i}
                    readOnly={true}
                    control={control}
                    name={el.f}
                    label={el.n}
                    sx={{mr: '10px'}}
                />)}
            <ControlledTextField
                control={control}
                name={'name_creator'}
                label={'Автор'}
                multiline
                sx={{mr: '10px'}}
            />
        </Box>
        <ButtonGroup
            sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap'}}>
            {deleteButton && <Button variant='delete' startIcon={<DeleteForeverIcon/>}>Удалить</Button>}
            {copyButton && <Button variant='copy' startIcon={<ContentCopyIcon/>}>Скопировать</Button>}
            {saveButton && <Button variant='save' startIcon={<SaveIcon/>}>Сохранить</Button>}
        </ButtonGroup>
    </Box>
}

// Загрузчик
export function LoaderOrder() {
    return <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', p: 2}}>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10} sx={{mb: 2}}/>
        <Skeleton variant="rectangular" width={300} height={10}/>
    </Box>
}

// Заполнение полей
export function EnhanceColumn(filial, col, mapCatalog) {
    const mapTypes = new Map()
    mapTypes.set('uid_good', 'goods')
    if (col.field !== 'uid_good') return col
    return {
        ...col, editable: true, renderCell: (params) => {
            if (['uid_good'].includes(col.field)) return mapCatalog.find(el => el.type === mapTypes.get(col.field) && el.uid === params.row[col.field])?.name; else return '';
        }, renderEditCell: (params) => <AsyncAutocomplete
            value={params.value}
            filial={filial}
            type={mapTypes.get(col.field)}
            variant="standard"
            source="table"
            sx={{width: '100%', height: '100%'}}
            onChange={(val) => {
                params.api.setEditCellValue({
                    id: params.id, field: params.field, value: val ?? null
                })
                params.api.stopCellEditMode({
                    id: params.id, field: params.field
                })
            }}
        />
    }
}

// Табличные части
export function TableToolbar({left = [], right = []}) {
    return <Box className='center-toolbar'>
        <Box>
            {left.map((btn, i) => <Button
                key={i}
                onClick={btn.onClick}
                variant={btn.variant || 'tb_add'}
                size="small"
                startIcon={btn.icon}
                sx={{mr: 1}}>
                {btn.label}
            </Button>)}
        </Box>
        <Box>
            {right.map((btn, i) => <Button
                key={i}
                onClick={btn.onClick}
                variant={btn.variant || 'tb_delete'}
                size="small"
                startIcon={btn.icon}
                sx={{ml: 1}}>
                {btn.label}
            </Button>)}
        </Box>
    </Box>
}