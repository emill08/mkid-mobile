const express = require("express");
const { connectMongo } = require("./config/mongoConnect");
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const router = require("./routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", router);

connectMongo()
  .then(() => {
    app.listen(port, () => {
      console.log(`User App Running on PORT ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
