const express = require("express");
const path = require('path')
const app = express();

const dotenv = require("dotenv");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();
connectDB();

app.use(express.json())
app.use("/api/cakes", productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})



const a = path.resolve()
app.use('/uploads', express.static(path.join(a, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(a, './frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running ...')
  })
}

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
