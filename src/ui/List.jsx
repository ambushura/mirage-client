import { useEffect } from 'react'
import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@mui/material"
import Filial from "../page/header/Filial.jsx"
import City from "../page/header/City.jsx"

const List = (props) => {

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
                                                <MenuItem key={props.type}>
                                                    {el.name}
                                                </MenuItem>
                                            )
                                        }
                                        if (props.type === 'state') {
                                            return (
                                                <MenuItem key={el.uid}>
                                                    {el.name}
                                                </MenuItem>
                                            )
                                        }
                                        if (props.type === 'halls') {
                                            return (
                                                <MenuItem key={el.uid}>
                                                    {el.name}
                                                </MenuItem>
                                            )
                                        }
                                        if (props.type === 'workplaces') {
                                            return (
                                                <MenuItem key={el.uid}>
                                                    {el.name}
                                                </MenuItem>
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