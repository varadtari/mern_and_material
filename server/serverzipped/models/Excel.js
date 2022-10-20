const mongoose = require("mongoose");

const ExcelSchema = new mongoose.Schema({
  SLNO:Number,
  DOJ:String,
  EMPCODE:Number,
  EMPLOYEENAME:String,
  FATHERNAME:String,
  EDUCATION:String,
  DEPT:String,
  CONTRACTOR:String

});

const ExcelModel = mongoose.model("excel", ExcelSchema);

module.exports = ExcelModel;
