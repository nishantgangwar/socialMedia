const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6, maxLength: 14 },
  year: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  rollno: { type: Number, required: true },
});

module.exports  = mongoose.model('Form', formSchema);