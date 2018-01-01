import * as types from './types';
import { wrapAction } from 'util/reduxStatus'

const login = wrapAction((id) => ({
    type: types.login,
    data: {
        id
    } 
}))

const logout = () => ({
    type: types.logout
})

export {
    login,
    logout
}