const express = require("express");
const { updateItem } = require("../controllers/itemController");
const router = express.Router();

router.put("/api/item/update/:id", updateItem);

module.exports = router;
