const { User } = require('../db')

const route = require('express').Router()
const PartnerInfo = require('../db').PartnerInfo
const BankInfo = require('../db').BankInfo
const TaxInfo = require('../db').TaxInfo

route.get('/isPartner',(req,res)=>{
    PartnerInfo.findOne({
        where:{userId:req.user.dataValues.id}
    })
    .then((data)=>{
        if(data)
            res.send(true)
        else
            res.send(false)
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})


route.post('/createPartner',(req,res)=>{
    if(!req.user){throw 'Error:User not logged in'}
    PartnerInfo.create(
        {
            userId:req.user.dataValues.id,
            company:req.body.company,
            storeName:req.body.company,
            approved:false
        }
    )
    .then((data)=>{
        BankInfo.create(
            {
                userId:req.user.dataValues.id,
            }
        )
        TaxInfo.create(
            {
                userId:req.user.dataValues.id,
            }
        )
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.post('/updateBank',(req,res)=>{
    if(!req.user){throw 'Error:User not logged in'}
    BankInfo.update(
        {
            name:req.body.name,
            type:req.body.type,
            number:req.body.number,
            IFSC:req.body.IFSC,
        },
        {
            where:{userId:req.user.dataValues.id,}
        }
    )
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.post('/updateTax',(req,res)=>{
    if(!req.user){throw 'Error:User not logged in'}
    TaxInfo.update(
        {
            GST:req.body.GST,
            PAN:req.body.PAN
        },
        {
            where:{userId:req.user.dataValues.id,}
        }
    )
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

exports = module.exports = route
