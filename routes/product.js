const { User, Feature } = require('../db')
const { product } = require('./root')
const { where } = require('sequelize')
const path = require('path')
const route = require('express').Router()
const Display = require('../db').Display
const Product = require('../db').Product
const Cart = require('../db').Cart
const Image = require('../db').Image
const Category = require('../db').Category
const FeatureOption = require('../db').FeatureOption
const multer = require('multer')

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'/home/anish/Desktop/Web/Ecommerce/public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

let upload = multer({
    storage: storage,
    limits:{fileSize: 100000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).array('myImage',4);
// Set The Storage Engine
  
route.post('/uploadImages',(req,res)=>{
    upload(req, res, (err) => {
        // console.log(req.files)
        if(err){
          res.send('Please try again')
        } else {
          if(req.files == undefined){
            res.send('No file sent')
          } else {
              let urls = []
              for(i in req.files){
                urls[i] = 'http://wheelbox/'+req.files[i].filename
              }
            res.send(urls)
          }
        }
      });
    
})
  

route.get('/getProducts',(req,res)=>{   //all products category wise
    console.log(req.query.categoryId)
    Product.findAll(
        {
            where:{categoryId:req.query.categoryId},
            include:FeatureOption
        },
    )
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.get('/getCategories',(req,res)=>{  
    Category.findAll()
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.get('/getFeatures',(req,res)=>{
    Feature.findAll({
        where:{categoryId:req.query.categoryId}
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.get('/getFeatureOptions',(req,res)=>{
    FeatureOption.findAll({
        where:{featureId:req.query.featureId}
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.get('/getImages',(req,res)=>{
    Image.findAll({
        where:{productId:req.query.productId}
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})


route.get('/checkCart',(req,res)=>{ // check if product already in Cart
    Cart.findOne({
        where:{
            userId:req.user.dataValues.id,
            productId:req.query.productId
        }
    })
})

route.post('/addToCart',(req,res)=>{    // add product to cart
    console.log(req.user.dataValues)
    Cart.create({
        userId:req.user.dataValues.id,
        productId:req.body.productId,
        quantity:1
    })
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.send(err)})
})

route.post('/updateQuantity',(req,res)=>{   //update the quantity of product in cart
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

route.post('/createProduct',(req,res)=>{    //create product
    Product.create({
        userId:req.user.dataValues.id,
        name:req.body.name,
        image:req.body.name,
        price:req.body.price,
        desciption:req.body.desciption,
        approved:false
    })
    .then((data)=>{
        for(i=0;i<req.body.featureOptionId.length;i++){
            Display.create({
                productId:data.dataValues.id,
                featureOptionId:req.body.featureOptionId[i]
            })
        }
        return data;
    })
    .then((data)=>{})
})

route.post('/deleteProduct',(req,res)=>{
    Product.destroy({
        where:{id:req.body.id}
    })
    .then(()=>{
        Display.destroy({
            where:{
                userId:req.user.dataValues.id,
                productId:req.nody.productId
            }
        })
    })
})

route.post('/updateImages',(req,res)=>{ // update images for products(extra images)
    
    Product.findOne({
        where:{id:req.body.productId}
    })
    .then((data)=>{
        console.log(data.dataValues)
        if(data.dataValues.userId!=req.user.dataValues.id){
            throw "Not your product"
        }
        else if(typeof moreImages ==='string'){
            Image.create({
                value:req.body.moreImages[i],
                productId:req.body.productId
            })
        }
        else{
            for(i=0;i<req.body.moreImages.length;i++){
                Image.create({
                    value:req.body.moreImages[i],
                    productId:req.body.productId
                })
            }
        }
    })
    .then(()=>{res.send(1)})
    // .catch((err)=>{res.send(err)})
})

exports = module.exports = route