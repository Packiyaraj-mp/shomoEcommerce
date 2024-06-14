const app=require('./app');
const mongoConnection=require('./config/database');


// DataBase Connection
mongoConnection();


const server=app.listen(process.env.PORT,()=>{
    console.log(`server running on port is ${process.env.PORT} in ${process.env.NODE_ENV}`)
});

process.on('unhandledRejection',(err)=>{
   console.log(`Error: ${err}`);
   console.log('shutting down the server due to unhandled rejection error');
   server.close(()=>{
    process.exit(1);
   })
});

process.on(`uncaughtException`,(err)=>{
    console.log(`Error: ${err.message}`);
   console.log('shutting down thev server due to uncaught rejection error');
   server.close(()=>{
    process.exit(1);
   })
});


