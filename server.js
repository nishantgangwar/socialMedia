const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const expressValidator = require("express-validator")
dotenv.config();
const fs = require('fs')
const cors = require('cors')

//debugger
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Db Connection established"))
  .catch((e) => console.log(e));

// Route

const postRoutes = require("./routes/post");
const formRoutes = require("./routes/form");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// apiDocs
app.get('/', (req,res) => {
  fs.readFile('docs/apiDocs.json', (err,data) => {
    if(err) {
      res.status(400).json({error: err})
    }
    const docs = JSON.parse(data);
    res.json(docs);
  })
})


// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(expressValidator());
app.use('cors')
app.use(function(err, req, res, next){
  if(err.name === 'Unauthorized Error'){
    res.status(401).json({error:'Unauthorized'})
  }
  
})


app.use("/", postRoutes);
app.use("/",formRoutes)
app.use('/',authRoutes);
app.use('/',userRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(` A Node Js Api is running on the Port ${port}`);
});
