import React from 'react'
import {Box} from "@mui/material"
import {useSetCurrentPage} from "../../useSetCurrentPage.js"

const Candy = ({current_page}) => {

    useSetCurrentPage(current_page)

    return <Box>
        Конфета
    </Box>
}

export default Candy