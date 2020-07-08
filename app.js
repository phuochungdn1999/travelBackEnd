const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const app = express();
require("dotenv/config");
const port = 3000;

app.use(bodyParser.json());
//import routes
const postRoute= require("./routes/posts");

app.use('/posts',postRoute);

app.get("/", (req, res) => res.send("Hello Ma Fren!"));

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected DB")
);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
