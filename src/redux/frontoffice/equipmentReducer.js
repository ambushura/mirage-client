import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // ККТ
    kkt_uid: null,
    trigger_submit_kkt: false,
    trigger_delete_kkt: false,

    // Пинпад
    pinpad_uid: null,
    trigger_submit_pinpad: false,
    trigger_delete_pinpad: false,
}

export const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        setUidKKT: (state, { payload }) => {},
        setTriggerSubmitKKT: (state, { payload }) => {},
        setTriggerDeleteKKT: (state, { payload }) => {},
        setUidPinpad: (state, { payload }) => {},
        setTriggerSubmitPinpad: (state, { payload }) => {},
        setTriggerDeletePinpad: (state, { payload }) => {},
    },
})

export const { setUidKKT, setTriggerSubmitKKT, setTriggerDeleteKKT, setUidPinpad, setTriggerSubmitPinpad, setTriggerDeletePinpad } =
    equipmentSlice.actions
export default equipmentSlice.reducer
