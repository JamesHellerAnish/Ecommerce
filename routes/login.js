const route = require('express').Router()
const passport = require('../passport')
const User = require('../db').User


route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
}))

route.post('/signup', (req, res) => {
    User.create ({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then((createdUser) => {
        res.redirect('/login')
    })
})

exports = module.exports = route