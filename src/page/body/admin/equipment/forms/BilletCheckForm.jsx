import {Box, Button, IconButton, InputAdornment, TextField, Typography} from "@mui/material"
import {useFetching} from "../../../../../hooks/common/useFetching.js"
import {ROUTE_COMMON_CATALOG_GET} from "../../../../../service/fetch_routes.js"
import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {Visibility, VisibilityOff} from "@mui/icons-material"
import Loader from "../../../../../ui/Loader.jsx"

export function BilletCheckForm({props}) {

    const filial = useSelector(state => state.data.filial)
    const param_date = useSelector(state => state.interface.params.param_date)

    const [values, set_values] = useState({uid: '', uid_filial: '', name: '', password: ''})
    const [showPassword, set_show_password] = useState(false)
    const [errors, set_errors] = useState({})
    const toggle_show_password = () => set_show_password(v => !v)

    const [fetch_data, fetch_errors, fetch_loading] = useFetching(
        {
            url: `http://${filial.ip}:${filial.port}${ROUTE_COMMON_CATALOG_GET}`,
            uid_filial: filial.uid,
            params: {
                type: 'billet_check',
                uid: props.uid,
                date_shift: param_date,
            }
        }
    )

    useEffect(() => {
        if (fetch_data !== null) {
            set_values({
                uid: fetch_data.uid,
                name: fetch_data.name,
                password: fetch_data.password,
            })
        }
    }, [fetch_data])

    const handleSubmit = () => {

    }

    const handleChange = (field) => (e) => {
        set_values(prev => ({...prev, [field]: e.target.value}))
        set_errors(prev => ({...prev, [field]: undefined}))
    }

    if (fetch_data !== null) {

        return <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{width: 500, p: 1}}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h6" color="textSecondary">
                Билетный контролер <strong>{values.name}</strong>
            </Typography>

            <TextField
                variant='filled'
                fullWidth
                label="Наименование"
                value={values.name}
                onChange={handleChange('name')}
                margin="dense"
                error={!!errors.name}
                helperText={errors.name}
                autoFocus
                inputProps={{"aria-label": "name"}}
            />

            <TextField
                variant='filled'
                fullWidth
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                margin="dense"
                error={!!errors.password}
                helperText={errors.password}
                inputProps={{"aria-label": "password"}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                onClick={toggle_show_password}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Button sx={{flex: 1, marginRight: '2px'}} variant='contained' color="secondary"
                        onClick={() => (values)}>Сохранить</Button>
                <Button sx={{flex: 1, marginLeft: '2px'}} variant="contained" color="error"
                        onClick={() => (values)}>Удалить</Button>
            </Box>

            <Box>
                {fetch_data.sessions.map(session => {
                    return (
                        <Box key={session.token}>{session.token}</Box>
                    )
                })}
            </Box>

        </Box>

    } else {

        return <Box><Loader/></Box>

    }
}