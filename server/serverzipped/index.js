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
  app.use(bodyParser.urlencoded({extended:false}));
  const fileData=req.body.fileData;

  const Excel = new ExcelModel({ fileData:fileData});
  sheet_namelist.forEach(element => {
    fileData = XLSX.utils.csv_to_json(workbook.Sheets[sheet_namelist[x]]);
   ExcelModel.insertMany(fileData,(err,data)=>{
       if(err){
           console.log(err);
       }else{
           console.log(data);
       }
   })
   x++;
});
  await Excel.save();
  res.send("Inserted DATA");
});

app.get("/read", async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("You are connected!");
});
