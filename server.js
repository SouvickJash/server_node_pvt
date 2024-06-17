const express=require('express');
const cors = require("cors");
require("dotenv").config();
const DataBase=require('./Database/db')

const port = process.env.SERVER_PORT || 3002;
const app = express();
app.use(express.json());
//image
app.use("/Uploads", express.static("Uploads"));
//admin route
const adminRouter=require('./Router/adminRoute')
app.use('/admin',adminRouter)

//teacher route
const teacherRouter=require('./Router/teacherRoute')
app.use(teacherRouter);  

//student route
const studnetRouter=require('./Router/studentRoute');
app.use(studnetRouter)
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"], // Allow only specific headers
    })
  );
  
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });


  //routes
//   app.use("/admin", adminRoute);