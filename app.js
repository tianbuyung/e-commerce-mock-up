const express = require('express');
const path = require("path");
const app = express();
const port = 3000;
const router = require('./routers');
const formatPrice = require("./helpers/formatPrice");
const session = require("express-session");

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "avada kedavra",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);
app.use(express.static("views"));
app.use("/", router);
app.locals.formatPriceToEjs = formatPrice;

app.listen(port, () => {
  console.log(`This app listening on port http://localhost:${ port }/`);
})