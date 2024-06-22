const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const AdminModel = require("../Models/adminModel");
// const app=express();

//create user
const createUser = async (req, res) => {
  try {
    console.log("++++", req.body);

    const user = new AdminModel(req.body);
    if (req.file) {
      user.image = req.file.path;
    }
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

//login user
const login = async (req, res) => {
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
          error: "Invalid emailid or password",
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
              error: "Invalid emailid or password",
            });
          } else {
            return res.status(200).json({
              status: 200,
              message: "login successfull",
              info: [userLogin],
              token: token,
            });
          }
        } else {
          return res.status(400).json({
            status: 400,
            error: "Invalid emailid or password",
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
const updatePassword = async (req, res) => {
  try {
    console.log(req.body);
    const pass = await bcrypt.hash(req.body.password, 10);
    console.log("++++++++++++", pass);

    const data = await AdminModel.findOne({ _id: req.body.user_id });
    console.log("===", data);
    if (data) {
      const userData = await AdminModel.updateOne(
        { _id: req.body.user_id },
        {
          $set: {
            password: pass,
          },
        }
      );
      console.log("/////", userData);
      return res.status(200).json({
        status: 200,
        message: "password updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "user_id not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//get detais
const getadmin = async (req, res) => {
  try {
    const data = await AdminModel.find();
    if (data) {
      return res.status(200).json({
        status: 200,
        message: "Data fetch successfully",
        userData: data,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//getadmindata all data get particuler id
const getAdminData = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(".......", id);
    const data = await AdminModel.find({ _id: id });
    if (data) {
      return res.status(200).json({
        status: 200,
        message: "Data fetch successfully",
        userData: data,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//forget password
const forgetPassword = async (req, res) => {
  try {
    const data = req.body.email;

    const user = await AdminModel.findOne({ email: data });

    if (user == null) {
      return res.status(404).json({
        status: "404",
        message: "email is not register",
      });
    } else {
      const otp = crypto.randomInt(100000, 999999);
      console.log("OTP", otp);
      const update = await AdminModel.findByIdAndUpdate(
        AdminModel._id,
        { otp: otp },
        {
          new: true,
        }
      );
      console.log("update", update);
      console.log("++++++", req.body.email);
      let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        from_name: "On Demand Interpreter",
        auth: {
          user: "morekilometersmorefun@gmail.com",
          pass: "vjorpxgmovfhgyyn",
        },
      });

      let mailDetails = {
        from: "morekilometersmorefun@gmail.com",
        to: req.body.email,
        subject: "OTP GENERATE",
        text: `Your OTP is: ${otp}`,
      };

      mailTransporter.sendMail(mailDetails, (err) => {
        if (err) {
          console.log("it has error", err);
          return res.status(404).json({
            status: "404",
            message: "Not found",
          });
        } else {
          console.log("Email sent successfully");
          return res.status(200).json({
            status: "200",
            message: "Email sent successfully",
            newdata: [mailDetails],
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "500",
      message: "ERROR",
    });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {
    const reset = req.body;
    console.log(req.body.otp);

    const user = await AdminModel.findOne({ otp: req.body.otp });
    console.log("****+++++++", user);
    if (user == null) {
      return res.status(404).json({
        status: "404",
        message: "enter valid otp",
      });
    } else {
      if (req.body.newpassword != req.body.confrompassword) {
        return res.status(404).json({
          status: "404",
          message: "password and conform password not matched",
        });
      } else {
        const pass = req.body.newpassword;
        console.log(pass);

        const hash = bcrypt.hashSync(pass, 10);
        console.log("++++", hash);
        const update = await AdminModel.findByIdAndUpdate(
          user._id,
          {
            password: hash,
            otp: null,
          },

          {
            new: true,
          }
        );
        console.log(".....", update);
        return res.status(200).json({
          status: 200,
          message: "sucess",
          newdata: [update],
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

module.exports = {
  createUser,
  login,
  updatePassword,
  getAdminData,
  getadmin,
  forgetPassword,
  resetPassword,
};
