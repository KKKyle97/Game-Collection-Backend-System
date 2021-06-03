require("dotenv").config();
const connect = require("./db");
const express = require("express");
const apiRoutes = require("./Routes/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

connect.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}`);
  });
});
