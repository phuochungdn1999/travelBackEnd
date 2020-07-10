const express = require("express");
const router = express.Router();
const User = require("../models/user");

//get all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});
//get by id
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});
// create
router.post("/", async (req, res) => {
  console.log(req.body);
  const user = new User({
    Name: req.body.Name,
    Username: req.body.Username,
    Password: req.body.Password,
    Created_Date: req.body.Created_Date,
    Type_User: req.body.Type_User,
    Status_User: req.body.Status_User,
  });
  try {
    const saveuser = await user.save();
    res.json(saveuser);
  } catch (err) {
    res.json({ message: err });
  }
});
//delete
router.delete("/:userId", async (req, res) => {
  try {
    const removeduser = await User.remove({ _id: req.params.userId });
    res.json(removeduser);
  } catch (err) {
    res.json({ messgae: err });
  }
});
//update by id
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          Name: req.body.Name,
          Password: req.body.Password,
          Created_Date: req.body.Created_Date,
          Type_User: req.body.Type_User,
          Status_User: req.body.Status_User,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ messgae: err });
  }
});

module.exports = router;
