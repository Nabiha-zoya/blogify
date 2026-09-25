require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");



const Blog = require("./models/blog");

const userRoute = require('./routes/user');
const blogRoute = require("./routes/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;      //for AWS

mongoose
    .connect(process.env.MONGO_URL)
    .then(e => console.log('MongoDB Connected'));


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
  res.render('home');
});

app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});