import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import {motion} from "framer-motion"
import cover from "../../../images/cover.jpg"
import dayjs from "dayjs"

const SsSchedule = ({width, height}) => {

    function binPack(rects, binWidth, binHeight) {
        let spaces = [{x: 0, y: 0, w: binWidth, h: binHeight}]
        let result = []
        for (let r of rects) {
            let idx = spaces.findIndex(s => r.w <= s.w && r.h <= s.h)
            if (idx === -1) continue
            let space = spaces[idx]
            result.push({...r, x: space.x, y: space.y})
            spaces.splice(idx, 1)
            spaces.push({
                x: space.x + r.w,
                y: space.y,
                w: space.w - r.w,
                h: r.h
            })
            spaces.push({
                x: space.x,
                y: space.y + r.h,
                w: space.w,
                h: space.h - r.h
            })
        }
        return result
    }

    const schedule = useSelector(state => state.second_screen.schedule)
    const settings = useSelector(state => state.data.settings)

    if (!schedule) return <Box>Расписание загружается</Box>

    // 1. Рассчитываем базовые прямоугольники для всех фильмов
    const baseRects = schedule.map(film => {
        const area = film.seances.length
        const aspectRatio = 2
        const baseH = Math.sqrt(area / aspectRatio)
        const baseW = aspectRatio * baseH
        return {baseW, baseH, film}
    })

    // 2. Масштабируем все карточки под экран
    const totalBaseArea = baseRects.reduce((acc, r) => acc + r.baseW * r.baseH, 0)
    const screenArea = width * height
    const scale = Math.sqrt(screenArea / totalBaseArea) * 0.9

    let rects = baseRects.map(r => ({
        w: Math.ceil(r.baseW * scale),
        h: Math.ceil(r.baseH * scale),
        film: r.film
    }))

    rects.sort((a, b) => (b.w * b.h) - (a.w * a.h))
    const packed = binPack(rects, width, height)

    // 3. Находим максимальную высоту карточки
    const maxCardHeight = Math.max(...packed.map(r => r.h))

    // 4. Задаем базовый размер шрифта по максимальной карточке
    const baseSeanceFont = {
        hall: maxCardHeight * 0.04,
        time: maxCardHeight * 0.08
    }

    const pre_order = useSelector(state => state.second_screen.pre_order)
    const horder = useSelector(state => state.second_screen.horder)

    return (
        <>
            {packed.map((r, idx) => {
                // масштаб для текущей карточки
                const scaleFactor = Math.min(1, r.h / maxCardHeight)
                return (
                    <Box
                        className='ss-film-box'
                        key={r.film.uid}
                        sx={{
                            left: r.x,
                            top: r.y,
                            width: r.w,
                            height: r.h,
                        }}
                    >
                        <motion.div
                            className='ss-film-box-motion'
                            initial={{opacity: 0, scale: 0.9, y: 20}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            transition={{duration: 0.4, delay: idx * 0.05}}>
                            <Box className='ss-film-box-card'>
                                <Box className='ss-film-box-poster'
                                     sx={{
                                         width: `${r.h * (174 / 268)}px`,
                                         backgroundImage: `url(${r.film.cover_link === '' ? cover : `http://${settings?.media_ip}:${settings?.media_port}` + r.film.cover_link})`,
                                     }}/>
                                <Box className='ss-film-box-content'>
                                    <Box
                                        className='ss-film-box-title'
                                        sx={{fontSize: `clamp(13px, ${r.h * 0.10}px, 24px)`}}>
                                        {r.film.name} {r.film.rate_age}+
                                    </Box>
                                    <Box
                                        className='ss-film-box-sub-title'>{r.film.copy_type} · {r.film.duration} мин.</Box>
                                    <Box className='ss-film-box-seances'>
                                        {r.film.seances.map((seance, i) => (
                                            <motion.div
                                                key={seance.uid}
                                                initial={{opacity: 0, scale: 0.8}}
                                                animate={{opacity: 1, scale: 1}}
                                                transition={{duration: 0.3, delay: i * 0.05}}>
                                                <Box className='ss-film-box-seance-box'>
                                                    <Box
                                                        sx={{fontSize: `clamp(8px, ${baseSeanceFont.hall * scaleFactor}px, 24px)`}}>
                                                        Зал {seance.name_hall}
                                                    </Box>
                                                    <Box sx={{
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        fontSize: `clamp(10px, ${baseSeanceFont.time * scaleFactor}px, 24px)`,
                                                    }}>
                                                        {dayjs(seance.beginning).format("HH:mm")}
                                                    </Box>
                                                </Box>
                                            </motion.div>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </motion.div>
                    </Box>
                )
            })}
        </>
    )
}

export default SsSchedule