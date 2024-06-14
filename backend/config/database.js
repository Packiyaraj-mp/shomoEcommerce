const mongoose=require('mongoose');

const connectionDataBase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then((con)=>console.log(`mongoDB connected to the host: ${con.connection.host}`))
    
}

module.exports=connectionDataBase;