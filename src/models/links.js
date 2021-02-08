const mongoose = require('mongoose');
const { Schema } = mongoose;

const linkSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    url: { type: String, required: true },
    count: { type: Number, required: true }
});

module.exports = mongoose.model('link', linkSchema)