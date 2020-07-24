const express = require("express");
const router = express.Router();
const Food = require("../models/food");
const auth = require("../middleware/auth");

//token gồm Bearer + token (sau Bearer có dấu cách)
//get all by page
router.get("/", async (req, res,next) => {
  try {
    const perPage = parseInt(req.query.limit || 10)
    const page = parseInt(req.query.page || 1)
    Food.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, food) {
        Food.count().exec(function(err, count) {
            if (err) return next(err);
            res.status = 200;
            res.send({
                food: food,
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
    const food = await Food.find({PlaceID: req.params.placeId});
    res.json(food);
  } catch (err) {
    res.json({ message: err });
  }
});
//get by food id
router.get("/id/:foodId", async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    res.json(food);
  } catch (err) {
    res.json({ message: err });
  }
});
// create only by admin
router.post("/", auth,async (req, res) => {
  console.log(req.user);
  console.log("admin",req.user.isAdmin);
  if(req.user.isAdmin === true){
  console.log(req.body);
  const food = new Food({
    Name: req.body.Name,
    PlaceID: req.body.PlaceID,
    Place: req.body.Place,
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
}else{
  res.status(400).send({message:"Only admin is permitted"});
}
});
//delete
router.delete("/:foodId", auth,async (req, res) => {
  if(req.user.isAdmin === true){
  try {
    const removedfood = await Food.remove({ _id: req.params.foodId });
    res.json(removedfood);
  } catch (err) {
    res.json({ messgae: err });
  }}else{
    res.status(400).send({message:"Only admin is permitted"});
  }
});
//update by id
router.patch("/:foodId", async (req, res) => {
  if(req.user.isAdmin === true||req.user.isMod === true){
  try {
    const updatedFood = await Food.updateOne(
      { _id: req.params.foodId },
      {
        $set: {
          Name: req.body.Name,
          PlaceID: req.body.PlaceID,
          Place: req.body.Place,
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
  }}else{
    res.status(400).send({message:"Only admin and mod is permitted"});
  }
});

module.exports = router;
