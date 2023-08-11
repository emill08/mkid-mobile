const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get("/products", Controller.fetchProducts);
router.post("/products", Controller.addProduct);
router.delete("/products/:id", Controller.delProduct);
router.put("/products/:id", Controller.editProduct);
router.get("/categories", Controller.fetchCategories);
router.get("/products/:id", Controller.getOneProduct);
router.get("/categories/:id", Controller.getOneCategory);

module.exports = router;
