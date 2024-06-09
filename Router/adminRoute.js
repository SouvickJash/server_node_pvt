const express=require('express');
const { createUser, login, updatePassword, getAdminData, forgetPassword, resetPassword } = require('../Controllers/admin');
const router=express.Router();

//create
router.post('/create',createUser);
router.post('/login',login);
router.post('/updatepass',updatePassword);
router.get('/getdata/:id',getAdminData);
router.post('/forgetpassword',forgetPassword);
router.post('/resetpassword',resetPassword);

module.exports=router