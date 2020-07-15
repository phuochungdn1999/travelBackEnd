const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");

//get all
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.json({ message: err });
  }
});
//get by id
router.get("/:placeId", async (req, res) => {
  try {
    const hotel = await Hotel.findOne(req.params.PlaceID);
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
