import * as types from './types';

const initialState = {
    count: 0
}

const reducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case types.increment: {
            return {
                ...state,
                count: state.count + 1
            }
        }
        case types.decrement: {
            return {
                ...state,
                count: state.count - 1
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;