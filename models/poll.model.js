const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    title: {
        type: String,
        required: [true, "Poll title is required"],
    },
    description: String,
    cover_image: String,
    options: {
        type: [
            {
                text: {
                    type: String,
                    required: true
                },
                image: {
                    type: String
                },
                voteCount: {
                    type: Number,
                    default: 0,
                }
            }
        ],
        validate: {
            validator: (val) => val.length >= 2 && val.length <= 4,
            message: "Options must range from 2 to 4"
        }
    },
    totalVoteCount: {
        type: Number,
        default: 0,
    },
    votedIps: Array,
}, {timestamps: true})

module.exports = mongoose.model("poll", PollSchema);