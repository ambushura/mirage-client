import {Autocomplete, Box, FormControlLabel, FormGroup, TextField, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import Checkbox from "@mui/material/Checkbox"
import {
    setScheduleFiltersFilmsSelect, setScheduleFiltersFilmTypesSelect, setScheduleFiltersHallsSelect,
    setScheduleFiltersHallTypeRegular,
    setScheduleFiltersHallTypeVip,
    setScheduleFiltersSeanceCanceled,
    setScheduleFiltersSeanceClosed,
    setScheduleFiltersSeanceOpened
} from "../../../redux/scheduleReducer.js"
import {useSetScheduleFilters} from "./useSetScheduleFilters.js"

const ScheduleFilters = () => {

    const dispatch = useDispatch()

    useSetScheduleFilters()

    const films = useSelector(state => state.schedule.schedule_filters_films)
    const halls = useSelector(state => state.schedule.schedule_filters_halls)
    const film_types = useSelector(state => state.schedule.schedule_filters_film_types)
    const film_copy_types = useSelector(state => state.schedule.schedule_filters_film_copy_types)

    const seance_closed = useSelector(state => state.schedule.schedule_filters_seance_closed)
    const seance_canceled = useSelector(state => state.schedule.schedule_filters_seance_canceled)
    const seance_opened = useSelector(state => state.schedule.schedule_filters_seance_opened)
    const films_selected = useSelector(state => state.schedule.schedule_filters_films_selected)
    const film_types_selected = useSelector(state => state.schedule.schedule_filters_film_types_selected)
    const film_copy_types_selected = useSelector(state => state.schedule.schedule_filters_film_copy_types_selected)
    const film_age = useSelector(state => state.schedule.schedule_filters_film_age)
    const halls_selected = useSelector(state => state.schedule.schedule_filters_halls_selected)
    const hall_type_vip = useSelector(state => state.schedule.schedule_filters_hall_type_vip)
    const hall_type_regular = useSelector(state => state.schedule.schedule_filters_hall_type_regular)
    const beginning = useSelector(state => state.schedule.schedule_filters_beginning)
    const ending = useSelector(state => state.schedule.schedule_filters_ending)
    const price_from = useSelector(state => state.schedule.schedule_filters_price_from)
    const price_to = useSelector(state => state.schedule.schedule_filters_price_to)

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
                        case 'schedule-film-type-tags':
                            dispatch(setScheduleFiltersFilmTypesSelect(new_value))
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
                    <TextField sx={{width: '100%'}} variant='filled' {...params} label={label}
                               placeholder={placeholder}/>
                )}
                sx={{width: '100%', marginBottom: '4px'}}
                isOptionEqualToValue={(option, value) => option.uid === value.uid}
            />
        )
    }

    return (
        <Box component='form'>
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
                            control={<Checkbox size='large'/>}
                            label="закрытые"
                            checked={seance_closed}
                            onChange={(event) => dispatch(setScheduleFiltersSeanceClosed(event.target.checked))}/>
                        <FormControlLabel
                            control={<Checkbox size='large'/>}
                            label="отмененные"
                            checked={seance_canceled}
                            onChange={(event) => dispatch(setScheduleFiltersSeanceCanceled(event.target.checked))}/>
                        <FormControlLabel
                            control={<Checkbox size='large'/>}
                            label="открытые"
                            checked={seance_opened}
                            onChange={(event) => dispatch(setScheduleFiltersSeanceOpened(event.target.checked))}/>
                    </FormGroup>
                </Box>
                <Box>
                    <Typography variant='subtitle2' color="textSecondary" sx={{mb: 1}}>
                        Показывать типы залов:
                    </Typography>
                    <FormGroup sx={{display: 'flex', flexDirection: 'row'}}>
                        <FormControlLabel
                            control={<Checkbox size='large'/>}
                            label="вип-залы"
                            checked={hall_type_vip}
                            onChange={(event) => dispatch(setScheduleFiltersHallTypeVip(event.target.checked))}/>
                        <FormControlLabel
                            control={<Checkbox size='large'/>}
                            label="обычные залы"
                            checked={hall_type_regular}
                            onChange={(event) => dispatch(setScheduleFiltersHallTypeRegular(event.target.checked))}/>
                    </FormGroup>
                </Box>
                <Box>{tags("large", true, 4, "schedule-films-tags", films, "Фильмы", "Фильм", films_selected)}</Box>
                <Box>{tags("large", true, 4, "schedule-halls-tags", halls, "Залы", "Зал", halls_selected)}</Box>
                <Box>{tags("large", true, 4, "schedule-film-type-tags", film_types, "Типы фильма", "Тип фильма", film_types_selected)}</Box>
                <Box>{tags("large", true, 4, "schedule-film-copy_type-tags", film_copy_types, "Типы копии фильма", "Тип копии фильма", film_copy_types_selected)}</Box>
            </Box>
        </Box>
    )
}

export default ScheduleFilters