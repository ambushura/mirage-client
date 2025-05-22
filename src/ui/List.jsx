import {useEffect} from 'react'
import {
    Button,
    ClickAwayListener,
    Grow,
    ListItemIcon,
    ListItemText,
    MenuList,
    Paper,
    Popper
} from "@mui/material"
import Filial from "../page/header/Filial.jsx"
import City from "../page/header/City.jsx"
import {useNavigate} from "react-router-dom"
import EqualizerIcon from "@mui/icons-material/Equalizer"
import ChairIcon from "@mui/icons-material/Chair"
import FastfoodIcon from '@mui/icons-material/Fastfood'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import TerminalIcon from '@mui/icons-material/Terminal'
import LiquorIcon from '@mui/icons-material/Liquor'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import {WhiteMenuItem} from "./ThemeContext.jsx"
import ContactMailIcon from '@mui/icons-material/ContactMail'

const List = (props) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (props.prev_open.current === true && props.open === false) {
            props.anchor.current.focus()
        }
        props.prev_open.current = props.open
    }, [props.open, props.anchor, props.prev_open, props.type])

    const handleToggle = () => {
        props.setOpen(prevOpen => !prevOpen)
    }

    const handleClose = (event) => {
        if (props.anchor.current && props.anchor.current.contains(event.target)) {
            return
        }
        props.setOpen(false)
    }

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault()
            props.setOpen(false)
        } else if (event.key === 'Escape') {
            props.setOpen(false)
        }
    }

    return (
        <>
            <Button
                ref={props.anchor}
                id={props.id + '-button'}
                aria-controls={props.open ? props.id : undefined}
                aria-expanded={props.open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                startIcon={props.startIcon !== undefined ? props.startIcon : null}
                endIcon={props.endIcon !== undefined ? props.endIcon : null}
                size="small">
                {props.button_text}
            </Button>
            <Popper
                open={props.open}
                anchorEl={props.anchor.current}
                placement="bottom-start"
                transition
                disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow {...TransitionProps}
                          style={{transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'}}>
                        <Paper sx={{backgroundColor: '#1b1d20'}}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={props.open}
                                    id={props.id}
                                    onKeyDown={handleListKeyDown}>
                                    {props.list.map(el => {
                                        if (props.type === 'cities') {
                                            return (
                                                <City
                                                    key={el.uid}
                                                    handleClose={handleClose}
                                                    city={el}/>)
                                        }
                                        if (props.type === 'filials') {
                                            return (
                                                <Filial
                                                    key={el.uid === undefined ? 'uid' : el.uid}
                                                    handleClose={handleClose}
                                                    filial={el}/>)
                                        }
                                        if (props.type === 'staff') {
                                            return (
                                                <WhiteMenuItem key={props.type}>
                                                    {el.name}
                                                </WhiteMenuItem>
                                            )
                                        }
                                        if (props.type === 'state') {
                                            return (
                                                <WhiteMenuItem key={el.uid}>
                                                    {el.name}
                                                </WhiteMenuItem>
                                            )
                                        }
                                        if (props.type === 'halls') {
                                            return (
                                                <WhiteMenuItem key={el.uid}>
                                                    {el.name}
                                                </WhiteMenuItem>
                                            )
                                        }
                                        if (props.type === 'workplaces') {
                                            return (
                                                <WhiteMenuItem key={el.uid}>
                                                    {el.name}
                                                </WhiteMenuItem>
                                            )
                                        }
                                        if (props.type === 'kitchen_points') {
                                            return (
                                                <WhiteMenuItem key={el.uid}>
                                                    {el.name}
                                                </WhiteMenuItem>
                                            )
                                        }
                                        if (props.type === 'kitchen_status') {
                                            return (
                                                <WhiteMenuItem key={el.uid}>
                                                    {el.name}
                                                </WhiteMenuItem>
                                            )
                                        }
                                        if (props.type === 'admin') {
                                            return (
                                                <WhiteMenuItem key={el.id} onClick={() => {
                                                    navigate(el.path)
                                                    handleClose()
                                                }}>
                                                    <>
                                                        <ListItemIcon sx={{color: 'white'}}>
                                                            {el.id === 'admin/orders/cinema' ?
                                                                <ConfirmationNumberIcon/> :
                                                                el.id === 'admin/orders/horeca' ? <FastfoodIcon/> :
                                                                    el.id === 'admin/zbooks' ? <EqualizerIcon/> :
                                                                        el.id === 'admin/operations' ?
                                                                            <CurrencyRubleIcon/> :
                                                                            el.id === 'admin/halls' ? <ChairIcon/> :
                                                                                el.id === 'admin/equipment' ?
                                                                                    <TerminalIcon/> :
                                                                                    el.id === 'admin/egais' ?
                                                                                        <LiquorIcon/> :
                                                                                        el.id === 'admin/staff' ?
                                                                                            <ContactMailIcon/> : null}
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {el.name}
                                                        </ListItemText>
                                                    </>
                                                </WhiteMenuItem>
                                            )
                                        }
                                    })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}

export default List