const router = require("express").Router();
const User = require("../models/User");
// const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const hashPass = await bcrypt.hash(req.body.password, 10)
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPass
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // console.log(user);

    if(!user){ res.status(401).json("Wrong credentials!")};


    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if(!isMatch){
      res.status(401).json("Wrong credentials!");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

    console.log(user._doc);
    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
