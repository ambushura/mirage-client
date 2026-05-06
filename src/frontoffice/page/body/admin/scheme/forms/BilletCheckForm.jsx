import {Box, IconButton, InputAdornment, TextField, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {Visibility, VisibilityOff} from '@mui/icons-material'
import Loader from '../../../../../../ui/Loader.jsx'
import {common_catalog_get} from '../../../../../../service/fetch_service.js'

export function BilletCheckForm({props}) {
    const dispatch = useDispatch()

    const filial = useSelector((state) => state.data.filial)
    const param_date = useSelector((state) => state.interface.params.param_date)

    const [showPassword, set_show_password] = useState(false)
    const [errors, set_errors] = useState({})
    const toggle_show_password = () => set_show_password((v) => !v)

    const [obj, set_obj] = useState(null)
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(
                common_catalog_get(filial, 'billet_check', props.uid, param_date)
            )
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                set_obj(fetching_result.data)
            }
        }
        fetch()
    }, [dispatch, filial, param_date, props.uid])

    const handleSubmit = () => {
    }

    const handleChange = (field) => (e) => {
        set_obj((prev) => ({...prev, [field]: e.target.value}))
        set_errors((prev) => ({...prev, [field]: undefined}))
    }

    if (obj !== null) {
        return (
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{width: 500, p: 1}}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h6" color="textSecondary">
                    Билетный контролер <strong>{obj.name}</strong>
                </Typography>

                <TextField
                    variant="filled"
                    fullWidth
                    label="Наименование"
                    value={obj.name}
                    onChange={handleChange('name')}
                    margin="dense"
                    error={!!errors.name}
                    helperText={errors.name}
                    autoFocus
                    inputProps={{'aria-label': 'name'}}
                />

                <TextField
                    variant="filled"
                    fullWidth
                    label="Пароль"
                    type={showPassword ? 'text' : 'password'}
                    value={obj.password}
                    onChange={handleChange('password')}
                    margin="dense"
                    error={!!errors.password}
                    helperText={errors.password}
                    inputProps={{'aria-label': 'password'}}
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
                        ),
                    }}
                />

                <Box>
                    {obj.sessions.map((session) => {
                        return <Box key={session.token}>{session.token}</Box>
                    })}
                </Box>
            </Box>
        )
    } else {
        return (
            <Box>
                <Loader size={2}/>
            </Box>
        )
    }
}
