const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");
const auth = require("../middleware/auth");

//get all
router.get("/", async (req, res) => {
  try {
    const perPage = parseInt(req.query.limit || 10)
    const page = parseInt(req.query.page || 1)
    Hotel.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, hotel) {
        Hotel.count().exec(function(err, count) {
            if (err) return next(err);
            res.status = 200;
            res.send({
                hotels: hotel,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        })
    })
  } catch (err) {
    res.json({ message: err });
  }
});
//get by id place
router.get("/:placeId", async (req, res) => {
  try {
    const hotel = await Hotel.find({PlaceID : req.params.placeId});
    res.json(hotel);
  } catch (err) {
    res.json({ message: err });
  }
});
// get by id hotel
router.get("/:_id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params._id);
    res.json(hotel);
  } catch (err) {
    res.json({ message: err });
  }
});
// create
//only created by admin or mod
router.post("/", auth,async (req, res) => {
  console.log(req.user);
  console.log("admin",req.user.isAdmin);
  if(req.user.isAdmin === true||req.user.isMod === true){
    //console.log(req.body);
    const hotel = new Hotel({
      Name: req.body.Name,
      PlaceID: req.body.PlaceID,
      Place: req.body.Place,
      Star: req.body.Star,
      Price: req.body.Price,
      Star_Rating: req.body.Star_Rating,
      Description: req.body.Description,
      URL_Image: req.body.URL_Image
    });
    try {
      const savehotel = await hotel.save();
      res.json(savehotel);
    } catch (err) {
      res.json({ message: err });
    }
  }else{
    res.status(400).send({message:"Only admin and mod is permitted"});
  }
  
});
//delete only admin and mod
router.delete("/:hotelId", auth, async (req, res) => {
  if(req.user.isAdmin === true||req.user.isMod === true){
    try {
      const removedhotel = await Hotel.remove({ _id: req.params.hotelId });
      res.json(removedhotel);
    } catch (err) {
      res.json({ messgae: err });
    }
  }else{
    res.status(400).send({message:"Only admin and mod is permitted"});
  }
  
});
//update by id only admin and mod
router.patch("/:hotelId", auth, async (req, res) => {
  if(req.user.isAdmin === true||req.user.isMod === true){
    try {
      const updatedHotel = await Hotel.updateOne(
        { _id: req.params.hotelId },
        {
          $set: {
            Name: req.body.Name,
            PlaceID: req.body.PlaceID,
            Place: req.body.Place,
            Star: req.body.Star,
            Price: req.body.Price,
            Star_Rating: req.body.Star_Rating,
            Description: req.body.Description,
            URL_Image: req.body.URL_Image
          },
        }
      );
      res.json(updatedHotel);
    } catch (err) {
      res.json({ messgae: err });
    }
  }else{
    res.status(400).send({message:"Only admin and mod is permitted"});
  }
  
});

module.exports = router;
