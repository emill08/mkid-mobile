const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.findAll);
router.post("/", Controller.createUser);
router.get("/:id", Controller.findOneUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
