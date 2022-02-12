const router = require("express").Router();


// GET homepage
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


module.exports = router;
