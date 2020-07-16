const express = require("express");
const router = express.Router();
const Place = require("../models/place");

//get all
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.json({ message: err });
  }
});
//get by id
router.get("/:placeId", async (req, res) => {
  try {
    const place = await Place.findOne(req.params._id);
    res.json(place);
  } catch (err) {
    res.json({ message: err });
  }
});
// create
router.post("/", async (req, res) => {
  console.log(req.body);
  const place = new Place({
    PlaceID: req.body.PlaceID,
    Name: req.body.Name,
    Country: req.body.Country,
    URL_Image: req.body.URL_Image,
    Description: req.body.Description,
  });
  try {
    const saveplace = await place.save();
    res.json(saveplace);
  } catch (err) {
    res.json({ message: err });
  }
});
//delete
router.delete("/:placeId", async (req, res) => {
  try {
    const removedplace = await Place.remove({ PlaceID: req.params.placeId });
    res.json(removedplace);
  } catch (err) {
    res.json({ messgae: err });
  }
});
//update by id
router.patch("/:_id", async (req, res) => {
  try {
    const updatedPlace = await Place.updateOne(
      { _id: req.params._id },
      {
        $set: {
          Name: req.body.Name,
          Country: req.body.Country,
          URL_Image: req.body.URL_Image,
          Description: req.body.Description
        },
      }
    );
    res.json(updatedPlace);
  } catch (err) {
    res.json({ messgae: err });
  }
});

module.exports = router;
