const express = require("express");
const app = express();
const userRouter = require("./api/users/userRouter");

app.use(express.json());

app.use("/api", userRouter);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});