const { PartnerInfo, Feature } = require('../db')
const { where } = require('sequelize')

const route = require('express').Router()
const Display = require('../db').Display
const Product = require('../db').Product
const Cart = require('../db').Cart
const Image = require('../db').Image
const Category = require('../db').Category
const FeatureOption = require('../db').FeatureOption
const {PTC,Brand} = require('../db')

route.post('/createBrand',(req,res)=>{
    if(req.user.dataValues.username!='admin'){throw 'Error : Wrong key'}
    Brand.create({
        value:req.body.value
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.post('/createPTC',(req,res)=>{
    if(req.user.dataValues.username!='admin'){throw 'Error : Wrong key'}
    PTC.create({
        name:req.body.name,
        value:req.body.value
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.post('/createCategories',(req,res)=>{// creates categories(Eg color,dimension)
    if(req.user.dataValues.username!='admin'){throw 'Error : Wrong key'}
    Category.create({
        value:req.body.value
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.post('/createFeatureOption',(req,res)=>{// creates options for catagories(Eg red,blue,green for category color)
    if(req.user.dataValues.username!='admin'){throw 'Error : Wrong key'}
    FeatureOption.create({
        featureId:req.body.featureId,
        value:req.body.value
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.post('/createFeatures',(req,res)=>{// creates features
    if(req.user.dataValues.username!='admin'){throw 'Error : Wrong key'}
    Feature.create({
        categoryId:req.body.categoryId,
        value:req.body.value
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})



route.get('/leftAprrovalPartner',(req,res)=>{   //all partners who have not been approved
    PartnerInfo.findAll({
        where:{approved:false}
    })
    .then((data)=>{res.send(data)})
})
route.get('/leftAprrovalProduct',(req,res)=>{   //all products which have not been approved
    Product.findAll({
        where:{approved:false}
    })
    .then((data)=>{res.send(data)})
})

route.post('/approvePartner',(req,res)=>{      // approve partner
    if(req.user.dataValues.username!='admin'){throw 'Error : Wrong key'}
    PartnerInfo.update(
        {
            approved:true
        },
        {
            where:{id:req.body.id}
        }
    )
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})
route.post('/approveProduct',(req,res)=>{   //approve product
    if(req.user.dataValues.username!='admin'){throw 'Error : Wrong key'}
    Product.update(
        {
            approved:true
        },
        {
            where:{id:req.body.id}
        }
    )
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

exports = module.exports = route
