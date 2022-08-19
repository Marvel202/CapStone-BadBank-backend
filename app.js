import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Bank from "./models/Bank.js";

const app = express();
const mongoUrl = process.env.MONGO_STRING;
const corsOptions = {
  origin: [
    "http://localhost:3000",
    // 'process.env.PORT'
  ],
};
mongoose
  .connect(mongoUrl)
  .then((x) => {
    console.log(
      `connected to Mongo! Database name: ${x.connection.collections} `
    );
  })
  .catch((err) => console.log(err));

//use to serve static files from public directory
// app.use(express.static("/"));
app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//create user account

app.post("/account/create", async (req, res) => {
  console.log("req.body", req.body);
  const { firebaseId, username, email, balance } = req.body;
  const account = {
    firebaseId,
    username,
    email,
    balance: 0,
  };
  try {
    const createAccount = await Bank.create(account);
    res.status(201).json(createAccount);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

// login user
app.get("/account/login", async (req, res) => {
  console.log("get req.body", req.body);
  try {
    // const account = await Bank.find({
    //   firebaseId: req.firebaseUser.uid,
    // });
    const { firebaseId, email } = req.body;
    const account = await Bank.find({
      firebaseId,
      email,
    });
    res.status(200).json(account);
  } catch (error) {
    res.status(404).json({ mesage: `Bad request` });
  }
});

app.get("/account/:email", async (req, res) => {
  try {
    var filter = { email: req.params.email };

    const account = await Bank.find(filter);
    res.status(200).json(account);
  } catch (error) {
    res.send(error.message);
  }
});
// update
app.get("/account/update/:email", async (req, res) => {
  console.log("???", req.body);
  try {
    var bal = { balance: req.body.balance };
    var filter = { email: req.params.email };
    await Bank.findOneAndUpdate(filter, bal);
    res.status(200).json({ message: `success` });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// account balance

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Server listening on port ${port}`));
