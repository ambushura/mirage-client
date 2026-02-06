import React from 'react'
import {Box} from "@mui/material"
import {useSetCurrentPage} from "../../useSetCurrentPage.js";

const CenterCinema = ({current_page}) => {

    useSetCurrentPage(current_page)

    return <Box>
        <Box id='center-submenu'>
            <Box>

            </Box>
        </Box>
    </Box>
}

export default CenterCinema