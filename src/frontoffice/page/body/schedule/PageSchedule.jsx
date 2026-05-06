import {Box, Button, Fade} from '@mui/material'
import SeanceCard from './SeanceCard.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {Fragment, useEffect, useRef, useState} from 'react'
import Loader from '../../../../ui/Loader.jsx'
import {TIMEOUT} from '../../../../redux/interfaceReducer.js'
import {AnimatePresence, motion} from 'framer-motion'
import NewSeance from './NewSeance.jsx'
import dayjs from 'dayjs'
import {cinema_schedule_halls_get} from '../../../../service/fetch_service.js'
import {cleanSchedule, setSchedule} from '../../../../redux/scheduleReducer.js'
import Order from '../../right-panel/Order.jsx'

const PageSchedule = () => {
  const dispatch = useDispatch()

  const uid_user = useSelector((state) => state.auth.uid)

  const city = useSelector((state) => state.data.city)
  const schedule = useSelector((state) => state.schedule.schedule || [])
  const pre_order = useSelector((state) => state.orders.pre_order)
  const horder = useSelector((state) => state.orders.horder)

  const elementsRef = useRef(new Map())
  const [content_width, set_content_width] = useState(200)

  useEffect(() => {
    const widths = Array.from(elementsRef.current.values()).map(
      (el) => el?.getBoundingClientRect().width || 0
    )
    set_content_width(Math.max(...widths))
  }, [schedule])

  const show_free_space = useSelector((state) => state.schedule.show_free_space)

  const filial = useSelector((state) => state.data.filial)
  const param_date = useSelector((state) => state.interface.params.param_date)
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
  const film_types_selected = useSelector(
    (state) => state.schedule.schedule_filters_film_types_selected
  )

  const schedule_update = useSelector((state) => state.schedule.schedule_update)

  useEffect(() => {
    let active = true
    const fetch = async (f) => {
      const fetching_result = await dispatch(
        cinema_schedule_halls_get(
          f,
          param_date,
          seance_closed,
          seance_canceled,
          seance_opened,
          films_selected.map((f) => f.uid),
          film_copy_types_selected.map((f) => f.uid),
          film_age,
          halls_selected.map((f) => f.uid),
          hall_type_vip,
          hall_type_regular,
          seance_time,
          seance_price,
          film_types_selected.map((f) => f.uid)
        )
      )
      if (active) {
        dispatch(setSchedule({ ...fetching_result, filial: f }))
      }
    }

    dispatch(cleanSchedule())
    if (filial !== undefined) {
      fetch(filial)
    } else if (city !== undefined) {
      city.filials.forEach((f) => fetch(f))
    }

    return () => {
      active = false
      dispatch(cleanSchedule())
    }
  }, [
    city,
    dispatch,
    filial,
    film_age,
    film_copy_types_selected,
    film_types_selected,
    films_selected,
    hall_type_regular,
    hall_type_vip,
    halls_selected,
    param_date,
    seance_canceled,
    seance_closed,
    seance_opened,
    seance_price,
    seance_time,
    schedule_update,
  ])

  const [schedule_empty, set_schedule_empty] = useState(true)
  useEffect(() => {
    schedule.forEach((filial_data) => {
      if (filial_data.data !== null) {
        if (filial_data.data.length > 0) {
          set_schedule_empty(false)
        }
      }
    })
  }, [schedule])

  return (
    <Box
      id="content-box"
      style={{
        height: 'calc(var(--page-height) + var(--header-height)) + var(--footer-height)',
        width:
          uid_user !== null && (pre_order.in_base || horder.in_base)
            ? 'calc(100vw - var(--order-width))'
            : '100vw',
      }}
    >
      <Box id="content" sx={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '100vh' }}>
        <Box id="schedule-full">
          <Box id="content-header"></Box>
          {schedule_empty ? (
            <Box className="empty-box" sx={{ minHeight: 'var(--page-height)' }}>
              Нет сеансов на эту дату...
            </Box>
          ) : null}
          {schedule.map((filial_data, index) => {
            if (filial_data.error !== null) {
              return <Box key={filial_data.filial.uid}></Box>
            } else if (filial_data.loading) {
              return (
                <Box key={filial_data.filial.uid}>
                  <Box
                    className="schedule-full-filial-name glass"
                    style={{ width: `${content_width}px` }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ marginBottom: '5px', minWidth: '210px' }}
                    >
                      {filial_data.filial.name}
                    </Button>
                  </Box>
                  <Box className="schedule-full-filial">
                    <Loader key={filial_data.filial.uid} />
                  </Box>
                </Box>
              )
            } else if (filial_data.data.length > 0) {
              return (
                <Box key={filial_data.filial.uid}>
                  <Box
                    className="schedule-full-filial-name glass blur-border"
                    style={{
                      width: `${content_width}px`,
                      fontSize: '18px',
                      fontWeight: 'bold',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ minWidth: '210px', position: 'sticky', left: '4px' }}>
                      {filial_data.filial.name}
                    </Box>
                  </Box>
                  <Box
                    className="schedule-full-filial"
                    ref={(el) => elementsRef.current.set(index, el)}
                  >
                    {filial_data.data
                      .slice()
                      .sort((a, b) => {
                        const A = String(a?.hall?.name_full ?? '').trim()
                        const B = String(b?.hall?.name_full ?? '').trim()
                        return A.localeCompare(B, 'ru', { numeric: true, sensitivity: 'base' })
                      })
                      .map((hall) => {
                        const sortedSeances = hall.seances
                          .slice()
                          .sort(
                            (a, b) => dayjs(a.beginning).valueOf() - dayjs(b.beginning).valueOf()
                          )

                        return (
                          <Fade
                            key={hall.uid_hall}
                            in={sortedSeances.length > 0}
                            timeout={TIMEOUT}
                            unmountOnExit
                          >
                            <Box className="schedule-full-hall">
                              <Box
                                className="schedule-full-hall-name"
                                style={{ position: 'sticky', zIndex: 2 }}
                              >
                                <Button
                                  variant="contained"
                                  style={{
                                    width: '100%',
                                    backgroundColor: 'var(--bgr-seance-card)',
                                    color: 'var(--txt-color)',
                                  }}
                                >
                                  Зал {hall.hall.name_full}
                                </Button>
                              </Box>
                              <AnimatePresence>
                                {sortedSeances.length > 0 && (
                                  <motion.div
                                    className="schedule-full-seances"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={containerVariants}
                                  >
                                    {sortedSeances.map((seance, i) => {
                                      if (show_free_space) {
                                        return (
                                          <Fragment key={i}>
                                            {i === 0 && (
                                              <motion.div
                                                className="schedule-full-seance"
                                                key="first"
                                                variants={itemVariants}
                                              >
                                                <NewSeance
                                                  uid_hall={hall.uid_hall}
                                                  name_hall={hall.name_full_hall}
                                                  beginning={null}
                                                  ending={dayjs
                                                    .utc(sortedSeances[0].beginning)
                                                    .add(-1, 'minute')}
                                                />
                                              </motion.div>
                                            )}

                                            <motion.div
                                              className="schedule-full-seance"
                                              key={`${seance.uid}${seance.ver}`}
                                              variants={itemVariants}
                                            >
                                              <SeanceCard
                                                key={seance.uid}
                                                city={city}
                                                filial={filial_data.filial}
                                                seance={seance}
                                              />
                                            </motion.div>

                                            {i !== sortedSeances.length - 1 && (
                                              <motion.div
                                                className="schedule-full-seance"
                                                key={`${seance.uid}-gap`}
                                                variants={itemVariants}
                                              >
                                                <NewSeance
                                                  uid_hall={hall.uid_hall}
                                                  name_hall={hall.name_full_hall}
                                                  beginning={dayjs
                                                    .utc(sortedSeances[i].ending)
                                                    .add(1, 'minute')}
                                                  ending={dayjs
                                                    .utc(sortedSeances[i + 1].beginning)
                                                    .add(-1, 'minute')}
                                                />
                                              </motion.div>
                                            )}

                                            {i === sortedSeances.length - 1 && (
                                              <motion.div
                                                className="schedule-full-seance"
                                                key="last"
                                                variants={itemVariants}
                                              >
                                                <NewSeance
                                                  uid_hall={hall.uid_hall}
                                                  name_hall={hall.name_full_hall}
                                                  beginning={dayjs
                                                    .utc(sortedSeances[i].ending)
                                                    .add(1, 'minute')}
                                                  ending={null}
                                                />
                                              </motion.div>
                                            )}
                                          </Fragment>
                                        )
                                      } else {
                                        return (
                                          <motion.div
                                            className="schedule-full-seance"
                                            key={`${seance.uid}${seance.ver}`}
                                            variants={itemVariants}
                                          >
                                            <SeanceCard
                                              key={seance.uid}
                                              city={city}
                                              filial={filial_data.filial}
                                              seance={seance}
                                            />
                                          </motion.div>
                                        )
                                      }
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Box>
                          </Fade>
                        )
                      })}
                  </Box>
                </Box>
              )
            } else {
              return null
            }
          })}
        </Box>
        <Box id="content-footer"></Box>
        <Box sx={{ position: 'fixed', right: 0, top: 'var(--header-height)', zIndex: 3 }}>
          <Order />
        </Box>
      </Box>
    </Box>
  )
}

export default PageSchedule

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}
