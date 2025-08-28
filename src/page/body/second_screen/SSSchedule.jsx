import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "../../../redux/interfaceReducer.js"
import {useSetSecondScreen} from "./useSetSecondScreen.js"
import background from "../../../images/background.jpg"
import {motion} from "framer-motion"
import cover from "../../../images/cover.jpg"
import dayjs from "dayjs"

const SsSchedule = () => {

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

    const settings = useSelector(state => state.data.settings)

    const app_width = useSelector(state => state.interface.app_width)
    const app_height = useSelector(state => state.interface.app_height)

    const [screen_width, set_screen_width] = useState(100)
    const [screen_height, set_screen_height] = useState(100)

    useEffect(() => {
        set_screen_width(app_width)
        set_screen_height(app_height - HEADER_HEIGHT[1] - FOOTER_HEIGHT[1])
    }, [app_height, app_width])

    const schedule = useSetSecondScreen()

    if (!schedule) {
        return <Box>Расписание загружается</Box>
    }

    const baseRects = schedule.map(film => {
        const area = film.seances.length
        const aspectRatio = 2
        const baseH = Math.sqrt(area / aspectRatio)
        const baseW = aspectRatio * baseH
        return {baseW, baseH, film}
    })

    const totalBaseArea = baseRects.reduce((acc, r) => acc + r.baseW * r.baseH, 0)
    const screenArea = screen_width * screen_height
    const scale = Math.sqrt(screenArea / totalBaseArea) * 0.9

    // перед binPack сортируем по площади
    const rects = baseRects.map(r => ({
        w: Math.ceil(r.baseW * scale),
        h: Math.ceil(r.baseH * scale),
        film: r.film
    }))

    // сортировка: сначала большие
    rects.sort((a, b) => (b.w * b.h) - (a.w * a.h))

    // теперь упаковываем
    const packed = binPack(rects, screen_width, screen_height)

    return (
        <Box
            className='ss-background'
            sx={{
                width: `${screen_width}px`,
                height: `${screen_height}px`,
                backgroundImage: `url(${background})`
            }}
        >
            {packed.map((r, idx) => (
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
                                    sx={{fontSize: `clamp(13px, ${r.h * 0.10}px, 24px)`,}}>
                                    {r.film.name} {r.film.rate_age}+
                                </Box>
                                <Box className='ss-film-box-sub-title'>{r.film.copy_type} · {r.film.duration} мин.</Box>
                                <Box className='ss-film-box-seances'>
                                    {r.film.seances.map((seance, i) => (
                                        <motion.div
                                            key={seance.uid}
                                            initial={{opacity: 0, scale: 0.8}}
                                            animate={{opacity: 1, scale: 1}}
                                            transition={{duration: 0.3, delay: i * 0.05}}>
                                            <Box className='ss-film-box-seance-box'>
                                                <Box
                                                    sx={{fontSize: `clamp(10px, ${r.h * 0.04}px, 24px)`}}>Зал {seance.name_hall}</Box>
                                                <Box sx={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: `clamp(12px, ${r.h * 0.08}px, 24px)`,
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
            ))}
        </Box>
    )
}

export default SsSchedule