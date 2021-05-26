const express = require("express");
const router = express.Router();

const cakes = require("../cakes");

const Cake = require("../models/cakeModel");

router.get("/", async (req, res) => {
  try {
    const cakesDB = await Cake.find({});

    if (cakesDB.length === 0) {
      return res.status(404).json({ error: "no cakes found" });
    }
    res.json(cakesDB);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cakeDB = await Cake.findById(req.params.id);

    if (!cakeDB) return res.status(404).json({ error: "no cake found" });

    res.json(cakeDB);
  } catch (err) {}
});

module.exports = router;
