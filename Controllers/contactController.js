const contactModel=require('../Models/contactModel')

const addContact = async (req, res) => {
    try {
      const contact = new contactModel(req.body);
      const result = await contact.save();
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
const getContact = async (req, res) => {
    try {
      const getDetails = await contactModel.find().sort({ createdAt: -1 });
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


module.exports={
    addContact,
    getContact
}