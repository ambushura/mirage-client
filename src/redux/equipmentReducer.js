import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    kkt_uid: null, trigger_submit_kkt: false, trigger_delete_kkt: false,
}

export const equipmentSlice = createSlice({
    name: "equipment", initialState, reducers: {
        setUidKKT: (state, {payload}) => {

        }, setTriggerSubmitKKT: (state, {payload}) => {

        }, setTriggerDeleteKKT: (state, {payload}) => {

        }
    },
})

export const {setUidKKT, setTriggerSubmitKKT, setTriggerDeleteKKT} = equipmentSlice.actions
export default equipmentSlice.reducer