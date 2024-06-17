const express=require('express');
const { createStudent, getStudent, editStudent, updateStudent, deleteStudent, getCount } = require('../Controllers/studentController');
const router=express.Router();

router.post('/createstudent',createStudent);
router.get('/getstudent',getStudent);
router.get('/getcountstudent',getCount);
router.get('/editstudent/:id',editStudent);
router.put('/updatestudent/:id',updateStudent);
router.delete('/deletestudent/:id',deleteStudent);

module.exports=router