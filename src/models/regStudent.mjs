import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const registration = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    userName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phoneNumber: {
        type:Number,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//becrypt password
registration.pre("save" , async function(next){
    if(this.isModified("password")){
        // console.log(`this is password before bcryption is : ${this.password}`)
        this.password = await bcrypt.hash(this.password , 10) 
        // console.log(`this is password after bcrytpion is : ${this.password}`)

        //undefined confirm password (means resist confirm password from saving into db)
        this.confirmPassword = undefined;
    }
    next();
})

//make collection in db
const RegisteredStudents = new mongoose.model("RegisteredStudents" , registration)
export default RegisteredStudents