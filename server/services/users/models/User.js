const { hashPassword } = require("../helpers/bcrypt");
const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnect");

class User {
  static userCollection() {
    return getDB().collection("Users");
  }
  static async findAll() {
    const userCollection = this.userCollection();
    return await userCollection.find().toArray();
  }
  static async findByPk(id) {
    const userCollection = this.userCollection();
    return await userCollection.findOne({
      _id: new ObjectId(id),
    });
  }
  static async create({ email, password, address, phoneNumber, role }) {
    const userCollection = this.userCollection();
    // console.log("sssssssss");
    const result = await userCollection.insertOne({
      email,
      password: hashPassword(password),
      address,
      phoneNumber,
      role,
    });
    console.log(result);
    return await userCollection.findOne({
      _id: new ObjectId(result.insertedId),
    });
  }
  static async destroy(id) {
    const userCollection = this.userCollection();
    return await userCollection.deleteOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = User;
