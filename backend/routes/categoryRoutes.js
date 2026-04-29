
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const data = await Category.create(req.body);
  res.json(data);
});

router.get("/", async (req, res) => {
  const data = await Category.find();
  res.json(data);
});

router.put("/:id", async (req, res) => {
  const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;