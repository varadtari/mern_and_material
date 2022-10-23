const mongoose = require("mongoose");

const ExcelSchema = new mongoose.Schema({
  SLNO: {
    type: Number,
   // required: true,
    unique: true,
},
DOJ: {
  type: String,
  //required: true,
},
EMPCODE: {
    type: Number,
    //required: true,
    unique:true,
},
EMPLOYEENAME: {
  type: String,
  //required: true,
},

FATHERNAME: {
  type: String,
  //required: true,
},
EDUCATION: {
  type: String,
  //required: true,
},
DEPT: {
  type: String,
 // required: true,
},
CONTRACTOR: {
  type: String,
  //required: true,
},
});

const ExcelModel = mongoose.model("excel", ExcelSchema);

module.exports = ExcelModel;
