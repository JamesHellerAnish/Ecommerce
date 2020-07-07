const { PartnerInfo } = require('../db')
const { where } = require('sequelize')

const route = require('express').Router()
const Display = require('../db').Display
const Product = require('../db').Product
const Cart = require('../db').Cart
const Image = require('../db').Image
const Category = require('../db').Category
const CategoryOption = require('../db').CategoryOption



route.post('/createCategoryOptions',(req,res)=>{// creates options for catagories(Eg red,blue,green for category color)
    if(req.user.dataValues.username!='admin'){throw 'Error : Wrong key'}
    CategoryOption.create({
        categoryId:req.body.categoryId,
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
