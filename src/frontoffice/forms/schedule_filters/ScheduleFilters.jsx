import {Autocomplete, Box, FormControlLabel, FormGroup, Slider, TextField, Typography,} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import Checkbox from '@mui/material/Checkbox'
import {
    setScheduleFiltersFilmAgeSelect,
    setScheduleFiltersFilmCopyTypes,
    setScheduleFiltersFilmsSelect,
    setScheduleFiltersHallsSelect,
    setScheduleFiltersHallTypeRegular,
    setScheduleFiltersHallTypeVip,
    setScheduleFiltersPrice,
    setScheduleFiltersSeanceCanceled,
    setScheduleFiltersSeanceClosed,
    setScheduleFiltersSeanceOpened,
    setScheduleFiltersTime,
} from '../../../redux/scheduleReducer.js'
import {useSetScheduleFilters} from './useSetScheduleFilters.js'
import {useEffect, useState} from 'react'

const ScheduleFilters = () => {
    const dispatch = useDispatch()

    useSetScheduleFilters()

    const films = useSelector((state) => state.schedule.schedule_filters_films)
    const halls = useSelector((state) => state.schedule.schedule_filters_halls)
    const film_copy_types = useSelector((state) => state.schedule.schedule_filters_film_copy_types)

    const seance_closed = useSelector((state) => state.schedule.schedule_filters_seance_closed)
    const seance_canceled = useSelector((state) => state.schedule.schedule_filters_seance_canceled)
    const seance_opened = useSelector((state) => state.schedule.schedule_filters_seance_opened)
    const films_selected = useSelector((state) => state.schedule.schedule_filters_films_selected)
    const film_copy_types_selected = useSelector(
        (state) => state.schedule.schedule_filters_film_copy_types_selected
    )
    const film_age = useSelector((state) => state.schedule.schedule_filters_film_age)
    const halls_selected = useSelector((state) => state.schedule.schedule_filters_halls_selected)
    const hall_type_vip = useSelector((state) => state.schedule.schedule_filters_hall_type_vip)
    const hall_type_regular = useSelector(
        (state) => state.schedule.schedule_filters_hall_type_regular
    )
    const seance_time = useSelector((state) => state.schedule.schedule_filters_time)
    const seance_price = useSelector((state) => state.schedule.schedule_filters_price)

    const [age, set_age] = useState([0, 100])
    const [time, set_time] = useState([0, 100])
    const [price, set_price] = useState([0, 100000])

    const tags = (size, multiply, limit_tags, id, options, label, placeholder, selected_uid = []) => {
        return (
            <Autocomplete
                onChange={(event, new_value) => {
                    switch (id) {
                        case 'schedule-films-tags':
                            dispatch(setScheduleFiltersFilmsSelect(new_value))
                            break
                        case 'schedule-halls-tags':
                            dispatch(setScheduleFiltersHallsSelect(new_value))
                            break
                        case 'schedule-film-copy_type-tags':
                            dispatch(setScheduleFiltersFilmCopyTypes(new_value))
                            break
                        default:
                            break
                    }
                }}
                value={selected_uid}
                noOptionsText={'Нет подходящих опций'}
                size={size}
                multiple={multiply}
                limitTags={limit_tags}
                id={id}
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField
                        sx={{width: '100%'}}
                        variant="filled"
                        {...params}
                        label={label}
                        placeholder={placeholder}
                    />
                )}
                sx={{width: '100%', marginBottom: '4px'}}
                isOptionEqualToValue={(option, value) => option.uid === value.uid}
            />
        )
    }

    useEffect(() => {
        set_age(film_age)
        set_time(seance_time)
        set_price(seance_price)
    }, [film_age, seance_time, seance_price])

    return (
        <Box component="form">
            <Typography variant="h6" color="textSecondary" sx={{mb: 1}}>
                Настройки расписания
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary" sx={{mb: 1}}>
                        Показывать сеансы:
                    </Typography>
                    <FormGroup sx={{display: 'flex', flexDirection: 'row'}}>
                        <FormControlLabel
                            control={<Checkbox size="large"/>}
                            label="закрытые"
                            checked={seance_closed}
                            onChange={(event) => dispatch(setScheduleFiltersSeanceClosed(event.target.checked))}
                        />
                        <FormControlLabel
                            control={<Checkbox size="large"/>}
                            label="отмененные"
                            checked={seance_canceled}
                            onChange={(event) => dispatch(setScheduleFiltersSeanceCanceled(event.target.checked))}
                        />
                        <FormControlLabel
                            control={<Checkbox size="large"/>}
                            label="в продаже"
                            checked={seance_opened}
                            onChange={(event) => dispatch(setScheduleFiltersSeanceOpened(event.target.checked))}
                        />
                    </FormGroup>
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary" sx={{mb: 1}}>
                        Показывать типы залов:
                    </Typography>
                    <FormGroup sx={{display: 'flex', flexDirection: 'row'}}>
                        <FormControlLabel
                            control={<Checkbox size="large"/>}
                            label="вип-залы"
                            checked={hall_type_vip}
                            onChange={(event) => dispatch(setScheduleFiltersHallTypeVip(event.target.checked))}
                        />
                        <FormControlLabel
                            control={<Checkbox size="large"/>}
                            label="обычные залы"
                            checked={hall_type_regular}
                            onChange={(event) =>
                                dispatch(setScheduleFiltersHallTypeRegular(event.target.checked))
                            }
                        />
                    </FormGroup>
                </Box>
                <Box>
                    {tags('large', true, 4, 'schedule-films-tags', films, 'Фильмы', 'Фильм', films_selected)}
                </Box>
                <Box>
                    {tags('large', true, 4, 'schedule-halls-tags', halls, 'Залы', 'Зал', halls_selected)}
                </Box>
                <Box>
                    {tags(
                        'large',
                        true,
                        2,
                        'schedule-film-copy_type-tags',
                        film_copy_types,
                        'Типы копии фильма',
                        'Тип копии фильма',
                        film_copy_types_selected
                    )}
                </Box>
                <Typography variant="subtitle2" color="textSecondary" sx={{mb: 1}}>
                    Возрастные ограничения:
                </Typography>
                <Box sx={{margin: '0 20px'}}>
                    <Slider
                        value={age}
                        onChange={(e, new_value) => set_age(new_value)}
                        onChangeCommitted={(e, new_value) => {
                            const snapped = new_value.map((el) => snapToMark(el, [0, 25, 50, 75, 100]))
                            dispatch(setScheduleFiltersFilmAgeSelect(snapped))
                        }}
                        min={0}
                        max={100}
                        step={25}
                        marks={[
                            {value: 0, label: '0+'},
                            {value: 25, label: '6+'},
                            {
                                value: 50,
                                label: '12+',
                            },
                            {value: 75, label: '16+'},
                            {value: 100, label: '18+'},
                        ]}
                        valueLabelDisplay="off"
                        disableSwap
                    />
                </Box>
                <Typography variant="subtitle2" color="textSecondary" sx={{mb: 1}}>
                    Время сеансов:
                </Typography>
                <Box sx={{margin: '0 20px'}}>
                    <Slider
                        value={time}
                        onChange={(e, new_value) => set_time(new_value)}
                        onChangeCommitted={(e, new_value) => {
                            if (!Array.isArray(new_value)) return
                            const snapped = new_value.map((el) =>
                                snapToMark(
                                    el,
                                    [
                                        0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80,
                                        84, 88, 92, 96, 100,
                                    ]
                                )
                            )
                            dispatch(setScheduleFiltersTime(snapped))
                        }}
                        min={0}
                        max={100}
                        step={4}
                        marks={[
                            {value: 0, label: '7'},
                            {value: 4, label: ''},
                            {value: 8, label: '9'},
                            {
                                value: 12,
                                label: '',
                            },
                            {value: 16, label: '11'},
                            {value: 20, label: ''},
                            {value: 24, label: '13'},
                            {
                                value: 28,
                                label: '',
                            },
                            {value: 32, label: '15'},
                            {value: 36, label: ''},
                            {value: 40, label: '17'},
                            {
                                value: 44,
                                label: '',
                            },
                            {value: 48, label: '19'},
                            {value: 52, label: ''},
                            {value: 56, label: '21'},
                            {
                                value: 60,
                                label: '',
                            },
                            {value: 64, label: '23'},
                            {value: 68, label: ''},
                            {value: 72, label: '1'},
                            {
                                value: 76,
                                label: '',
                            },
                            {value: 80, label: '3'},
                            {value: 84, label: ''},
                            {value: 88, label: '5'},
                            {
                                value: 92,
                                label: '',
                            },
                            {value: 96, label: '6'},
                            {value: 100, label: '7'},
                        ]}
                        valueLabelDisplay="off"
                        disableSwap
                    />
                </Box>
                <Typography variant="subtitle2" color="textSecondary" sx={{mb: 1}}>
                    Стоимость билета:
                </Typography>
                <Box sx={{margin: '0 20px'}}>
                    <Slider
                        value={price}
                        onChange={(e, new_value) => set_price(new_value)}
                        onChangeCommitted={(e, new_value) => {
                            if (!Array.isArray(new_value)) return
                            dispatch(setScheduleFiltersPrice(new_value))
                        }}
                        min={0}
                        max={10000}
                        step={50}
                        valueLabelDisplay="true"
                        disableSwap
                    />
                </Box>
            </Box>
    </Box>
    )
}

export default ScheduleFilters

const snapToMark = (value, allowed) => {
    return allowed.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    )
}
