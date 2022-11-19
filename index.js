//express
const express=require("express");
const app=express();
const path=require("node:path");


//cors
const cors = require("cors");

//.env file
require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;

//middlewares
app.use(express.json()); 
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

//videos router
const videosRouter=require("./routes/videos");
app.use("/videos", videosRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});