const express = require("express");
const router = express.Router();
const Place = require("../models/place");
//token gồm Bearer + token (sau Bearer có dấu cách)
router.get("/:nameplace", function (req, res, next) {
  var q = req.params.nameplace;
// search full
  //   try {
  //     Place.find(
  //       {
  //         $text: {
  //           $search: q,
  //         },
  //       },
  //       {
  //         _id: 0,
  //         __v: 0,
  //       },
  //       function (err, place) {
  //         res.json(place);
  //       }
  //     );
  //   } catch (err) {
  //     res.json({ message: err });
  //   }

  // search partial
  try {
    Place.find(
      {
        Name: {
          $regex: new RegExp(q),
        },
      },
      {
        _id: 0,
        __v: 0,
      },
      function (err, place) {
        res.json(place);
      }
    ).limit(10);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
