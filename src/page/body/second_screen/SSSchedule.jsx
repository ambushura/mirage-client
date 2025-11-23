import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import "../../../css/ss.css"
import {useEffect, useRef} from "react"
import {AnimatePresence, motion} from "framer-motion"
import cover from "../../../images/cover.png"
import dayjs from "dayjs"

function minPrice(tariff) {
    return tariff[0].price
}

const SsSchedule = () => {
    const filial = useSelector(state => state.data.filial)
    const schedule = useSelector(state => state.second_screen.schedule || [])

    if (schedule.length === 0) {
        return <Box className='empty-box' sx={{color: 'black'}}>Пока не придумали, что вам показать в этот день :(</Box>
    }

    return <Box className="ss-schedule">
        {schedule.map(film => {

            const seances = film.seances || []
            const mainSeances = seances.slice(0, 3)
            const extraSeances = seances.slice(3)

            return <Box key={film.uid} className="movie-block glass-effect"
                        sx={{width: extraSeances.length > 0 ? '168px' : '131px'}}>
                <img
                    className={`poster ${extraSeances.length > 0 ? ' poster-grad' : ''}`}
                    src={`${film.cover_link === '' ? cover : `http://${filial.media_ip}:${filial.media_port}${film.cover_link}`}`}
                    alt={film.name}
                />

                <div className="top-bar">
                    <div className="top-item glass-effect">{film.rate_age}+</div>
                    <div className="top-item glass-effect">{film.copy_type}</div>
                </div>

                <Box className="film-title">
                    {film.name}
                </Box>

                <div className="bottom-cards">
                    {mainSeances.map(seance => <div key={seance.uid} className="card glass-effect">
                        {dayjs.utc(seance.beginning).format("HH:mm")}
                        <br/><span className='card-price'>от {minPrice(seance.tariff) || 0}</span>
                    </div>)}
                </div>

                <AnimatePresence>
                    {extraSeances.length > 0 && <motion.div
                        key="sessions-panel"
                        initial={{opacity: 0, x: 30}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 30}}
                        transition={{duration: 0.4, ease: "easeOut"}}
                    >
                        <ScrollingSessions seances={extraSeances}/>
                    </motion.div>}
                </AnimatePresence>
            </Box>
        })}
    </Box>
}

export function ScrollingSessions({seances}) {

    const containerRef = useRef(null)
    const wrapperRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        const wrapper = wrapperRef.current
        if (!container || !wrapper) return

        if (seances.length <= 5) {
            wrapper.innerHTML = ""
            wrapper.appendChild(container)
            return
        }

        const clone = container.cloneNode(true)
        const innerWrapper = document.createElement("div")
        innerWrapper.className = 'scroll-wrapper'
        innerWrapper.style.display = "flex"
        innerWrapper.style.flexDirection = "column"
        innerWrapper.appendChild(container)
        innerWrapper.appendChild(clone)

        wrapper.innerHTML = ""
        wrapper.appendChild(innerWrapper)

        const speed = 20
        let lastTime = null
        let offset = 0
        let frameId

        const loop = (time) => {
            if (lastTime == null) lastTime = time
            const delta = (time - lastTime) / 1000 // секунды
            lastTime = time

            offset += speed * delta
            if (offset >= container.offsetHeight) offset = 0
            innerWrapper.style.transform = `translateY(-${offset}px)`

            frameId = requestAnimationFrame(loop)
        }

        frameId = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(frameId)
    }, [seances])

    return <Box className="scrolling-sessions" ref={wrapperRef}>
        <div className="scroll-content" ref={containerRef}>
            {seances.map(seance => <Box key={seance.uid} className="session">
                {dayjs(seance.beginning).format("HH:mm")}
                <br/><span className='card-price'>от {minPrice(seance.tariff) || 0}</span>
            </Box>)}
        </div>
    </Box>
}

export default SsSchedule