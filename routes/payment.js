const route = require('express').Router()

route.post('/makePayment',(req,res)=>{
    key = req.body.key
    txnid = req.body.txnid
    firstname = req.body.firstname
    email = req.body.email
    phone = req.body.phone
    surl = req.body.surl
    furl = req.body.furl
    amount = req.body.amount
    service_provider = req.body.service_provider
    productinfo = req.body.productinfo
    key = req.body.key
    key = req.body.key

})

exports = module.exports = route