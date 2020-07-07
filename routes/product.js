const { User } = require('../db')
const { product } = require('./root')
const { where } = require('sequelize')

const route = require('express').Router()
const Display = require('../db').Display
const Product = require('../db').Product
const Cart = require('../db').Cart
const Image = require('../db').Image
const Category = require('../db').Category
const CategoryOption = require('../db').CategoryOption

route.get('/getProducts',(req,res)=>{
    CategoryOption.findAll({
        include:[{
            model:Product
        }]
    })
    .then((products)=>{
        res.send(products)
    })
})

route.get('getCategories',(req,res)=>{
    Category.findAll({
        where:{degree:req.body.degree}
    })
})

route.get('getImges',(req,res)=>{
    Image.findAll({
        where:{productId:req.body.productId}
    })
    .then((data)=>{res.send(data)})
})
route.get('/getCategoryOptions',(req,res)=>{
    CategoryOption.findAll({
        where:{categoryId:req.body.categoryId}
    })
})

route.get('/checkCart',(req,res)=>{
    Cart.findOne({
        where:{
            userId:req.user.dataValues.id,
            productId:req.body.productId
        }
    })
})

route.post('/addToCart',(req,res)=>{
    console.log(req.user.dataValues)
    Cart.create({
        userId:req.user.dataValues.id,
        productId:req.body.productId,
        quantity:1
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.post('/updateQuantity',(req,res)=>{
    Cart.update(
        {
            quantity:req.body.quantity
        },
        {
            where:{
                userId:req.user.dataValues.id,
                productId:req.body.productId
            }
        }
    )
})

route.post('/createProduct',(req,res)=>{
    Product.create({
        userId:req.user.dataValues.id,
        name:req.body.name,
        image:req.body.name,
        price:req.body.price,
        PTC:req.body.PTC,
        approved:false
    })
    .then((data)=>{
        for(i=0;i<req.body.categoryOptionId.length;i++){
            Display.create({
                productId:data.dataValues.id,
                categoryOptionId:req.body.categoryOptionId[i]
            })
        }
    })
})

route.post('/updateImages',(req,res)=>{
    for(i=0;i<req.body.moreImages.length;i++){
        Image.create({
            value:req.body.moreImages[i],
            productId:req.body.productId
        })
    }
})

exports = module.exports = route