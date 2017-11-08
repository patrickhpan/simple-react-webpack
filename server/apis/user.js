const uuid = require('uuid')

const login = () => ({
    id: uuid()
})

module.exports = {
    login
}
