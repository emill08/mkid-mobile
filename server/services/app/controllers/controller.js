const { Category, Image, Product } = require("../models/index");
const { sequelize } = require("../models");

class Controller {
  static async fetchCategories(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async fetchProducts(req, res, next) {
    try {
      const data = await Product.findAll({
        include: [
          { model: Category, attributes: ["name"] },
          { model: Image, attributes: ["imageUrl"] },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getOneProduct(req, res, next) {
    try {
      const productId = req.params.id;
      console.log(productId, "ini product id");
      const data = await Product.findByPk(productId, {
        include: [
          { model: Category, attributes: ["name"] },
          { model: Image, attributes: ["imageUrl"] },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getOneCategory(req, res, next) {
    try {
      const categoryId = req.params.id;
      console.log(categoryId, "ini product id");
      const data = await Category.findByPk(categoryId);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let {
        CategoryId,
        name,
        price,
        description,
        mainImage,
        userMongoId,
        images,
      } = req.body;

      let errors = [];
      if (!CategoryId) {
        errors.push({ message: "Category cannot be empty!" });
      }
      if (!images) {
        errors.push({ message: "Images cannot be empty!" });
      }
      if (errors.length) {
        throw { name: "SequelizeValidationError", errors: errors };
      }
      let created = await Product.create(
        {
          CategoryId,
          name,
          price,
          description,
          mainImage,
          userMongoId,
          images,
        },
        { transaction: t }
      );
      console.log("ini");
      images = images.map((el) => {
        return {
          ProductId: created.id,
          imageUrl: el,
        };
      });
      await Image.bulkCreate(images, { transaction: t });
      await t.commit();
      res.status(201).json({ message: "OK" });
    } catch (err) {
      console.log(err);
      await t.rollback();
      if (err.name == "SequelizeValidationError") {
        res.status(400).json({ message: "Bad Request", errors: err.errors });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async delProduct(req, res, next) {
    try {
      const { id } = req.params;
      await Image.destroy({ where: { ProductId: id } });
      await Product.destroy({ where: { id } });
      res.status(200).json({ message: "Product has been deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      let { CategoryId, name, price, description } = req.body;
      console.log(req.body);

      await Product.update(
        { CategoryId, name, price, description },
        { where: { id } }
      );
      console.log("masukkk");
      res.status(201).json({ message: `Product has been updated` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
