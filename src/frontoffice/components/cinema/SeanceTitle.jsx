import { Box } from '@mui/material'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const SeanceTitle = (props) => {
    const seance = props.seance
    const beginning = dayjs.utc(seance.beginning)
    const ending = dayjs.utc(seance.ending)
    const its_hall_map = props.its_hall_map ? '-x2' : ''

    return (
        <Box className={`component-seance-title${its_hall_map}`}>
            <Box className={`component-seance-title-time${its_hall_map}`}>
                <Box style={{ paddingLeft: 0 }}>
                    {String(beginning.$H).padStart(2, '0')}:{String(beginning.$m).padStart(2, '0')}
                    <span>
                        {' '}
                        - {String(ending.$H).padStart(2, '0')}:{String(ending.$m).padStart(2, '0')}
                    </span>
                </Box>
            </Box>
            {props.day ? (
                <Box className={`component-seance-title-day${its_hall_map}`}>
                    <Box>
                        {String(beginning.$D).padStart(2, '0')}.{String(beginning.$M + 1).padStart(2, '0')}
                    </Box>
                </Box>
            ) : (
                <></>
            )}
            <Box className={`component-seance-title-copy-type${its_hall_map}`}>
                <Box>{seance.copy_type}</Box>
            </Box>
            {seance.content_type !== 'mirage' && props.content_type ? (
                <Box className={`component-seance-title-content-type-${seance.content_type}${its_hall_map}`}>
                    {seance.content_type === 'toKino' ? <Box>То Кино!</Box> : <></>}
                    {seance.content_type === 'pushkarta' ? <Box>Пушкарта</Box> : <></>}
                </Box>
            ) : (
                <></>
            )}
            {props.age ? (
                <Box className={`component-seance-title-rate-age${its_hall_map}`}>
                    <Box>{`${seance.rate_age}+`}</Box>
                </Box>
            ) : (
                <></>
            )}
        </Box>
    )
}

export default SeanceTitle
