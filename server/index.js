const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "https://user-management-system-9hc2.onrender.com",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.options("*", cors());

const posts = require("./models/posts");
const authroutes = require("./routes/auth.route");

const limiter = require("./ratelimit");
const { body, validationResult } = require("express-validator");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("runnning");
});

app.use("/api/auth", authroutes);

app.post(
  "/create",
  limiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required").escape(),
    body("email")
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail(),
    body("url").optional().isURL().withMessage("URL must be valid"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ msg: "Give details correctly" });
    }

    let { name, email, url } = req.body;
    try {
      let createdUser = await posts.create({
        name,
        email,
        url,
      });
      res.send({ createdUser });
    } catch (err) {
      console.log("Error creating User");
      res.status(404).send({ message });
    }
  }
);

app.get("/users", async (req, res) => {
  try {
    let users = await posts.find();
    res.send({ users });
  } catch (err) {
    console.log("Cannot get Users");
    res.status(404).send();
  }
});

app.delete("/deleteuser/:user", async (req, res) => {
  const id = req.params.user;
  try {
    let deletedUser = await posts.findOneAndDelete({ _id: id });
    res.send({ deletedUser });
  } catch (err) {
    console.log("Cannot Delete User");
  }
});

app.get("/updateuser/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await posts.findOne({ _id });
    res.send({ user });
  } catch (err) {
    console.log("Error fetching user" + err);
  }
});

app.put("/updateuser/:userid", async (req, res) => {
  const id = req.params.userid;
  const { name, email, url } = req.body;
  try {
    const updatedUser = await posts.findOneAndUpdate(
      { _id: id },
      {
        name,
        email,
        url,
      }
    );
    res.send(updatedUser);
  } catch (err) {
    console.log("Error Updating User");
  }
});

app.delete("/deleteallusers", async (req, res) => {
  try {
    const response = await posts.deleteMany({});
    res.send(response);
  } catch (err) {
    console.log("Error deleting Users" + err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
