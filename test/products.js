const { PTC, FeatureOption} = require('../db')
const { patch } = require('../routes/load')
const Feature = require('../db').Feature
const Category = require('../db').Category
const Product = require('../db').Product
const Cart = require('../db').Cart
const Brand = require('../db').Brand
const Image = require('../db').Image
const Display = require('../db').Display
const fetch = require('node-fetch')

function createPsroduct(){
    // Display.bulkCreate([
    //     {productId:1,featureOptionId:1},
    //     {productId:1,featureOptionId:3},
    //     {productId:2,featureOptionId:1},
    //     {productId:2,featureOptionId:3},
    // ])
    // Product.update(
    //     {userId:1},
    //     {where:{id:1}}
    // )
}

function createProduct(){
    // .then(()=>{
        //     fetch('https://localhost:9876/login/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             username:'admin',
        //             password:'admin'
        //         })
        //     })
        // })
    PTC.bulkCreate([
        {value:1,name:'asdasd'},
        {value:3,name:'3453'},
    ])
    Brand.bulkCreate([
        {value:'REEBOK'},
        {value:'Bulu'}
    ])
    Category.bulkCreate([
        {value:'Cushions'},
        {value:'Bedding'}
    ])
    .then(()=>{
        Feature.bulkCreate([
            {
                value:'Color',
                categoryId:1
            },
            {
                value:'Brand',
                categoryId:1
            },
            {
                value:'Color',
                categoryId:2
            },
            {
                value:'Brand',
                categoryId:2
            },
        ])
    })
    .then(()=>{
        FeatureOption.bulkCreate([
            {
                value:'Red',
                featureId:1
            },
            {
                value:'Green',
                featureId:1
            },
            {
                value:'PUMA',
                featureId:2
            },
            {
                value:'ADI',
                featureId:2
            },
            {
                value:'Red',
                featureId:3
            },
            {
                value:'Green',
                featureId:3
            },
            {
                value:'PUMA',
                featureId:4
            },
            {
                value:'ADI',
                featureId:4
            },
        ])
    })
    .then(()=>{
        Product.bulkCreate([
            {
                name:'121232',
                image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bulubox.com%2F&psig=AOvVaw1eI8WN12SQyYZVGumpIvJH&ust=1595604033489000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCe6q_W4-oCFQAAAAAdAAAAABAD',
                price:31232,
                brandId:1,
                PTCId:1,
                categoryId:1,
            },
            {
                name:'121232',
                image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bulubox.com%2F&psig=AOvVaw1eI8WN12SQyYZVGumpIvJH&ust=1595604033489000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCe6q_W4-oCFQAAAAAdAAAAABAD',
                price:23456,
                brandId:1,
                PTCId:1,
                categoryId:1
            },
        ])
    })
    .then(()=>{
        Display.bulkCreate([
            {productId:1,featureOptionId:1},
            {productId:1,featureOptionId:3},
            {productId:2,featureOptionId:1},
            {productId:2,featureOptionId:3},
        ])
    })
}

exports = module.exports = {
    createProduct
}