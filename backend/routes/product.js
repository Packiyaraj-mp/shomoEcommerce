const express=require('express');
const multer=require('multer');
const path=require('path');

const { getProducts,
        newProduct, 
        getSingleProduct, 
        updateProduct, 
        deleteProduct, 
        createReview, 
        getReviews,
        deleteReview, 
        getAdminProducts} = require('../controllers/productcontroller');
        
const {isAuthenticatedUser, authorizeRoles}=require('../middleWares/authenticate');
const { updateProfile } = require('../controllers/authController');
const router=express.Router();

const upload=multer({storage:multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..','/uploads/product'))

    },
    filename:function(req,file,cb){
         cb(null,file.originalname)
    }
})
});



router.route('/products').get(isAuthenticatedUser,getProducts);
router.route('/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/product/:id').get(getSingleProduct)
                           

router.route('/review').put(isAuthenticatedUser,createReview);




// Admin routes
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),newProduct);
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts);
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),updateProduct);
router.route('/admin/reviews').get(isAuthenticatedUser,authorizeRoles('admin'),getReviews);
router.route('/admin/review').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview);

module.exports=router;