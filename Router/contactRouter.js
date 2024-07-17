const express=require('express');
const { addContact, getContact } = require('../Controllers/contactController');
const router=express.Router();

//create
router.post('/addContact',addContact);
router.get('/getContact',getContact);


module.exports=router