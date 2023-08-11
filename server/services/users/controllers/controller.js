const User = require("../models/User");

class Controller {
  static async findAll(req, res, next) {
    try {
      let users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ name: "Internal Server Error" });
    }
  }
  static async findOneUser(req, res, next) {
    try {
      const user = User.findByPk(req.params.userId);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ name: "Internal Server Error" });
    }
  }
  static async createUser(req, res, next) {
    try {
      const { email, password, address, phoneNumber } = req.body;
      const user = await User.create({
        email,
        password,
        address,
        phoneNumber,
        role: "Admin",
      });
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ name: "Internal Server Error" });
    }
  }
  static async findOneUser(req, res, next) {
    try {
      const { id } = req.params;
      let users = await User.findByPk(id);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ name: "Internal Server Error" });
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await User.destroy(id);
      res.status(200).json({ msg: `user deleted` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ name: "Internal Server Error" });
    }
  }
}

module.exports = Controller;
