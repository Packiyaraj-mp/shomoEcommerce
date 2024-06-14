const products=require('../data/product.json');
const Product=require('../models/productModel');
const dotenv=require('dotenv');
const connectDataBase=require('../config/database');

dotenv.config({path:'backend/config/config.env'});
connectDataBase();

const seedProducts=async()=>{
    try{
        await Product.deleteMany();
        console.log('products deleted');
        await Product.insertMany(products);
        console.log('all products added');

    }catch(err){
         console.log(err)
    }
    process.exit();
   
}

seedProducts();