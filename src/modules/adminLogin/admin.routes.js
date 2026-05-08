const express = require("express");
const router = express.Router();
const controller = require("./admin.controller");

// 定義 POST /api/admin/register 路由
router.post("/register", controller.registerAdmin);

module.exports = router;
