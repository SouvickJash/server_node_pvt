const mongoose=require('mongoose')
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    Teacher_Name:{
        type:String,
        require:true
    },
    Depterment:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Phone:{
        type:String,
        require:true
    },
},  {
    timestamps: true,
  })

//create token
userSchema.methods.generateAuthToken= async function(){
    try{
        const token= jwt.sign({_id : this._id},"mynameissouvickjashiamprogrammerandlearnlotsoftechnology");
        // this.token=this.token.concat({token:token});
        await this.save();
        return token;
  }
    catch(error){
        // res.send("The error part is"+error);
        console.log("The error part is"+error);
    }
  }

//bcrypt password
userSchema.pre("save",async function(next){ 
      
    if(this.isModified("password"))
    {
     this.password= await bcrypt.hash( this.password,10);
     console.log( this.password);
    }
 
     next();
 })



const userModel=mongoose.model('Teacher',userSchema);
module.exports=userModel