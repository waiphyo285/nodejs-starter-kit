const { mongoose } = require('../connection')
const SchemaPlugin = require('./helpers/schema-plugin')

const Schema = mongoose.Schema
const makeSchema = new Schema({
    // cityid: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'city',
    // },
    // townshipid: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'township',
    // },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    grade: {
        type: Number,
    },
    images: {
        type: Array,
    },
    status: {
        type: Boolean,
        default: false,
    },
    created_at: { type: Date },
    updated_at: { type: Date },
})

makeSchema.plugin(SchemaPlugin)

module.exports = mongoose.model('student', makeSchema)
