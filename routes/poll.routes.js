const express = require('express')
const PollRouter = express.Router()
const upload = require("../utils/multer")
const {createNewPoll, getAllPolls, votePoll} = require("../controllers/poll.controller")
const cpUpload = upload.fields([
    {
        name: "cover_image",
        maxCount: 1
    },
    {
        name: "options_images",
        maxCount: 4
    }
])
PollRouter.post("/", cpUpload, createNewPoll )
PollRouter.get("/", getAllPolls)
PollRouter.get("/:pollId/vote/:optionId", votePoll)

module.exports = PollRouter;