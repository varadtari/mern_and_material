import React, { useState } from "react";
import "./App.css";
import MaterialTable from "material-table";
import XLSX from "xlsx";
import Axios from 'axios' 


const EXTENSIONS = ["xlsx", "xls", "csv"];
function App() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  let fileData;
  let finalData;

  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };
 

  const importExcel = (e) => {
    const file = e.target.files[0];
    console.log("file1",file);
    const reader = new FileReader();
    console.log("file2",reader);
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
    
      const workBook = XLSX.read(bstr, { type: "binary" });
      console.log("data 1", workBook);
        var x=0;
      //get first sheet
      const sheet_namelist = workBook.SheetNames;
      
      //convert to array
      //console.log("data 2", workSheet);
      fileData = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_namelist[x]], { header: 1, raw: false });
      console.log("data 3", fileData);
      // console.log(fileData)
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);
      console.log("data 4", headers);

      //removing header
      fileData.splice(0, 1);
      finalData=convertToJson(headers, fileData);
      setData(finalData);
      
      console.log("data 5",fileData)
      //adding to database...
        //alert("varad boi");
       // console.log("data",fileData);
        
      
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };
  const importToDatabase = (e) => {
    Axios.post('http://localhost:3001/insert',{fileData : finalData}).then(()=>{
      alert("success...");
      console.log("data",fileData);
    }).catch(()=>{
      alert("sorry ");
    })

  };

  return (
    <div className="App">
      <h1 align="center"></h1>
      <h4 align="center"></h4>
      <input type="file" onChange={importExcel} />
      <button onClick={importToDatabase}>Submit</button>
      
      
      <MaterialTable title="" data={data} columns={colDefs} 
      editable={{
        onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
             setData([...data,newRow])
             console.log("data after row add",...data);   
             setTimeout(()=>resolve(),500)
        }),
        onRowUpdate:(newData,oldData)=>new Promise((resolve,reject)=>{
          const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    console.log("updated data",newData);
                    setData([...dataUpdate]);
                    console.log("full updated data",dataUpdate);
          
          setTimeout(()=>resolve(),500)
     }),
     onRowDelete: oldData =>
     new Promise((resolve, reject) => {
         setTimeout(() => {
             const dataDelete = [...data];
             const index = oldData.tableData.id;
             dataDelete.splice(index, 1);
             setData([...dataDelete]);
             console.log("datadeleted",dataDelete);
             
             console.log("final updated data",data);
             resolve();
         }, 500);
         
     })
    
      }}
      
      
      options={{ pageSizeOptions: [3,5,10,20,50], exportButton: true, exportAllData: true ,actionsColumnIndex:-1,addRowPosition:"first",paginationType:"stepped",paginationPosition:"top",sorting:true,grouping:true,exportFileName:"{parts}"}} />
    </div>
    
    
  );
}

export default App;