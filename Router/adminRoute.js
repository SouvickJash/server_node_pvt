const express=require('express');
const { createUser, login, updatePassword, getAdminData, forgetPassword, resetPassword, getadmin } = require('../Controllers/admin');
const upload=require('../Utility/AdminImage')
const router=express.Router();

//create
router.post('/create',upload.single('image'),createUser);
router.post('/login',login);
router.post('/updatepass',updatePassword);
router.get('/getdata',getadmin);
router.get('/getdata/:id',getAdminData);
router.post('/forgetpassword',forgetPassword);
router.post('/resetpassword',resetPassword);

module.exports=router