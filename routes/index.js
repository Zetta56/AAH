const express = require("express"),
      router = express.Router(),
      jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const token = jwt.sign({username: req.body.username}, process.env.JWT_SECRET);
  res.json({token: token});
})

router.post("/authenticate", (req, res) => {
  try {
    const payload = jwt.verify(req.body.token, process.env.JWT_SECRET);
    res.json({verified: true, ...payload});
  } catch(err) {
    res.json({verified: false});
  }
})

module.exports = router;