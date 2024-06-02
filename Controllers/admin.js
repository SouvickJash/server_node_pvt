const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const AdminModel=require('../Models/adminModel')
// const app=express();

//create
const createUser=async(req, res) => {
    try {
      console.log("++++", req.body);
  
      const user = new AdminModel(req.body);
      const result = await user.save();
      if (result) {
        return res.status(201).json({
          status: 201,
          message: "data  insert successfull",
          data: result,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "error",
      });
    }
  };

//login
const login=async(req,res)=>{
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Plz fill up details");
      return res.status(400).json({
        error: "plz fill up your details",
      });
    } else {
      try {
        const user = await AdminModel.findOne({
          email: email,
        });
        if (user == null) {
          return res.status(404).json({
            message: "their is not any user with in email",
            status: "404",
          });
        } else {
          const userLogin = await AdminModel.findOne({
            email: email,
          });
  
          if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password); //right
  
            //create token
            const token = await userLogin.generateAuthToken(); //right
            console.log("The token part" + token);
  
            res.cookie("jwt", token, {
              //if i want
              expires: new Date(Date.now() + 80000),
              httpOnly: true,
            });
  
            if (!isMatch) {
              console.log("plz send your correct password");
              return res.status(400).json({
                status: 400,
                error: "plz send your correct password",
              });
            } else {
              return res.status(201).json({
                status: 200,
                message: "login successfull",
                info: [userLogin],
                token: token,
              });
            }
          } else {
            return res.status(400).json({
              status: 400,
              error: "Plz fill you correct emailid",
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
      console.log("sucess");
    }
  };

//update password
const updatePassword=async(req,res)=>{
    try{
        console.log(req.body)
        const pass=await bcrypt.hash(req.body.password,10);
        console.log("++++++++++++",pass)
        
        const data=await AdminModel.findOne({_id:req.body.user_id})
        console.log('===',data);
        if(data){
           
            const userData= await AdminModel.updateOne({_id:req.body.user_id},{
              $set:{
                password:pass
              }
            
            })
            console.log("/////",userData);
            return res.status(200).json({
              status:200,
              message:"password updated successfully"
            })
        }else{
          return res.status(404).json({
            status:404,
            message:"user_id not found"
          })
        }
      }
      catch(error){
        console.log(error);
        return res.status(500).json({
          status:500,
          message:"error"
        })
      }
}

//getadmindata
const getAdminData=async(req,res)=>{
    try{
        
      const id = req.params.id;
      console.log(".......",id)
      const data=await AdminModel.find({_id:id})
      if(data){
        return res.status(200).json({
            status:200,
            message:"Data fetch successfully",
            userData:data
        })
      }else{
        return res.status(404).json({
            status:404,
            message:"Data not found"
        })
      }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            status:500,
            message:"error"
        })
    }
}


module.exports={
   createUser,
   login,
   updatePassword,
   getAdminData
}