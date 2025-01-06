const express = require("express");
const app = express();
const port = process.env.PORT_ENV || 8080;

// these are the new modules which are added
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

app.use(cors());
app.use(express.json());

// Form here all the code is old
const userRouter = require("./routes/user.js");
const roleRouter = require("./routes/role.js");

const mongoose = require("mongoose");
const errorHandling = require("./middleware/errorHandling");
app.use(express.json());

// MongoDB is connecting to the API
mongoose
  .connect(
    "mongodb+srv://leowilder1331:9837371512@cluster0.dddhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/DemoApi"
  )
  .then(() => {
    console.log("Database connected !!!");
  })
  .catch((err) => {
    console.log(err);
  });

// all the request made for user handles here

app.use("/user", userRouter);

// all the request mage for role will handle here

app.use("/role", roleRouter);



// handle the other router

app.use((req, res, next) => {
  const error = new Error("Not Found");
  next(error);
});
app.use(errorHandling);

// app.use((error, req, res, next) => {
//   res.status(500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
