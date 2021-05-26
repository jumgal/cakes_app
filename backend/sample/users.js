const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jack Johson",
    email: "jack@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Tina Smith",
    email: "tina@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
