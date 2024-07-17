const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const contactModel = mongoose.model("contact", contactSchema);
module.exports = contactModel;
