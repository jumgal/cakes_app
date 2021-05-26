const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./sample/users");
const cakes = require("./sample/cakes");
const User = require("./models/userModel");
const Cake = require("./models/cakeModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Cake.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = cakes.map((cake) => {
      return { ...cake, user: adminUser };
    });

    await Cake.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Cake.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
