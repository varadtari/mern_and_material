const express = require("express");
const app = express();
const cors=require("cors");
const mongoose = require("mongoose");
const ExcelModel = require("./models/Excel");


app.use(cors());
app.use(express.json());
/// DATABASE CONNECTION
mongoose.connect(
  "mongodb://localhost:27017/ExcelDb?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true }
);

app.post("/insert", async (req, res) => {
  //app.use(bodyParser.urlencoded({extended:false}));
  const fileData=req.body.fileData; 
 // fileData=XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
  try {
    //const Excel=new ExcelModel({fileData:fileData});
  ExcelModel.insertMany(fileData,(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})
  
  res.send("Inserted DATA");
  } catch (error) {
    res.send(error);
  }

  
});



app.listen(3001, () => {
  console.log("You are connected!");
});
