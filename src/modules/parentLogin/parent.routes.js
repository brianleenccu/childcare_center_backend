const express = require("express");
const router = express.Router();

const controller = require("./parent.controller");
const {
  verifyToken,
  authorizeRole,
} = require("../../core/config/middleware/auth.middleware");

/**
 * @swagger
 * /api/parent/register:
 *   post:
 *     summary: 家長註冊 (Register)
 *     description: 註冊新的家長帳號，parent_id 由資料庫自動生成
 *     tags:
 *       - Parent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "陳小明"
 *               email:
 *                 type: string
 *                 example: "parent@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               phone:
 *                 type: string
 *                 example: "0912345678"
 *     responses:
 *       200:
 *         description: 註冊成功
 *       400:
 *         description: 資料格式錯誤
 *       500:
 *         description: 伺服器錯誤
 */
router.post("/register", controller.registerParent);

/**
 * @swagger
 * /api/parent/login:
 *   post:
 *     summary: 家長登入 (Login)
 *     description: 使用 email 與 password 登入，成功後回傳 JWT Token
 *     tags:
 *       - Parent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "parent@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: 登入成功
 *       401:
 *         description: 帳號或密碼錯誤
 *       500:
 *         description: 伺服器錯誤
 */
router.post("/login", controller.loginParent);
/**
 * @swagger
 * /api/parent/{id}:
 *   put:
 *     summary: 更新家長個人資料
 *     tags: [Parent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 家長的 parent_id
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: 更新成功
 *
 *       403:
 *         description: 權限不足
 */
router.put(
  "/:id",
  verifyToken,
  authorizeRole("parent"),
  controller.updateProfile
);
module.exports = router;
