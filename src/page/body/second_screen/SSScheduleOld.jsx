import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import {motion} from "framer-motion"
import cover from "../../../images/cover.png"
import dayjs from "dayjs"

const SSScheduleOld = ({width, height}) => {
    const filial = useSelector(state => state.data.filial)
    const schedule = useSelector(state => state.second_screen.schedule)

    if (!schedule) return <Box>Расписание загружается</Box>

    function binPack(rects, binWidth, binHeight) {
        let spaces = [{x: 0, y: 0, w: binWidth, h: binHeight}]
        let result = []
        for (let r of rects) {
            let idx = spaces.findIndex(s => r.w <= s.w && r.h <= s.h)
            if (idx === -1) continue
            let space = spaces[idx]
            result.push({...r, x: space.x, y: space.y})
            spaces.splice(idx, 1)
            spaces.push({x: space.x + r.w, y: space.y, w: space.w - r.w, h: r.h})
            spaces.push({x: space.x, y: space.y + r.h, w: space.w, h: space.h - r.h})
        }
        return result
    }

    // 1. Базовые размеры карточек
    const baseRects = schedule.map(film => {
        const area = film.seances.length || 1
        const aspectRatio = 2
        const baseH = Math.sqrt(area / aspectRatio)
        const baseW = aspectRatio * baseH
        return {baseW, baseH, film, seancesCount: film.seances.length}
    })

    // 2. Масштаб под экран
    const totalBaseArea = baseRects.reduce((acc, r) => acc + r.baseW * r.baseH, 0)
    const screenArea = width * height
    const scale = Math.sqrt(screenArea / totalBaseArea) * 0.9

    let rects = baseRects.map(r => ({
        w: Math.ceil(r.baseW * scale), h: Math.ceil(r.baseH * scale), film: r.film, seancesCount: r.seancesCount
    }))

    // 3. Пакуем карточки
    rects.sort((a, b) => (b.w * b.h) - (a.w * a.h))
    const packed = binPack(rects, width, height)

    // 4. Максимальная высота карточки
    const maxCardHeight = Math.max(...packed.map(r => r.h))
    const baseSeanceFont = {hall: maxCardHeight * 0.04, time: maxCardHeight * 0.08}

    return <>
        {packed.map((r, idx) => {
            // масштаб под текущую карточку
            const scaleFactor = Math.min(1, r.h / maxCardHeight)

            return (<Box
                key={r.film.uid}
                className='ss-film-box'
                sx={{
                    position: 'absolute',
                    left: r.x,
                    top: r.y,
                    width: r.w,
                    height: 'auto',
                    minHeight: r.h,
                    overflow: 'visible',
                }}
            >
                <motion.div
                    className='ss-film-box-motion'
                    initial={{opacity: 0, scale: 0.9, y: 20}}
                    animate={{opacity: 1, scale: 1, y: 0}}
                    transition={{duration: 0.4, delay: idx * 0.05}}
                >
                    <Box className='ss-film-box-card' sx={{display: 'flex', width: '100%', height: 'auto'}}>
                        {/* Постер */}
                        <Box
                            className='ss-film-box-poster'
                            sx={{
                                width: `${r.h * (174 / 268)}px`,
                                height: 'auto',
                                backgroundImage: `url(${r.film.cover_link === '' ? cover : `http://${filial.media_ip}:${filial.media_port}` + r.film.cover_link})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        {/* Контент */}
                        <Box className='ss-film-box-content' sx={{flex: 1, overflow: 'visible', ml: 1}}>
                            {/* Заголовок */}
                            <Box
                                className='ss-film-box-title'
                                sx={{
                                    fontSize: `clamp(12px, ${r.h * 0.10}px, 18px)`,
                                    lineHeight: 1.2,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {r.film.name}
                            </Box>

                            {/* Подзаголовок */}
                            <Box className='ss-film-box-sub-title'>
                                {r.film.rate_age}+ {r.film.copy_type} · {r.film.duration} м.
                            </Box>

                            {/* Сеансы */}
                            <Box className='ss-film-box-seances' sx={{overflow: 'visible'}}>
                                {r.film.seances.map((seance, i) => (<motion.div
                                    key={seance.uid}
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.3, delay: i * 0.05}}
                                >
                                    <Box className='ss-film-box-seance-box'>
                                        <Box
                                            sx={{fontSize: `clamp(8px, ${baseSeanceFont.hall * scaleFactor}px, 24px)`}}>
                                            Зал {seance.name_hall}
                                        </Box>
                                        <Box sx={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: `clamp(12px, ${baseSeanceFont.time * scaleFactor}px, 24px)`,
                                        }}>
                                            {dayjs(seance.beginning).format("HH:mm")}
                                        </Box>
                                    </Box>
                                </motion.div>))}
                            </Box>
                        </Box>
                    </Box>
                </motion.div>
            </Box>)
        })}
    </>
}

export default SSScheduleOld