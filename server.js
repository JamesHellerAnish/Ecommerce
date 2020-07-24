const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const route = require('./routes/root')
const app = express()
const path = require('path')

// const appRoute = express.Router()

app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'somesecretstring',
    resave:true,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

// app.use('/', appRoute)
app.use('/load', route.load )
app.use('/login', route.login )
app.use('/product', route.product)
app.use('/partner', route.partner)
app.use('/admin', route.admin)
app.use("/",express.static(__dirname+'/public'))

// appRoute.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/public/blog.html'))
// })

app.listen(9876, () => console.log("Server running on http://localhost:9876"))