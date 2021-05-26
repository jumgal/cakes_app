const express = require("express");
const app = express();

const dotenv = require("dotenv");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

app.use("/api/cakes", productRoutes);

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send(cakes);
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
