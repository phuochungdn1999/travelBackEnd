const express = require("express");
const router = express.Router();
const Food = require("../models/food");

//get all
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.json({ message: err });
  }
});
//get by id
router.get("/:placeId", async (req, res) => {
  try {
    const food = await Food.find({PlaceID: req.params.placeId});
    res.json(food);
  } catch (err) {
    res.json({ message: err });
  }
});
// create
router.post("/", async (req, res) => {
  console.log(req.body);
  const food = new Food({
    Name: req.body.Name,
    PlaceID: req.body.PlaceID,
    Description: req.body.Description,
    Price: req.body.Price,
    Star_Rating: req.body.Star_Rating,
    URL_Image: req.body.URL_Image,
  });
  try {
    const savefood = await food.save();
    res.json(savefood);
  } catch (err) {
    res.json({ message: err });
  }
});
//delete
router.delete("/:foodId", async (req, res) => {
  try {
    const removedfood = await Food.remove({ _id: req.params.foodId });
    res.json(removedfood);
  } catch (err) {
    res.json({ messgae: err });
  }
});
//update by id
router.patch("/:foodId", async (req, res) => {
  try {
    const updatedFood = await Food.updateOne(
      { _id: req.params.foodId },
      {
        $set: {
          Name: req.body.Name,
          PlaceID: req.body.PlaceID,
          Description: req.body.Description,
          Price: req.body.Price,
          Star_Rating: req.body.Star_Rating,
          URL_Image: req.body.URL_Image,
        },
      }
    );
    res.json(updatedFood);
  } catch (err) {
    res.json({ messgae: err });
  }
});

module.exports = router;
