import {Box} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {center_horeca_goods_recipe_get} from "../../../service/fetch_service.js"

const Recipe = ({props}) => {

    const dispatch = useDispatch()

    const {root_filial} = useSelector(state => state.center)
    const [recipe, set_recipe] = useState(null)

    useEffect(() => {
        dispatch(center_horeca_goods_recipe_get(root_filial, props.ref, 0))
            .then(res => set_recipe(res.data))
    }, [dispatch, props.ref, root_filial])

    return <Box>
        <Box>Калькуляция</Box>
        <Box>{recipe?.code}</Box>
    </Box>
}

export default Recipe