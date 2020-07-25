const express = require("express");
const router = express.Router();
const Hotplace = require("../models/hotplace");
const auth = require("../middleware/auth");
//token gồm Bearer + token (sau Bearer có dấu cách)
//get all
router.get("/", async (req, res) => {
  try {
    const perPage = parseInt(req.query.limit || 10)
    const page = parseInt(req.query.page || 1)
    Hotplace.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, hotplace) {
        Hotplace.count().exec(function(err, count) {
            if (err) return next(err);
            res.status = 200;
            res.send({
                hotplaces: hotplace,
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
    const hotplace = await Hotplace.find({PlaceID : req.params.placeId});
    res.json(hotplace);
  } catch (err) {
    res.json({ message: err });
  }
});
// get by id hotplace
router.get("/id/:hotplaceId", async (req, res) => {
  try {
    const hotplace = await Hotplace.findById(req.params.hotplaceId);
    res.json(hotplace);
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
    console.log(req.body);
    const hotplace = new Hotplace({
      Name: req.body.Name,
      PlaceID: req.body.PlaceID,
      Place: req.body.Place,
      Star_Rating: req.body.Star_Rating,
      Description: req.body.Description,
      URL_Image: req.body.URL_Image
    });
    try {
      const savehotplace = await hotplace.save();
      res.json({message:"Create hotplace success",savehotplace});
    } catch (err) {
      res.json({ message: err });
    }
  }else{
    res.status(400).send({message:"Only admin and mod is permitted"});
  }
  
});
//delete only admin and mod
router.delete("/:hotplaceId", auth, async (req, res) => {
  if(req.user.isAdmin === true||req.user.isMod === true){
    try {
      const removedhotplace = await Hotplace.remove({ _id: req.params.hotplaceId });
      res.json({message:"Delete hotplace success", removedhotplace});
    } catch (err) {
      res.json({ messgae: err });
    }
  }else{
    res.status(400).send({message:"Only admin and mod is permitted"});
  }
  
});
//update by id only admin and mod
router.put("/:hotplaceId",auth, async (req, res) => {  // them auth sau "/:hotplaceId", auth, async nhá
  if(req.user.isAdmin === true||req.user.isMod === true){
    try {
      const updatedHotplace = await Hotplace.updateOne(
        { _id: req.params.hotplaceId },
        {
          $set: {
            Name: req.body.Name,
            PlaceID: req.body.PlaceID,
            Place: req.body.Place,
            Star_Rating: req.body.Star_Rating,
            Description: req.body.Description,
            URL_Image: req.body.URL_Image
          },
        }
      );
      res.json({message:"Update hotplace success", updatedHotplace});
    } catch (err) {
      res.json({ messgae: err });
    }
  }else{
    res.status(400).send({message:"Only admin and mod is permitted"});
  }
  
});

module.exports = router;
