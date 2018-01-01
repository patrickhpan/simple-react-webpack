const uuid = require('uuid')

const login = () => Promise.resolve({
    id: uuid()
})

module.exports = {
    login
}
