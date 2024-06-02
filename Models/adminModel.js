const mongoose=require('mongoose')
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    idDelete:{
        type:String,
        default:"no",
        require:false
    },
    otp:{
        type:String,
        default:null
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



const userModel=mongoose.model('AdminLogin',userSchema);
module.exports=userModel