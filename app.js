const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require("dotenv/config");
app.use(bodyParser.json());
const port = 3500;

//import routes
const userRoute = require("./routes/user");
const placeRoute = require("./routes/places");
const hotelRoute = require("./routes/hotels");
const foodRoute= require("./routes/foods");
const searchplace= require("./routes/searchplace");
//use route
app.use(userRoute);
app.use("/places", placeRoute);
app.use("/hotels", hotelRoute);
app.use("/foods",foodRoute);
app.use("/search",searchplace);
//connect MongoDB
mongoose.set("useCreateIndex", true);
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  },
  () => console.log("Connected DB")
);

// app.listen(port, () =>
//   console.log(`App listening at http://localhost:${port}`)
  
// );
app.listen(process.env.PORT || 3500, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
}); //deploy