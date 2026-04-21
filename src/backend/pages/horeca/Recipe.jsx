import {Box} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {center_horeca_goods_recipe_get} from "../../../service/fetch_service.js"
import AsyncAutocomplete from "../../../ui/AsyncAutocomplete.jsx"

const Recipe = ({props}) => {

    const dispatch = useDispatch()
    const {root_filial} = useSelector(state => state.center)

    const [recipe, setRecipe] = useState(null)
    const [good, setGood] = useState(null)

    useEffect(() => {
        dispatch(center_horeca_goods_recipe_get(root_filial, props.ref, 0))
            .then(res => setRecipe(res.data))
    }, [dispatch, props.ref, root_filial])

    useEffect(() => {
        if (recipe === null) return
        setGood({uid: recipe.uid_good, name: recipe.name_good})
    }, [recipe])

    return <Box>
        <Box>Калькуляция</Box>
        <Box>{recipe?.code}</Box>

        <AsyncAutocomplete
            value={good}
            onChange={setGood}
            filial={root_filial}
            type="goods"
            sx={{width: 400}}
            label="Блюдо"
        />
    </Box>
}

export default Recipe