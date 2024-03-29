const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/invites", require("./routes/invites.route"));
app.use("/user", require("./routes/users.route"));
app.use("/dep", require("./routes/departments.route"));
app.use("/record", require("./routes/patientRecords.route"));

async function server(port) {
  try {
    await mongoose.connect(process.env.DB_URL.toString());
    console.log("Подключение к базе данных прошла успешна");
    app.listen(port, () => {
      console.log("сервер запущен");
    });
  } catch (error) {
    console.log("Ошибка при соединении с сервером ");
  }
}
server(Number(process.env.SERVER_PORT));
