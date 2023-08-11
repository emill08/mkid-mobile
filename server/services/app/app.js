const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const cors = require("cors");
const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
