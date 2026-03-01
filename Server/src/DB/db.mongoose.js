import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config()

export const connectDb = async()=>{
    try{
        const URL = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
        console.log("MongoDB URL:", URL);
        if(URL){
           const conn = await mongoose.connect(URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, 
    });
           console.log(`MongoDB connected: ${conn.connection.host}`);
        }
        else{
            console.log("Error with connecting..")
            process.exit(1);
        }
    }
    catch(error){
        console.log("MongoDB connection error:", error.message);
    }
}