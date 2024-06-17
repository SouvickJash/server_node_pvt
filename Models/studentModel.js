const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    student_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    stream: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const studentModel = mongoose.model("student_table",studentSchema);
module.exports = studentModel;
