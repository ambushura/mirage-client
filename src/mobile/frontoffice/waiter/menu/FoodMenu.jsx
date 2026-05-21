import { Box, Button, TextField } from '@mui/material'
import './food-menu.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { horeca_menu_get } from '../../../../service/fetch_service.js'
import { useDispatch, useSelector } from 'react-redux'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import HomeIcon from '@mui/icons-material/Home'

const PAGE_SIZE = 12

const FoodMenu = () => {
    const dispatch = useDispatch()
    const { filial } = useSelector((state) => state.front_mobile)

    const [foodMenu, setFoodMenu] = useState(null)
    const [stack, setStack] = useState([{ uid: 'Меню', title: 'Меню' }])

    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')

    const startX = useRef(null)
    const isDragging = useRef(false)

    const currentFolder = stack[stack.length - 1]

    const loadMenu = async (uid) => {
        const res = await dispatch(horeca_menu_get(filial, uid))
        if (!res.loading && res.data) setFoodMenu(res.data)
    }

    useEffect(() => {
        if (filial) loadMenu(currentFolder.uid)
    }, [filial, currentFolder.uid])

    const openFolder = (folder) => {
        setPage(0)
        setStack((prev) => [...prev, { uid: folder.uid, title: folder.name }])
    }

    const goBack = () => {
        if (stack.length > 1) {
            setPage(0)
            setStack((prev) => prev.slice(0, -1))
        }
    }

    const items = foodMenu?.items || []

    const merged = useMemo(() => {
        const list = [
            ...items.filter((i) => i.its_folder).map((i) => ({ ...i, type: 'folder' })),
            ...items.filter((i) => !i.its_folder).map((i) => ({ ...i, type: 'item' })),
        ]

        if (!search) return list

        return list.filter((i) => i.name?.toLowerCase().includes(search.toLowerCase()))
    }, [items, search])

    const pagesCount = Math.ceil(merged.length / PAGE_SIZE)

    const pagedItems = useMemo(() => {
        return merged.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
    }, [merged, page])

    const nextPage = () => {
        setPage((p) => Math.min(p + 1, pagesCount - 1))
    }

    const prevPage = () => {
        setPage((p) => Math.max(p - 1, 0))
    }

    // SWIPE
    const onTouchStart = (e) => {
        startX.current = e.touches[0].clientX
        isDragging.current = true
    }

    const onTouchEnd = (e) => {
        if (!isDragging.current) return
        const diff = e.changedTouches[0].clientX - startX.current

        if (diff > 50) prevPage()
        if (diff < -50) nextPage()

        isDragging.current = false
    }

    return (
        <Box className="mobile-menu-wrapper">
            <Box className="mobile-menu-header">
                <Box className="mobile-menu-title">{currentFolder.title}</Box>
                <Box className="page-controls">
                    <Button onClick={prevPage} className="mobile-food-menu-panel-button">
                        <ChevronLeftIcon />
                    </Button>
                    <Box>
                        {page + 1} / {pagesCount || 1}
                    </Box>
                    <Button onClick={nextPage} className="mobile-food-menu-panel-button">
                        <ChevronRightIcon />
                    </Button>
                </Box>
                <Button
                    className="mobile-food-menu-panel-button"
                    onClick={() => {
                        setStack([{ uid: 'Меню', title: 'Меню' }])
                        setPage(0)
                        setSearch('')
                    }}
                >
                    <HomeIcon />
                </Button>
                <Button onClick={goBack} disabled={stack.length === 1} className="mobile-food-menu-panel-button">
                    <KeyboardArrowUpIcon />
                </Button>
            </Box>

            <TextField
                size="small"
                fullWidth
                placeholder="Поиск..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(0)
                }}
            />

            <Box className="mobile-menu-grid">
                {Array.from({ length: 4 }).map((_, rowIndex) => (
                    <Box key={rowIndex} className="mobile-menu-row">
                        {pagedItems.slice(rowIndex * 3, rowIndex * 3 + 3).map((el) => (
                            <Box key={el.uid} className="mobile-menu-cell">
                                <Button
                                    className={`mobile-menu-tile ${el.type}`}
                                    onClick={() => (el.type === 'folder' ? openFolder(el) : console.log(el))}
                                >
                                    <Box className="tile-text">{el.name}</Box>
                                </Button>
                            </Box>
                        ))}

                        {Array.from({
                            length: Math.max(0, 3 - pagedItems.slice(rowIndex * 3, rowIndex * 3 + 3).length),
                        }).map((_, i) => (
                            <Box key={`empty-${rowIndex}-${i}`} className="mobile-menu-cell" />
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default FoodMenu
