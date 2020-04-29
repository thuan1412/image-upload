const express = require("express");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const photoRouter = require("./routes/photo");

const app = express();

// view setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// set up middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/photos", photoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.send({ erorr: "Page Not Found" });
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3001, () => {
  console.log("Listen to http://localhost:3001");
});
