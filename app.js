const express = require('express');
const path = require("path");
const app = express();
const port = 3000;
const router = require('./routers');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(port, () => {
  console.log(`This app listening on port http://localhost:${ port }/`);
})