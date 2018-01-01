const isLoggingIn = state => state.user.isLoggingIn === true
const isLoggedIn = state => state.user.isLoggedIn === true
const getUserId = state => state.user.id;

export {
    isLoggingIn,
    isLoggedIn,
    getUserId
}