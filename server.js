const { connectToDb } = require("./config/database");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
connectToDb();
const port = process.env.PORT;

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/User"));
app.use("/api/reservation", require("./routes/ReservationRoutes"));
app.listen(port, () => {
  console.log(`sever is running on port ${port}`);
});
