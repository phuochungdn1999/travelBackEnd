const express = require("express");
const router = express.Router();
const Place = require("../models/place");
const auth = require("../middleware/auth");

//token gồm Bearer + token (sau Bearer có dấu cách) get all
router.get("/", async (req, res) => {
    try {
        const perPage = parseInt(req.query.limit || 10)
        const page = parseInt(req.query.page || 1)
        Place
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, place) {
                Place
                    .count()
                    .exec(function (err, count) {
                        if (err) 
                            return next(err);
                        res.status = 200;
                        res.send({
                            places: place,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    })
            })
    } catch (err) {
        res.json({message: err});
    }
});

//get by id
router.get("/:_id", async (req, res) => {
    try {
        console.log(req.params._id)
        const place = await Place.findById(req.params._id)
        res.json(place);
    } catch (err) {
        res.json({message: err});
    }
});
// create only by admin
router.post("/", auth, async (req, res) => {
    console.log(req.user);
    console.log("admin", req.user.isAdmin);
    if (req.user.isAdmin === true ) {
        console.log(req.body);
        const place = new Place(
            {Name: req.body.Name, Country: req.body.Country, URL_Image: req.body.URL_Image, Description: req.body.Description}
        );
        try {
            const saveplace = await place.save();
            res.json(saveplace);
        } catch (err) {
            res.json({message: err});
        }
    } else {
        res
            .status(400)
            .send({message: "Only admin is permitted"});
    }
});
//delete only by admin
router.delete("/:_id", auth, async (req, res) => {
    if (req.user.isAdmin === true ) {
        try {
            const removedplace = await Place.findByIdAndRemove(req.params._id)
            res.json(removedplace);
        } catch (err) {
            res.json({message: err});
        }
    } else {
        res
            .status(400)
            .send({message: "Only admin is permitted"});
    }
});
<<<<<<< HEAD
//update by id
router.put("/:_id", async (req, res) => {
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
=======
//update by id by admin and mod
router.patch("/:_id", auth, async (req, res) => {
    if (req.user.isAdmin === true || req.user.isMod === true) {
        try {
            const updatedPlace = await Place.updateOne({
                _id: req.params._id
            }, {
                $set: {
                    Name: req.body.Name,
                    Country: req.body.Country,
                    URL_Image: req.body.URL_Image,
                    Description: req.body.Description
                }
            });
            res.json(updatedPlace);
        } catch (err) {
            res.json({messgae: err});
        }
    } else {
        res
            .status(400)
            .send({message: "Only admin and mod is permitted"});
    }
>>>>>>> d9e85fd91d7821cb3627d11b00e458dd12679418
});

module.exports = router;
