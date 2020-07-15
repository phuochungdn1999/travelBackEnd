const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require("dotenv/config");
app.use(bodyParser.json());
const port = 3500;

//import routes
const userRoute = require("./routes/users");
const placeRoute = require("./routes/places");
const hotelRoute = require("./routes/hotels");
const foodRoute= require("./routes/foods");
//use route
app.use("/users", userRoute);
app.use("/places", placeRoute);
app.use("/hotels", hotelRoute);
app.use("/foods",foodRoute);
//connect MongoDB
mongoose.set("useCreateIndex", true);
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
