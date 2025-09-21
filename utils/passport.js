const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/user.model")

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

// http://localhost:5500/api/auth/google

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        const {_json: {sub: googleId, name: displayName, email, picture: profilePicture}} = profile
        

        const user = await User.findOne({googleId});
        if (user) {
            done(null, false, {
                message: "User already exists"
            })
            return;
        }

        const newUser = new User({
            googleId,
            displayName,
            email,
            profilePicture
        })

        await newUser.save()
        done(null, newUser);
    })
)