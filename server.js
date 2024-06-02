const express=require('express');
const cors = require("cors");
require("dotenv").config();
const DataBase=require('./Database/db')

const port = process.env.SERVER_PORT || 3002;
const app = express();
app.use(express.json());
const adminRouter=require('./Router/adminRoute')
app.use('/admin',adminRouter)
// app.use(
//     cors({
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       allowedHeaders: ["Content-Type", "Authorization"], // Allow only specific headers
//     })
//   );
  
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });


  //routes
//   app.use("/admin", adminRoute);