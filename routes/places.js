const express = require("express");
const router = express.Router();
const Place = require("../models/place");

//get all
router.get("/", async (req, res) => {
  try {
    const perPage = parseInt(req.query.limit || 10)
    const page = parseInt(req.query.page || 1)
    Place.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, place) {
        Place.count().exec(function(err, count) {
            if (err) return next(err);
            res.status = 200;
            res.send({
                places: place,
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
router.get("/:_id", async (req, res) => {
  try {
    console.log(req.params._id)
    const place = await Place.findById(req.params._id)
    res.json(place);
  } catch (err) {
    res.json({ message: err });
  }
});
// create
router.post("/", async (req, res) => {
  console.log(req.body);
  const place = new Place({
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
router.delete("/:_id", async (req, res) => {
  try {
    const removedplace = await Place.findByIdAndRemove(req.params._id)
    res.json(removedplace);
  } catch (err) {
    res.json({ message: err });
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
