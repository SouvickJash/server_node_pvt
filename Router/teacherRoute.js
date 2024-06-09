const express=require('express');
const { createTeacher, getTreacher, getInformation } = require('../Controllers/teacherController');
const router=express.Router();

router.post('/create',createTeacher);
router.get('/getteacher',getTreacher);
router.get('/getcount',getInformation);


module.exports=router