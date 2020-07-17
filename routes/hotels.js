const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");

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
//get by id
router.get("/:placeId", async (req, res) => {
  try {
    const hotel = await Hotel.find({PlaceID: req.params.placeId});
    res.json(hotel);
  } catch (err) {
    res.json({ message: err });
  }
});
// create
router.post("/", async (req, res) => {
  console.log(req.body);
  const hotel = new Hotel({
    Name: req.body.Name,
    PlaceID: req.body.PlaceID,
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
});
//delete
router.delete("/:hotelId", async (req, res) => {
  try {
    const removedhotel = await Hotel.remove({ _id: req.params.hotelId });
    res.json(removedhotel);
  } catch (err) {
    res.json({ messgae: err });
  }
});
//update by id
router.patch("/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await Hotel.updateOne(
      { _id: req.params.hotelId },
      {
        $set: {
          Name: req.body.Name,
          PlaceID: req.body.PlaceID,
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
});

module.exports = router;
