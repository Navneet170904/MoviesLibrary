const LocalStrategy = require('passport-local').Strategy;
const userModal = require('../models/User.model')
const passport = require('passport')

module.exports = ()=>{
    passport.use(new LocalStrategy(async (username , password , done )=>{
        try{
            const user = await userModal.findOne({username})
            if(!user)
            {
                return done(null, false , {message:'Incorrent username'})
            }
            const isMatch = await userModal.comparePassword(password)
            if(!isMatch)
            {
                return done(null , false , {message:'Incorrect password.'})
            }
            return done(null, user)

        }
        catch(error)
        {
            return done(error)
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    passport.deserializeUser(async(id , done)=>{
        try{
            const user = await userModal.findById(id)
            done(null ,user)
        }
        catch(error)
        {
            done(error)
        }
    })
}