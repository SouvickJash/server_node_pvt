const express = -require("express");
const jwt = require("jsonwebtoken");
// const bcrypt=require('bcryptjs');
const TeacherModel = require("../Models/teacherModel");
const { Validator } = require("node-input-validator");

// create teacher
// const createTeacher = async (req, res) => {
//   try {
//     console.log(req.body);
//     // const user = new TeacherModel(req.body);
//     const {Teacher_Name,Depterment,Email,Phone,City,Age}=req.body
//     const v = new Validator(req.body, {
//       Teacher_Name: "required|string",
//       Depterment: "required|string",
//       Email: "required|string",
//       Phone: "required|string",
//       City: "required|string",
//       Age: "required|string",
//     });
//     const match = await v.check();
//     if (!match) {
//       return res.status(404).json({
//         status: 404,
//         message: v.errors,
//       });
//     }
//     const user = new TeacherModel({Teacher_Name,Depterment,Email,Phone,City,Age});
//     const result = await user.save();
//     if (result) {
//       return res.status(201).json({
//         status: 201,
//         message: "Data create successfully",
//         data: user,
//       });
//     }
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({
//       status: 500,
//       message: "error",
//     });
//   }
// };


//create
const createTeacher = async (req, res) => {
  try {
    console.log("++++", req.body);

    const user = new TeacherModel(req.body);
    const result = await user.save();

    return res.status(201).json({
      status: 201,
      message: "Data created Successfull",
      data : result,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//get api
const getTreacher = async (req, res) => {
  try {
    const result = await TeacherModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: 200,
      message: "Data fetch successfully",
      Data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//get information(length)
const getInformation = async (req, res) => {
  try {
    const result = await TeacherModel.find();
    //   const studentresult=await
    // console.log("total teacher", result.length);
    return res.status(200).json({
      status: 200,
      message: "Data fetch successfully",
      totalTeacher: result.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//edit
const EditInformation=async(req,res)=>{
  try{
       const id=req.params.id;
       const result=await TeacherModel.findById(id)
       return res.status(200).json({
        status:200,
        message:"Data fetch successfully",
        data:result
       })
  }
  catch(error){
    return res.status(500).json({
      status:500,
      message:"error"
    })
  }
}

//update

const UpdateInformation=async(req,res)=>{
  try{
     const id=req.params.id;
     const result=await TeacherModel.findByIdAndUpdate(id,req.body,{
      new:true
     });
     return res.status(201).json({
       status:true,
       message:"Data updated successfully",
       data:result
     })
  }
  catch(error){
    return res.status(500).json({
      status:false,
      message:error.message
    })
}
}

//delete
const DeleteInformation=async(req,res)=>{
  try{
     const id=req.params.id;
     const result=await TeacherModel.findByIdAndDelete(id)
     return res.status(200).json({
      status:200,
      message:"Data deleted successfully",
      data:result
     })
  }
  catch(error){
    return res.status(500).json({
      status:500,
      message:"error"
    })
  }
}

module.exports = {
  createTeacher,
  getTreacher,
  getInformation,
  EditInformation,
  UpdateInformation,
  DeleteInformation,
  
};
