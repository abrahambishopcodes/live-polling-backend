const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cover_image: {
        type: String,
        required: true,
    },
    options: [
       {
        text: {
            type: String,
        },
        image: {
            type: String,
        }
       }
    ]
}, {timestamps: true})

module.exports = mongoose.model("poll", PollSchema);