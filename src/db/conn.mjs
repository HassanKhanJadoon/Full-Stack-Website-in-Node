import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/registrationForm")
.then(()=>{
    console.log("db connected successfully..!")
}).catch((error)=>{
    console.log("db not connected yet..!")
})






   


