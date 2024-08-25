const express = -require("express");
const jwt = require("jsonwebtoken");
// const bcrypt=require('bcryptjs');
const TeacherModel = require("../Models/teacherModel");
const { Validator } = require("node-input-validator");
const studentModel = require("../Models/studentModel");

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


// search api
// const searchApi = async (req, res) => {
//   try {
//     // const key = req.body.name;
//     const key = req.params.name;
//     console.log("-------",key);
//     let q = "^" + key;
//     const result = await TeacherModel.find({Teacher_Name:{$regex:q,$options: "i"}}).sort({ createdAt: -1 });
//     console.log("++++++",result)
//     if(result.length===0){
//       return res.status(404).json({
//         status: 404,
//         message: "There is no data",
//       });
//     }
//     else{
//       return res.status(200).json({
//         status: 200,
//         message: "Data fetch successfully",
//         Data: result,
//       });
//     }

//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       message: "error",
//     });
//   }
// };

const searchApi = async (req, res) => {
  try {
    // Get the search key from query parameters
    const key = req.params.name;
    console.log("-----",key)
    // Check if the key is provided
    if (!key) {
      return res.status(400).json({
        status: 400,
        message: "Search parameter 'name' is required",
      });
    }

    console.log("Search key:", key);

    // Use the key to build the regex query
    let q = "^" + key;
    const result = await TeacherModel.find({ Teacher_Name: { $regex: q, $options: "i" } }).sort({ createdAt: -1 });

    console.log("Search results:", result);

    // Check if the result is empty
    if (result.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No data found",
      });
    }

    // Return the found results
    return res.status(200).json({
      status: 200,
      message: "Data fetched successfully",
      data: result,
    });

  } catch (error) {
    console.error("Error occurred during search:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};


//get information(length)
const getInformation = async (req, res) => {
  try {
    const teacherCount = await TeacherModel.find();
    // const studentCount=await studentModel.find();
   
    // res.json({ totalTeacher: teacherCount, totalStudent: studentCount });
    return res.status(200).json({
      status: 200,
      message: "Data fetch successfully",
      totalTeacher: teacherCount.length,
      // totalStudent: studentCount.length
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
     return res.status(200).json({
       status:200,
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
  searchApi
  
};
