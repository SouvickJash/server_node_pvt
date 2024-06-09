const express = -require("express");
const jwt = require("jsonwebtoken");
// const bcrypt=require('bcryptjs');
const TeacherModel = require("../Models/teacherModel");
const { Validator } = require("node-input-validator");

// create teacher
const createTeacher = async (req, res) => {
  try {
    console.log(req.body);
    // const user = new TeacherModel(req.body);
    const {Teacher_Name,Depterment,Email,Phone}=req.body
    const v = new Validator(req.body, {
      Teacher_Name: "required|string",
      Depterment: "required|string",
      Email: "required|string",
      Phone: "required|string",
    });
    const match = await v.check();
    if (!match) {
      return res.status(404).json({
        status: 404,
        message: v.errors,
      });
    }
    const user = new TeacherModel({Teacher_Name,Depterment,Email,Phone});
    const result = await user.save();
    if (result) {
      return res.status(201).json({
        status: 201,
        message: "Data create successfully",
        data: user,
      });
    }
  } catch (error) {
    // console.log(error)
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//get api
const getTreacher=async(req,res)=>{
  try{
    const result=await TeacherModel.find().sort({createdAt:-1})
    return res.status(200).json({
        status:200,
        message:"Data fetch successfully",
        Data:result
    })
  }
  catch(error){
    return res.status(500).json({
        status:500,
        message:"error"
    })
  }
}

//get information
const getInformation=async(req,res)=>{
    try{
      const result=await TeacherModel.find();
    //   const studentresult=await
      console.log("total teacher",result.length);
      return res.status(200).json({
          status:200,
          message:"Data fetch successfully",
          totalTeacher:result.length
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
  getInformation
};
