const { MongoClient } = require("mongodb");
require("dotenv").config();
// const uri = "mongodb+srv://emiliahanida:4ePchBj7ItOMJyoP@cluster0.b0gtzq0.mongodb.net/?retryWrites=true&w=majority";

const uri = process.env.MONGO_CONNECTION;

const client = new MongoClient(uri);
let db;

async function connectMongo() {
  try {
    db = client.db("mkidDB");
    return db;
  } catch (err) {
    console.log(err);
  }
}

function getDB() {
  return db;
}

module.exports = { getDB, connectMongo };
