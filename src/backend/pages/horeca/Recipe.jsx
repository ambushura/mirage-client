import {Box, DialogTitle, IconButton} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {center_horeca_goods_recipe_get} from "../../../service/fetch_service.js"
import AsyncAutocomplete from "../../../ui/AsyncAutocomplete.jsx"
import CloseIcon from "@mui/icons-material/Close";
import {closeModal} from "../../../redux/interfaceReducer.js";

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

        <DialogTitle sx={{m: 0, p: '10px'}}>
            Калькуляция {recipe?.code}
            <IconButton
                aria-label="close"
                onClick={() => {
                    dispatch(closeModal())
                }}
                sx={{
                    position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon/>
            </IconButton>
        </DialogTitle>

        <AsyncAutocomplete
            value={good}
            onChange={setGood}
            filial={root_filial}
            type="goods"
            variant="filled"
            sx={{width: 400}}
            label="Блюдо"
        />

    </Box>
}

export default Recipe