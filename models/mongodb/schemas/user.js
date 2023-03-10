const bcrypt = require('bcrypt')
const { mongoose } = require('../connection')
const SchemaPlugin = require('./helpers/schema-plugin')
const hashPassword = require('./helpers/hash-password')

const Schema = mongoose.Schema
const makeSchema = new Schema({
    levelid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_role',
    },
    role: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        default: 'default',
    },
    locale: {
        type: String,
        default: 'en_US',
    },
    latmat: {
        type: String,
        default: '',
    },
    csrf: {
        type: String,
        default: '',
    },
    status: {
        type: Boolean,
        default: true,
    },
    created_at: { type: Date },
    updated_at: { type: Date },
})

makeSchema.plugin(SchemaPlugin)

makeSchema.pre('save', function (next) {
    const _ = this
    return hashPassword(_, next)
})

makeSchema.pre('findOneAndUpdate', function (next) {
    const _ = this.getUpdate()
    return hashPassword(_, next)
})

makeSchema.methods.comparePassword = function (candidatePass, cb) {
    const _ = this
    const callBack = (err, isMatch) => (err ? cb(err) : cb(null, isMatch))
    bcrypt.compare(candidatePass, _.password, callBack)
}

const User = mongoose.model('user', makeSchema)

module.exports = User
