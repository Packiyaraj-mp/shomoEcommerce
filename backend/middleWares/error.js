module.exports=(err,req,res,next)=>{
    console.log(err.message)
 
       err.statusCode=err.statusCode || 500;
     
       if(process.env.NODE_ENV =='development'){
      
       return res.status(err.statusCode).json({
            success:false,
            message:err.message,
            stack:err.stack,
           
           });

       }
       if(process.env.NODE_ENV =='production'){
        let message=err.message;
        let error=new Error(message);
      
        if(err.name =="ValidationError"){
             console.log(err)
            message=Object.values(err.errors).map(value=>value.message);
            error=new Error(message);
            err.statusCode=400;
          

        }
        if(err.name == 'CastError'){
            message=`Resorce not found: ${err.path}`;
            error=new Error(message);
            err.statusCode=400;

        }
        if(err.code == 11000){
            let message=`Dublicate ${Object.keys(err.keyValue)} error`;
            error=new Error(message);
            err.statusCode=400;
           
        }
        if(err.name=='JSONWebTokenError'){
              let message=`JSON Web Token is invalid.Try again`;
              error=new Error(message);
              err.statusCode=400;

        }
        if(err.name=='TokenExpiredError'){
            let message=`JSON Web Token is expired. Try again`;
            error=new Error(message);
            err.statusCode=400;

         }
       return res.status(err.statusCode).json({
            success:false,
            message:error.message || 'internal server error',
            
           })

       }
       
      
}