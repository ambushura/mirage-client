import {Fragment, useEffect} from 'react'
import {Button, ClickAwayListener, Grow, ListItemIcon, ListItemText, MenuList, Paper, Popper} from "@mui/material"
import Filial from "../page/header/Filial.jsx"
import City from "../page/header/City.jsx"
import {useNavigate} from "react-router-dom"
import EqualizerIcon from "@mui/icons-material/Equalizer"
import ChairIcon from "@mui/icons-material/Chair"
import FastfoodIcon from '@mui/icons-material/Fastfood'
import LiquorIcon from '@mui/icons-material/Liquor'
import {WhiteMenuItem} from "./ThemeContext.jsx"
import GroupWorkIcon from '@mui/icons-material/GroupWork'
import ConstructionIcon from '@mui/icons-material/Construction'
import SavingsIcon from '@mui/icons-material/Savings'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import WalletIcon from '@mui/icons-material/Wallet'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

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

    return <Fragment>
        <Button
            variant={props.variant !== undefined ? props.variant : 'contained'}
            color={props.color !== undefined ? props.color : 'primary'}
            ref={props.anchor}
            id={props.id + '-button'}
            aria-controls={props.open ? props.id : undefined}
            aria-expanded={props.open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            startIcon={props.startIcon !== undefined ? props.startIcon : null}
            endIcon={props.endIcon !== undefined ? props.endIcon : null}
            size="small">{props.button_text}
        </Button>
        <Popper
            open={props.open}
            anchorEl={props.anchor.current}
            placement="bottom-start"
            transition
            disablePortal>
            {({TransitionProps, placement}) => (<Grow {...TransitionProps}
                                                      style={{transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'}}>
                <Paper sx={{backgroundColor: '#1b1d20', maxHeight: 600, overflowY: 'auto'}}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                            autoFocusItem={props.open}
                            id={props.id}
                            onKeyDown={handleListKeyDown}>
                            {props.list.map(el => {
                                switch (props.type) {
                                    case 'menu-create':
                                        return <WhiteMenuItem key={el.uid}
                                                              onClick={(event) => {
                                                                  props.handleClose !== undefined ? props.handleClose(el.uid) : null
                                                                  handleClose(event)
                                                              }}>
                                            <ListItemText>{el.title}</ListItemText>
                                        </WhiteMenuItem>
                                    case 'zbooks-kkt':
                                        return <WhiteMenuItem key={el.uid} onClick={(event) => {
                                            props.handleClose !== undefined ? props.handleClose(el.uid) : null
                                            handleClose(event)
                                        }}>
                                            <ListItemText>{el.name_organization} · ЗН {el.title}</ListItemText>
                                        </WhiteMenuItem>
                                    case 'zpinpads-pinpad':
                                        return <WhiteMenuItem key={el.uid} onClick={(event) => {
                                            props.handleClose !== undefined ? props.handleClose(el.uid) : null
                                            handleClose(event)
                                        }}>
                                            <ListItemText>{el.title}</ListItemText>
                                        </WhiteMenuItem>
                                    case 'cities':
                                        return <City
                                            key={el.uid}
                                            handleClose={handleClose}
                                            city={el}/>
                                    case 'filials':
                                        return <Filial
                                            key={el.uid === undefined ? 'uid' : el.uid}
                                            handleClose={handleClose}
                                            filial={el}/>
                                    case 'admin':
                                        return <WhiteMenuItem key={el.id} onClick={(event) => {
                                            handleClose(event)
                                            navigate(el.path)
                                        }}>
                                            <ListItemIcon sx={{color: 'white'}}>
                                                {el.id === 'admin/orders/cinema' ?
                                                    <GroupWorkIcon/> : el.id === 'admin/orders/horeca' ?
                                                        <FastfoodIcon/> : el.id === 'admin/zbooks' ?
                                                            <EqualizerIcon/> : el.id === 'admin/operations' ?
                                                                <WalletIcon/> : el.id === 'admin/halls' ?
                                                                    <ChairIcon/> : el.id === 'admin/scheme' ?
                                                                        <ConstructionIcon/> : el.id === 'admin/egais' ?
                                                                            <LiquorIcon/> : el.id === 'admin/acquiring' ?
                                                                                <AccountBalanceIcon/> : el.id === 'admin/staff' ?
                                                                                    <AssignmentIndIcon/> : el.id === 'admin/sales' ?
                                                                                        <SavingsIcon/> : null}
                                            </ListItemIcon>
                                            <ListItemText>
                                                {el.name}
                                            </ListItemText>
                                        </WhiteMenuItem>
                                }
                            })}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Grow>)}
        </Popper>
    </Fragment>
}

export default List