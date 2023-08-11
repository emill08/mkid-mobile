"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.hasMany(models.Image, { foreignKey: "ProductId" });
    }
  }
  Product.init(
    {
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Category already exists",
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product name cannot be empty!",
          },
          notEmpty: {
            msg: "Product name cannot be empty!",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product description cannot be empty!",
          },
          notEmpty: {
            msg: "Product description cannot be empty!",
          },
        },
      },
      mainImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image url cannot be empty!",
          },
          notEmpty: {
            msg: "Image url cannot be empty!",
          },
        },
      },
      userMongoId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User's Mongo ID cannot be empty!",
          },
          notEmpty: {
            msg: "User's Mongo ID cannot be empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
