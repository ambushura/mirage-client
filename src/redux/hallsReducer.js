export const GET_HALL = 'GET_HALL'
const defaultState = {
    halls: []
}
export const hallsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_HALL:
            if (state.halls.find(hall => hall.uid === action.payload.uid) === undefined) {
                return {...state, halls: [...state.halls, action.payload]}
            }
            break
        default:
            return state
    }
}
export const getHall = (payload) => ({type: GET_HALL, payload})