const express=require('express');
const { createUser, login, updatePassword, getAdminData } = require('../Controllers/admin');
const router=express.Router();

//create
router.post('/create',createUser);
router.post('/login',login);
router.post('/updatepass',updatePassword);
router.get('/getdata/:id',getAdminData);

module.exports=router