import {DateCalendar} from "@mui/x-date-pickers"

const Calendar = (props) => {
    return (<DateCalendar
        value={props.value}
        onChange={props.handleOnChahge}
        sx={{
            backgroundColor: '#0E0F11', opacity: '95%', textTransform: 'uppercase', "& .MuiDayCalendar-weekDayLabel": {
                backgroundColor: '#e3000b', borderRadius: '12px', color: 'white', fontWeight: '900'
            }, "& .MuiPickersArrowSwitcher-root": {
                marginRight: '10px'
            }
        }}
        slotProps={{
            desktopPaper: {sx: {backgroundColor: '#393a3b'}},
            mobilePaper: {sx: {backgroundColor: '#393a3b'}},
            layout: {sx: {backgroundColor: '#393a3b', borderRadius: '10px'}},
            day: {
                sx: {
                    backgroundColor: '#1C1F23',
                    "&:hover": {backgroundColor: '#282a2e'},
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            calendarHeader: {
                sx: {
                    color: 'white', textTransform: 'capitalize'
                }
            },
            monthButton: {sx: {backgroundColor: 'white'}},
            yearButton: {sx: {backgroundColor: '#1C1F23', color: 'white'}},
            openPickerIcon: {sx: {padding: '10px', marginRight: '20px'}},
            previousIconButton: {
                sx: {
                    borderRadius: '16px', backgroundColor: '#2e3239', "&:hover": {backgroundColor: '#1f2226'}
                }
            },
            nextIconButton: {
                sx: {
                    borderRadius: '16px',
                    marginLeft: 0,
                    backgroundColor: '#2e3239',
                    "&:hover": {backgroundColor: '#1f2226'}
                }
            }
        }}
        format="DD dd"
        views={['day']}
    />)
}

export default Calendar