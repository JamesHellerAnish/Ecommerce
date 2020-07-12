const route = require('express').Router()
const passport = require('../passport')
const User = require('../db').User
const fetch = require('node-fetch')


route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
}))
route.get('/bulu',(req,res)=>{
    res.send('chal gaya')
})
route.post('/signup', (req, res) => {
    User.create ({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mainPhoneNumber:req.body.mainPhoneNumber,
        mainEmail:req.body.mainEmail
    }).then((createdUser) => {
        res.redirect('/login')
    })
})

route.post('/sendOTP',(req,res)=>{
    const phoneNumber = req.body.phoneNumber
    fetch('https://api.msg91.com/api/v5/otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            authkey:`312069A2VyUpmsqJ5e14d730P1`,
            template_id:`5ea01e66d6fc0545e17c3d0c`,
            mobile:phoneNumber,
            userip:`IPV4 User IP`
        })
    })
    .then(data=>{return data.json()})
    .then(data=>{res.send(data)})
    .catch(error=>console.log(error))
})


//verify the OTP
//phoneNumber:phoneNumber of the user
//otp: otp given
route.post('/verifyOTP',(req,res)=>{    
    let mobile = req.body.phoneNumber
    let otp = req.body.otp
    let authentication_key = '312069A2VyUpmsqJ5e14d730P1'
    fetch('https://api.msg91.com/api/v5/otp/verify?mobile='+mobile+'&otp='+otp+'&authkey='+authentication_key, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

    })
    .then(data=>{return data.json()})
    .then(data=>{res.send(data)})
    .catch(error=>console.log(error))
})

//resend the otp
//phoneNumber:phoneNumber of the user
route.post('/resendOTP',(req,res)=>{
    fetch('https://api.msg91.com/api/v5/otp/retry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            authkey:`312069A2VyUpmsqJ5e14d730P1`,
            mobile:req.body.phoneNumber,
            retrytype:'text'
        })
    })
    .then(data=>{return data.json()})
    .then(data=>{res.send(data)})
    .catch(error=>console.log(error))
})

exports = module.exports = route