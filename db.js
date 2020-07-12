const Sequelize = require('sequelize');

const db = new Sequelize(
    {
        dialect: 'sqlite',
        storage:"test.db"
    }
)

// User code

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique:true,
        primaryKey:true,
        autoIncrement:true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
    },
    mainPhoneNumber:{
        type: Sequelize.STRING,
        allowNull: false
    },
    mainEmail:{
        type: Sequelize.STRING,
        allowNull: false
    },
})


const PhoneNumber = db.define('phoneNumbers',{
    value:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    verified:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
    }
})
PhoneNumber.belongsTo(User)

const Email = db.define('emails',{
    value:{
        type:Sequelize.STRING,
        allowNull:false,
        // unique:true
    },
    verified:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
    }
})
Email.belongsTo(User)

const Address = db.define('addresses',{
    city: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    landmark: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    PIN: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})
Address.belongsTo(User)

// Product Code

const Product = db.define('products',{ 
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    },
    PTC:{
        type:Sequelize.STRING,
    },
    approved:{
        type:Sequelize.BOOLEAN,
    }
})
Product.belongsTo(User)

const Image = db.define('images',{
    value:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})
Image.belongsTo(Product)

const Category = db.define('categories',{
    value:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})
Product.belongsTo(Category)

const Feature = db.define('features',{
    value:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

Feature.belongsTo(Category)

const CategoryOption = db.define('categoryOptions',{
    value:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

CategoryOption.belongsTo(Feature)

const Brand = db.define('brands',{
    value:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
Product.belongsTo(Brand)

const Cart = db.define('carts',{
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})
Product.belongsToMany(User,{through:'carts'})
User.belongsToMany(Product,{through:'carts'})

const Display = db.define('diplays',{})
CategoryOption.belongsToMany(Product,{through:'diplays'})
Product.belongsToMany(CategoryOption,{through:'diplays'})

// Partner Code

const PartnerInfo = db.define('partnerInfos',{
    company:{
        type:Sequelize.STRING,
    },
    storeName:{
        type:Sequelize.STRING,
    },
    approved:{
        type:Sequelize.BOOLEAN,
    }
})
Email.belongsTo(PartnerInfo)
Address.belongsTo(PartnerInfo)
PhoneNumber.belongsTo(PartnerInfo)
PartnerInfo.belongsTo(User)

const PartnerCategory = db.define('partnerCategories',{

})

PartnerInfo.belongsToMany(Category,{through:'partnerCategories'})
Category.belongsToMany(PartnerInfo,{through:'partnerCategories'})

const TaxInfo = db.define('taxInfos',{
    state:{
        type:Sequelize.STRING,
    },
    GST:{
        type:Sequelize.STRING,
    },
    PAN:{
        type:Sequelize.STRING,
    }
})
TaxInfo.belongsTo(User)

const BankInfo = db.define('bankInfos',{
    name:{
        type:Sequelize.STRING,
    },
    type:{
        type:Sequelize.STRING,
    },
    number:{
        type:Sequelize.STRING,
    },
    IFSC:{
        type:Sequelize.STRING,
    },
})
BankInfo.belongsTo(User)


db.sync().then(() => console.log("Database is ready"))

exports = module.exports = {
    db,
    User,
    PartnerInfo,
    BankInfo,
    TaxInfo,
    Image,
    Product,
    Cart,
    Email,
    Category,
    Feature,
    Address,
    PhoneNumber,
    CategoryOption,
    Brand,
    Display
}