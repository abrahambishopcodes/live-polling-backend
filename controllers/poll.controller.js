const Poll = require("../models/poll.model")

const createNewPoll = async (req, res) => {
   const {title, description, options: optionsArray} = req.body
   const {options_images, cover_image} = req.files

   const options_images_path = options_images.length > 0 && options_images.map((image) => image.path);

   const newPoll = new Poll({
    title,
    description,
    cover_image: cover_image[0].path || null,
    options: optionsArray.map((option, i) => {
        return {
            text: option,
            image: options_images_path[i] || null,
        }
    })
   })

   await newPoll.save()

   res.status(201).json({
    message: "New poll created",
    poll: newPoll,
   })

}

const getAllPolls = async (req, res) => {
    const polls = await Poll.find({});
    res.status(200).json({
        message: "All polls",
        polls,
    })
}


const votePoll = async (req, res) => {
    const {pollId, optionId} = req.params;
    const ip =
  req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress;


    if (!pollId || !optionId) {
        return res.status(409).json({
            message: "pollId and optionId is required to vote"
        })
    }

    const hasVotedOnce = await Poll.findOne({_id: pollId, votedIps: ip})
    if (hasVotedOnce) {
        return res.status(200).json({
            message: "Cannot vote multiple times from the same device"
        })
    }

    let updatedPoll;

    try {
        updatedPoll = await Poll.findOneAndUpdate(
        {
            _id: pollId,
            "options._id": optionId
        },
        {
            $inc: {
                totalVoteCount: 1,
                "options.$.voteCount": 1,
            },
            $addToSet: {
                votedIps: ip,
            }
        },
        {
            new: true,
        }
    )

    if (!updatedPoll) {
        return res.status(404).json({
            message: "Could not find poll or option"
        })
    }
    } catch (error) {
        return res.status(500).json({
            message: "Could not update poll vote",
            error: error.message,
        })
    }

     res.status(200).json({
            message: "Your vote has been added successfully",
            poll: updatedPoll,
        })

}

module.exports = {
    createNewPoll,
    getAllPolls,
    votePoll,
}