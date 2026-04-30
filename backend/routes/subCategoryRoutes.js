
const express = require("express");
const router = express.Router();
const SubCategory = require("../models/SubCategory");

router.post("/", async (req, res) => {
  const data = await SubCategory.create(req.body);
  res.json(data);
});

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    const data = await SubCategory.find(filter).populate("category");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const data = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await SubCategory.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;