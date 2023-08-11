const router = require("express").Router();
const admin = require("./admin");

router.use("/", admin);

module.exports = router;
