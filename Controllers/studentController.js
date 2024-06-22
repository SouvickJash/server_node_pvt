const StudentModel = require("../Models/studentModel");

//create student
const createStudent = async (req, res) => {
  try {
    const student = new StudentModel(req.body);
    const result = await student.save();
    return res.status(201).json({
      status: 201,
      message: "Data created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//get student
const getStudent = async (req, res) => {
  try {
    const getDetails = await StudentModel.find().sort({ createdAt: -1 });
    // const getDetails = await StudentModel.find({"age": { $gt: 50}});
    return res.status(200).json({
      status: 200,
      message: "Data fetch successfully",
      data: getDetails
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//get length
const getCount = async (req, res) => {
  try {
    const getDetails = await StudentModel.find();
    // console.log(getStudent.length)
    return res.status(200).json({
      status: 200,
      message: "Data fetch successfully",
      totalStudent: getDetails.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//edit
const editStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const editDetails = await StudentModel.findById(id);
    return res.status(200).json({
      status: 200,
      message: "Data edited successfully",
      data: editDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//update
const updateStudent = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const updateDetails = await StudentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(201).json({
      status: 201,
      message: "Data update successfully",
      data: updateDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

//delete
const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDetails = await StudentModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: 200,
      message: "Data deleted successfully",
      data: deleteDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

module.exports = {
  createStudent,
  getStudent,
  editStudent,
  updateStudent,
  deleteStudent,
  getCount,
};
