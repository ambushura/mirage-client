import React, {useEffect} from 'react'
import PlaceIcon from "@mui/icons-material/Place"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {Button, ClickAwayListener, Grow, MenuList, Paper, Popper} from "@mui/material"
import City from "../layout/header/City"
import Filial from "../layout/header/Filial"
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
                startIcon={props.startIcon !== undefined ? <PlaceIcon/> : <></>}
                endIcon={props.endIcon !== undefined ? <KeyboardArrowDownIcon/> : <></>}
                size="large">
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
                        <Paper sx={{backgroundColor: '#0E0F11'}}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    sx={{backgroundColor: '#0E0F11'}}
                                    autoFocusItem={props.open}
                                    id={props.id}
                                    onKeyDown={handleListKeyDown}>
                                    {props.list.map(el => {
                                        if (props.type === 'cities') {
                                            return (
                                                <City
                                                    key={el.uid + el.ver}
                                                    handleClose={handleClose}
                                                    city={el}/>
                                            )
                                        } else {
                                            if (el === undefined) {
                                                return <Filial/>
                                            } else {
                                                return (
                                                    <Filial
                                                        key={el.uid + el.ver}
                                                        handleClose={handleClose}
                                                        filial={el}/>
                                                )
                                            }
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