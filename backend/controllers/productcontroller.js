const productModel = require("../models/productModel");
const ErrorHander=require('../utils/errorHandlers');
const APIFeatures=require('../utils/apiFeatures');
const catchAsyncError = require("../middleWares/catchAsyncError");
const ErrorHanders = require("../utils/errorHandlers");
const { isAuthenticatedUser } = require("../middleWares/authenticate");

// Get Products -/api/v1/products
exports.getProducts=(async(req,res,next)=>{
  const resPerPage=4;

   let buildQuery=()=>{
    return new APIFeatures(productModel.find(),req.query).search().filter();
      };

 const FilteredProductsCount=await buildQuery().query.countDocuments({});
 const totalProductsCount=await productModel.countDocuments({});
 let productsCount=totalProductsCount;

 if(FilteredProductsCount !== totalProductsCount){
   productsCount=FilteredProductsCount;
 }
 
 const products= await buildQuery().paginate(resPerPage).query
 

    return res.status(200).json({
     success:true,
     count:productsCount,
     resPerPage,
     products
    })

});

// create product-api/v1/product/new
exports.newProduct=catchAsyncError(async(req,res,next)=>{
   let images=[];

   let BASE_URL=process.env.BACKEND_URL;

if(process.env.NODE_ENV==="production"){
   BASE_URL=`${req.protocol}://${req.get('host')}`
}

   if(req.files.length>0){
          req.files.forEach(file=>{
                   let url=`${BASE_URL}/uploads/product/${file.originalname}`;
                   images.push({image:url})
          })
   }
    req.body.images=images;
    req.body.user=req.user.id;
    const product= await productModel.create(req.body);
   return res.status(201).json({
      success:true,
      product
    })

});

// Get single product-/api/v1/products/:id

exports.getSingleProduct=catchAsyncError(async(req,res,next)=>{

  const product= await productModel.findById(req.params.id).populate('reviews.user','name email');
 
    if(!product){
   
   return next(new ErrorHander('Product not found ',400));
   
    }
   
     return res.status(201).json({

        success:true,
        product
      })

 })


// update Product-/api/v1/product/:id
exports.updateProduct=catchAsyncError(async (req,res,next)=>{
   let product=await productModel.findById(req.params.id);

// uploading images
   let images=[];

// if images not cleared we keep existing images
   if(req.body.imagesCleared==='false'){
      images=product.images;
   }
   
  let BASE_URL=process.env.BACKEND_URL;

if(process.env.NODE_ENV==="production"){
   BASE_URL=`${req.protocol}://${req.get('host')}`
}

   if(req.files.length>0){
          req.files.forEach(file=>{
                   let url=`${BASE_URL}/uploads/product/${file.originalname}`;
                   images.push({image:url})
          })
   }
    req.body.images=images;


  if(!product){
    return next(new ErrorHander('Product not found ',400));
   }else{
    product=await productModel.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
          })
           return res.status(200).json({
            success:true,
            product
        })
    }
  
 })

// delete product -/api/v1/product/:id
 exports.deleteProduct =catchAsyncError(async (req,res,next)=>{
  const product=await productModel.findById(req.params.id);

  if(!product){
    return next(new ErrorHander('Product not found ',400));
  }

    await product.deleteOne({_id:req.params.id});
   return res.status(200).json({success:true,message:'product deleted'});

 });


//  Create review -api/v1/review
exports.createReview=catchAsyncError(async (req,res,next)=>{
   const {productId,rating,comment}=req.body;
   const review={
    user:req.user.id,
    rating,
    comment
   }

   const product =await productModel.findById(productId);

  //  finding user review
   const isReviewed=product.reviews.find(reviews=>{
     return reviews.user.toString()==req.user.id.toString();
   })
   if(isReviewed){
    // updating the review
  
     product.reviews.forEach(review=>{
      if(review.user.toString()== req.user.id.toString()){
            review.comment=comment;
            review.rating=rating;
          
      }
     })
     
   }else{
    // creating the review
    
    product.reviews.push(review);
    product.numOfReviews=product.reviews.length;

   }
  //  find the average of the product
   product.ratings=product.reviews.reduce((acc,review)=>{
       return Number(review.rating) + acc;
   },0)/product.reviews.length;

   

   product.ratings=isNaN(product.ratings)?0:product.ratings;
   await product.save({validateBeforeSave:false});
   res.status(200).json({
    success:true
   })
});


// Get reviews -api/v1/reviews?id={productid}
exports.getReviews=catchAsyncError(async(req,res,next)=>{
   const product=await productModel.findById(req.query.id).populate('reviews.user','name email');
  console.log(product)
   res.status(200).json({
       success:true,
       reviews:product.reviews
   })
})

// Delete Review -api/v1/review
exports.deleteReview=catchAsyncError(async (req,res,next)=>{
  
     const product=await productModel.findById(req.query.productId);

    //  filtering the reviews which does match the deleting review id
     const reviews=product.reviews.filter(review=>{
        return review._id.toString() !==req.query.id.toString()
     });

    //  number of reviews
     const numOfReviews=reviews.length;

// finding the average with the filtered reviews
     let ratings=reviews.reduce((acc,review)=>{
      return Number(review.rating) + acc;
  },0)/reviews.length;

//  save the product document
  ratings=isNaN(ratings)?0:ratings;
  await productModel.findByIdAndUpdate(req.query.productId,{
       reviews,
       numOfReviews,
       ratings
  });
  res.status(200).json({
     success:true
  })
});

// get admin products -api/v1/admin/products
exports.getAdminProducts=catchAsyncError(async(req,res,next)=>{
    const products=await productModel.find();
    res.status(200).json({
      success:true,
      products

    })
})




