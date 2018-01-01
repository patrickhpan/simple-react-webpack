import * as types from './types';
import { start, success, fail } from 'util/reduxStatus';

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    id: null
}

const reducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case start(types.login): {
            return {
                ...state,
                isLoggingIn: true
            }
        }
        case success(types.login): {
            const { id } = data;
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                id: id
            }
        }
        case fail(types.login): {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false
            }
        }
        case types.logout: {
            state.isLoggedIn = false;
            state.id = null;
            return {
                ...state,
                isLoggedIn: false,
                id: null
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;