const express = require("express");
const app = express();

const dotenv = require("dotenv");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require('./routes/userRoutes')

dotenv.config();
connectDB();

app.use(express.json())
app.use("/api/cakes", productRoutes);
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
