import * as types from './types';

const increment = () => ({
    type: types.increment
})

const decrement = () => ({
    type: types.decrement
})

export {
    increment,
    decrement 
}