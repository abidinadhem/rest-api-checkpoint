require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Users");
const app = express();
/* connecting to data base */
mongoose.connect( // Connect to MongoDB server using the Mongoose library
  process.env.MONGODB_URI, // process.env.MONGODB_URI is the connection string stored in an environment variable
  {
    useNewUrlParser: true, // useNewUrlParser: true indicates to use the new URL parser

    useUnifiedTopology: true,// useUnifiedTopology: true indicates to use the new server discovery and monitoring engine

  },
  (err) => (err ? console.log(err) : console.log("connected to db"))
); // The third parameter is a callback function that logs an error message if an error occurred or logs a success message if the connection is successful.


app.use(express.json());
/*connecting to server*/
const server = app.listen(process.env.PORT, function () {
  let port = process.env.PORT;
  console.log("Server listening on port:", port);
});
/*getting all users in the database*/
app.get("/getallusers", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});
/*adding users*/
app.post("/adduser", (req, res) => {
  console.log(req.body);
  const { name, lastName, age } = req.body;
  const newUser = new User({
    name,
    lastName,
    age,
  });
  newUser
    .save()
    .then((response) => res.send(`user added:${response}`))
    .catch((err) => console.log(err));
});
/*edit user*/
app.put("/edituser/:userId", (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
/*delete user*/
app.delete("/deleteuser/:userId", (req, res) => {
  User.findByIdAndRemove(req.params.userId, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});
