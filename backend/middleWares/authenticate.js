const { request } = require("express");
const catchAsyncError = require("./catchAsyncError");
const ErrorHanders = require("../utils/errorHandlers");
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

exports.isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHanders('Login first to handle this resource',401));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id);
    next();

});

exports.authorizeRoles=(...roles)=>{

    return (req,res,next)=>{
      
         if(!roles.includes(req.user.role)){
            return next(new ErrorHanders(`Role ${req.user.role} is not allowed`,401))
         }
         next();
     }
};

