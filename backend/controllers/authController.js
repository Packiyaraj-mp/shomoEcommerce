const catchAsyncError=require('../middleWares/catchAsyncError');
const User=require('../models/userModel');
const sendToken=require('../utils/jwt');
const ErrorHandler =require('../utils/errorHandlers');
const sendEmail=require('../utils/email')
const crypto =require('crypto');
const bcrypt=require('bcrypt');


// register user => /api/v1/register
exports.registerUser=catchAsyncError(async (req,res,next)=>{

    
const {name,email,password}=req.body;

let avatar;
let BASE_URL=process.env.BACKEND_URL;

if(process.env.NODE_ENV==="production"){
   BASE_URL=`${req.protocol}://${req.get('host')}`
}

if(req.file){
    avatar=`${BASE_URL}/uploads/user/${req.file.originalname}`;

}

  const user= await User.create({
        name,
        email,
        password,
        avatar
    });
    
sendToken(user,201,res);

});

// Login=> api/v1/login 
exports.loginUser=catchAsyncError(async (req,res,next)=>{
  
     const {email,password}=req.body;
     

     if(!email || !password){
    
        return next(new ErrorHandler('Please enter email & password',400));
     }

    //  finding the user database
   const user=await User.findOne({email}).select('+password');

   if(!user){
    return next(new ErrorHandler('invalid email or password',401));
   }
   if(!await user.isValidPassword(password)){
    return next(new ErrorHandler('invalid email or password',401));
   }

   sendToken(user,201,res);

});

// logout =>/api/v1/logout
exports.logoutUser =(req,res,next)=>{
   res.cookie('token',null,{
      expires:new Date(Date.now()),
      httpOnly:true
   }).status(200).json({
      success:true,
      message:'loggedout'
   })

};

// forget password =>api/v1/password/forgot
exports.forgetPassword=catchAsyncError(async (req,res,next)=>{
 
   const user= await User.findOne({email:req.body.email})
   
   if(!user){
      return next(new ErrorHandler('User not found with this  email',404))
   }

   const resetToken=await user.getResetToken();

 await user.save({validateBeforeSave:false});

 let BASE_URL=process.env.FRONTEND_URL;

if(process.env.NODE_ENV==="production"){
   BASE_URL=`${req.protocol}://${req.get('host')}`
}

  //  create reset url
  const resetUrl=`${BASE_URL}/password/reset/${resetToken}`;
  const message=`Your password reset url is as follow \n\n
  ${resetUrl} \n\n if you have not requested this email,then ignore it.`;



  try{
    await sendEmail (
      {email:user.email,
      subject:"shomo password recovery",
       message});

     return  res.status(200).json({
         success:true,
         message:`Email send to ${user.email}`
       })



  }catch(err){

      user.resetPasswordToken=undefined;
      user.resetPasswordTokenExpire=undefined;
      await user.save({validateBeforeSave:false});
      return next(new ErrorHandler(err.message),500)
  }
});

// reset password =>/api/v1/password/reset/:token
exports.resetPassword=catchAsyncError (async (req,res,next)=>{
   
   console.log(req.params.token)
   const resetPasswordToken= crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user =await User.findOne({   
     resetPasswordToken:resetPasswordToken,
     resetPasswordTokenExpire:{
         $gt:Date.now()
     }
  });


  if(!user){
   return next(new ErrorHandler('Password reset token is  expired'))
  }
  if(req.body.password !==req.body.confirmPassword){
   return next(new ErrorHandler('Password does not match'))
  }

  user.password=req.body.password;
  user.resetPasswordToken=undefined;
  user.resetPasswordTokenExpire=undefined;
 await user.save({validateBeforeSave:false});
 
  sendToken(user,201,res)

});

// Get User Profile /api/v1/myprofile
exports.getUserProfile=catchAsyncError(async (req,res,next)=>{
  
  const user=await User.findById(req.user.id);
 
  res.status(200).json({
   success:true,
   user
  })
});

// Change Password=> /api/v1/password/change
exports.changePassword=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.user.id).select('+password');
   //  check old password
   if(!await user.isValidPassword(req.body.oldPassword)){
         return next(new ErrorHandler('Old password is incorrect',401));
   }

   // set new password 
   user.password=req.body.password;
   await user.save();
   res.status(200).json({
      success:true
   })
});

//  update profile =>/api/v1/update
exports.updateProfile=catchAsyncError(async(req,res,next)=>{

        let newUserData={
         name:req.body.name,
         email:req.body.email,
        };
        let avatar;

let BASE_URL=process.env.BACKEND_URL;

if(process.env.NODE_ENV==="production"){
   BASE_URL=`${req.protocol}://${req.get('host')}`
}

     if(req.file){
        avatar=`${BASE_URL}/uploads/user/${req.file.originalname}`;
            newUserData={...newUserData,avatar}
         }


   const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
              new:true,
              runValidators:true,

        });
        res.status(200).json({
         success:true,
         user
        })
});

// admin:Get All Users =>/api/v1//admin/user/
exports.getAllUsers=catchAsyncError(async (req,res,next)=>{
     const users= await  User.find();
   //  const users= fetchUsers.filter(user=>user.role==='user')
     res.status(200).json({
      success:true,
      users
     })
});
// get specific user =>/api/v1//admin/user/:id
exports.getUser=catchAsyncError(async(req,res,next)=>{
   const user=await User.findById(req.params.id);
   if(!user){
      return next(new ErrorHandler(`User not found with this id ${req.params.id}`));
   }
   res.status(200).json({
      success:true,
      user
   })

});

// admin:Update user 
exports.updateUser=catchAsyncError(async(req,res,next)=>{
   const newUserData={
      name:req.body.name,
      email:req.body.email,
      role:req.body.role
   }


const user= await User.findByIdAndUpdate(req.params.id,newUserData,{
           new:true,
           runValidators:true,

     });
     res.status(200).json({
      success:true,
      user
     })

});

// admin: Delete user -
exports.deleteUser=catchAsyncError(async(req,res,next)=>{
   const user=await User.findById(req.params.id);
   if(!user){
      return next(new ErrorHandler(`User not found with this id ${req.params.id}`));
    }

   await user.deleteOne();
   res.status(200).json({
      success:true,
   
   })
    
})





