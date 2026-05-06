import {createSlice} from "@reduxjs/toolkit"
import {v4} from "uuid"

const initialState = {

    // Папки
    tree_loading: {loading: false, error: null},
    tree: [],
    expanded_tree: [],
    uid_current_folder: null,

    // Номенклатура
    goods_loading: {loading: false, error: null},
    goods: [],
    uid_current_good: null,

    // Калькуляции
    goods_recipes_loading: {loading: false, error: null},
    goods_recipes: [],
    goods_recipes_expanded: [],

    // Калькуляция
    goods_recipe_loading: {loading: false, error: null},
    goods_recipe: {
        ref: v4(),
        ver: null,
        code: 'Новый',
        deleted: false,
        date_create: null,
        date_change: null,
        period: null,
        uid_good: null,
        out_good: '',
        design: '',
        cooking_method: '',
        comment: '',
        filials: [],
        organizations: [],
        tables: [{
            id: 'ingredients',
            title: 'Рецепт',
            columns: [],
            rows: [],
            column_grouping_model: [],
            column_visibility_model: {}
        }]
    },

    // Хорека заказы
    orders_horeca_loading: {loading: false, error: null},
    orders_horeca_page: 1,
    orders_horeca_page_size: 20,
    orders_horeca: {
        total: 0, columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
    },

    // Хорека заказ
    order_horeca_loading: {loading: false, error: null},
    order_horeca: {

        buyer_uid: null,
        buyer_card_number: null,
        buyer_phone_number: null,
        buyer_email: null,
        buyer_n: null,
        buyer_o: null,
        buyer_s: null,

        uid: v4(),
        number: "",
        date_create: null,
        date_change: null,
        uid_creator: null,
        name_creator: null,
        date_shift: null,

        current_number: 0,

        canceled: false,
        deleted: false,

        price: 0,
        quantity: 0,
        sum_discount: 0,
        sum: 0,

        ver: "",

        tables: [

            {
                id: 'store',
                title: 'Производство',
                columns: [],
                rows: [],
                column_grouping_model: [],
                column_visibility_model: {}
            },

            {
                id: 'sales',
                title: 'Продажи',
                columns: [],
                rows: [],
                column_grouping_model: [],
                column_visibility_model: {}
            },

            {
                id: 'egais',
                title: 'ЕГАИС',
                columns: [],
                rows: [],
                column_grouping_model: [],
                column_visibility_model: {}
            },

            {
                id: 'kitchen',
                title: 'Кухня',
                columns: [],
                rows: [],
                column_grouping_model: [],
                column_visibility_model: {}
            },

            {
                id: 'mark',
                title: 'Маркировка',
                columns: [],
                rows: [],
                column_grouping_model: [],
                column_visibility_model: {}
            },

            {
                id: 'payments',
                title: 'Оплаты',
                columns: [],
                rows: [],
                column_grouping_model: [],
                column_visibility_model: {}
            },

            {
                id: 'returns',
                title: 'Возвраты',
                columns: [],
                rows: [],
                column_grouping_model: [],
                column_visibility_model: {}
            }],
    },

    // Хорека Наличие на складах
    store_state_loading: {loading: false, error: null},
    store_state: {columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}},
    store_state_expended: [],
    uid_current_store: [],

    // Хорека Производство
    production_state_loading: {loading: false, error: null},
    production_state: {
        columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
    },
    production_state_expended: [],

    // Хорека Отчеты о розничных продажах
    shift_state_loading: {loading: false, error: null},
    shift_state: {
        columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
    },
    shift_state_expended: [],

}

export const centerSlice = createSlice({

    name: 'center_horeca', initialState, reducers: {

        // Папки
        setTreeLoading(state, payload) {
            state.tree_loading = payload
        }, setTree(state, action) {
            state.tree = action.payload
        }, setExpandedTree(state, action) {
            state.expanded_tree = action.payload
        }, setUidCurrentFolder(state, action) {
            state.uid_current_folder = action.payload
        },

        // Номенклатура
        setGoodsLoading(state, payload) {
            state.goods_loading = payload
        }, setGoods(state, action) {
            state.goods = action.payload
        }, setUidCurrentGood(state, action) {
            state.uid_current_good = action.payload
        },

        // Калькуляции
        setGoodsRecipesLoading(state, action) {
            state.goods_recipes_loading = action.payload
        }, setGoodsRecipes(state, action) {
            state.goods_recipes = action.payload
        }, setExpandedRecipesTree(state, action) {
            state.goods_recipes_expanded = action.payload
        },

        // Калькуляция
        setGoodsRecipeLoading(state, action) {
            state.goods_recipe_loading = action.payload
        }, setGoodsRecipe(state, action) {
            state.goods_recipe = action.payload
        },

        // Хорека заказы
        setOrdersHorecaLoadingState(state, action) {
            state.orders_horeca_loading = action.payload
        }, setOrdersHorecaPage(state, action) {
            state.orders_horeca_page = action.payload
        }, setOrdersHorecaPageSize(state, action) {
            state.orders_horeca_page_size = action.payload
        }, cleanOrdersHoreca(state) {
            state.orders_horeca = {
                columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
            }
        }, setOrdersHorecaCenter(state, action) {
            state.orders_horeca = action.payload
        },

        // Хорека заказ
        setOrderHorecaLoadingState(state, action) {
            state.order_horeca_loading = action.payload
        }, setOrderHorecaCenter(state, action) {
            state.order_horeca = action.payload
        },

        // Хорека Наличие на складах
        setStoreStateLoadingState(state, action) {
            state.store_state_loading = action.payload
        }, setStoreState(state, action) {
            state.store_state = action.payload
        }, cleanStoreState(state) {
            state.store_state = {
                columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
            }
        }, setStoreStateExpended(state, action) {
            state.store_state_expended = action.payload
        }, setUidCurrentStore(state, action) {
            state.uid_current_store = action.payload
        },

        // Хорека Производство
        setProductionStateLoadingState(state, action) {
            state.production_state_loading = action.payload
        }, setProductionState(state, action) {
            state.production_state = action.payload
        }, cleanProductionState(state) {
            state.production_state = {
                columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
            }
        }, setProductionStateExpended(state, action) {
            state.store_state_expended = action.payload
        },

        // Хорека Отчеты о розничных продажах
        setShiftStateLoadingState(state, action) {
            state.shift_state_loading = action.payload
        }, setShiftState(state, action) {
            state.shift_state = action.payload
        }, cleanShiftState(state) {
            state.production_state = {
                columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
            }
        }, setShiftStateExpended(state, action) {
            state.shift_state_expended = action.payload
        }
    }
})

export const {

    // Папки
    setTreeLoading, setTree, setExpandedTree, setUidCurrentFolder,

    // Номенклатура
    setGoodsLoading, setGoods, setUidCurrentGood,

    // Калькуляции
    setGoodsRecipesLoading, setGoodsRecipes, setExpandedRecipesTree,

    // Калькуляция
    setGoodsRecipeLoading, setGoodsRecipe,

    // Хорека заказы
    setOrdersHorecaLoadingState, cleanOrdersHoreca, setOrdersHorecaCenter, setOrdersHorecaPage, setOrdersHorecaPageSize,

    // Хорека заказ
    setOrderHorecaLoadingState, setOrderHorecaCenter, setOrderHorecaCenterTables,

    // Хорека Наличие на складах
    setStoreStateLoadingState, setStoreState, cleanStoreState, setStoreStateExpended, setUidCurrentStore,

    // Хорека Производство
    setProductionStateLoadingState, setProductionState, cleanProductionState, setProductionStateExpended,

    // Хорека Отчеты о розничных продажах
    setShiftStateLoadingState, setShiftState, cleanShiftState, setShiftStateExpended

} = centerSlice.actions
export default centerSlice.reducer