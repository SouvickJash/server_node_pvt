const express=require('express');
const { createTeacher, getTreacher, getInformation, DeleteInformation, EditInformation, UpdateInformation, searchApi,  } = require('../Controllers/teacherController');
const router=express.Router();

router.post('/createteacher',createTeacher);
router.get('/getteacher',getTreacher);
router.get('/search/:name',searchApi);
router.get('/getcount',getInformation);
router.get('/edit/:id',EditInformation);
router.put('/update/:id',UpdateInformation);
router.delete('/delete/:id',DeleteInformation);


module.exports=router