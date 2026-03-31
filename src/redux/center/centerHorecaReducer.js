import {createSlice} from "@reduxjs/toolkit"

const initialState = {

    // Папки
    tree: [],
    expanded_tree: [],
    uid_current_folder: null,

    // Номенклатура
    goods: [],
    uid_current_good: null,

    // Хорека заказы
    orders_horeca_page: 1,
    orders_horeca_page_size: 20,
    orders_horeca_loading: {loading: false, error: null},
    orders_horeca: {
        total: 0, columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
    },

    // Наличие на складах
    store_state_loading: {loading: false, error: null},
    store_state: {
        columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
    },
    store_state_expended: [],
    uid_current_store: [],

    // Производство
    production_state_loading: {loading: false, error: null},
    production_state: {
        columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
    },
    production_state_expended: [],

    // Отчеты о розничных продажах
    shift_state_loading: {loading: false, error: null},
    shift_state: {
        columns: [], rows: [], column_grouping_model: [], column_visibility_model: {}
    },
    shift_state_expended: [],

}

export const centerSlice = createSlice({

    name: 'center_horeca', initialState, reducers: {

        // Папки
        setTree(state, action) {
            state.tree = action.payload
        }, setExpandedTree(state, action) {
            state.expanded_tree = action.payload
        }, setUidCurrentFolder(state, action) {
            state.uid_current_folder = action.payload
        },

        // Номенклатура
        setGoods(state, action) {
            state.goods = action.payload
        }, setUidCurrentGood(state, action) {
            state.uid_current_good = action.payload
        },

        // Заказы хорека
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

        // Наличие на складах
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

        // Производство
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

        // Отчеты о розничных продажах
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
    setTree, setExpandedTree, setUidCurrentFolder,

    // Номенклатура
    setGoods, setUidCurrentGood,

    // Заказы хорека
    setOrdersHorecaLoadingState, cleanOrdersHoreca, setOrdersHorecaCenter, setOrdersHorecaPage, setOrdersHorecaPageSize,

    // Наличие на складах
    setStoreStateLoadingState, setStoreState, cleanStoreState, setStoreStateExpended, setUidCurrentStore,

    // Производство
    setProductionStateLoadingState, setProductionState, cleanProductionState, setProductionStateExpended,

    // Отчеты о розничных продажах
    setShiftStateLoadingState, setShiftState, cleanShiftState, setShiftStateExpended

} = centerSlice.actions
export default centerSlice.reducer