
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");



router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});



router.put("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("subcategory");

  res.json(product);
});

router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", category, subcategory } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const matchStage = {};

    if (category) matchStage.category = category;
    if (subcategory) matchStage.subcategory = subcategory;

   
    const pipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },

      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory"
        }
      },
      { $unwind: "$subcategory" },

      {
        $match: {
          ...matchStage,
          ...(search && {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { "category.name": { $regex: search, $options: "i" } },
              { "subcategory.name": { $regex: search, $options: "i" } }
            ]
          })
        }
      }
    ];

    const totalCountAgg = await Product.aggregate([
      ...pipeline,
      { $count: "total" }
    ]);

    const totalCount = totalCountAgg[0]?.total || 0;

    const data = await Product.aggregate([
      ...pipeline,
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ]);

    res.json({
      data,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;