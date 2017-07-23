import {
    SET_CITY,
} from '../actions/wizard'

const initialState = {
    city: '',
    info: {
    },
}

export default function wizard(state = initialState, action = {}) {
    switch (action.type) {
    case SET_CITY:
        return {
            ...state,
            city: action.payload.city,
        }
    default:
        return state
    }
}
