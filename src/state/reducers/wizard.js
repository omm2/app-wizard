import {
    SET_CITY,
    SET_INFO,
} from '../actions/wizard'

const initialState = {
    city: '',
    info: {
        tel: '',
        email: '',
    },
}

export default function wizard(state = initialState, action = {}) {
    switch (action.type) {
    case SET_INFO:
        return {
            ...state,
            info: action.payload.info,
        }
    case SET_CITY:
        return {
            ...state,
            city: action.payload.city,
        }
    default:
        return state
    }
}
