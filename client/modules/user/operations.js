import axios from 'axios';
import * as actions from './actions';

const login = () => dispatch => {
    dispatch(actions.login.start())
    return axios('/user/login')
        .then(response => response.data)
        .then(data => {
            const { id } = data;
            dispatch(actions.login.success(id))
        })
        .catch(error => {
            dispatch(actions.login.fail(error))
        })
}

const logout = actions.logout;

export {
    login, 
    logout
}