const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    idRole: {
        type: Schema.Types.ObjectId,
        ref: 'role'
    }
})

const User = mongoose.model('user', UserSchema)

module.exports = User