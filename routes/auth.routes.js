const express = require('express')
const AuthRouter = express.Router()
const passport = require('passport')

AuthRouter.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

AuthRouter.get("/google/callback", passport.authenticate("google", {
    scope: ["profile", "email"]
}), (req, res) => {
    if (!req.user) {
        return res.status(400).send("Authentication failed.")
    }

    res.status(200).json(req.user)
})

module.exports = AuthRouter;