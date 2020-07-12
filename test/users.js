const { Model } = require('sequelize')
const Email = require('../db').Email
const PhoneNumber = require('../db').PhoneNumber
const Address = require('../db').Address
const User = require('../db').User

function createUser(){
    User.bulkCreate([
        {
            firstName:'Devin',
            lastName:'Harper',
            username:'Burke',
            password:'Ali',
        },
        {
            firstName:'Hiram',
            lastName:'Mona',
            username:'Cherokee',
            password:'Burke',
        },
        {
            firstName:'Aiko',
            lastName:'Bertha',
            username:'Alexander',
            password:'Murphy',
        }
    ])
    .then(()=>{
        Email.bulkCreate([
            {
                userId:1,
                value:'eleifend.egestas.Sed@ornarelectusjusto.ca'
            },
            {
                userId:1,
                value:'Nulla.tincidunt@atortor.edu'
            },
            {
                userId:1,
                value:'nisi.a.odio@malesuadaid.ca'
            },
        ])
        Address.bulkCreate([
            {
                city:'Surrey',
                landmark:'BC',
                userId:1,
                PIN:75647,
                location:'8722 Dictum Street'
            },
            {
                city:'Istanbul',
                landmark:'Istanbul',
                userId:1,
                PIN:86745,
                location:'Ap #788-7990 Mauris Avenue'
            },
            {
                city:'Khuzdar',
                landmark:'Balochistan',
                userId:1,
                PIN:53634,
                location:'890 Duis Rd.'
            },
        ])
        PhoneNumber.bulkCreate([
            {
                userId:1,
                value:9211957691,
            },
            {
                userId:1,
                value:1235094886,
            },
            {
                userId:1,
                value:4654721015,
            }
        ])
    })


}

exports = module.exports = {
    createUser
}
