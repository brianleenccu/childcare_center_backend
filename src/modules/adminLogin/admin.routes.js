const express = require("express");
const router = express.Router();
const controller = require("./admin.controller");

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: 管理員註冊 (Register)
 *     description: 註冊一個新的管理員帳號。身分 ID (centeraccount_id) 會由資料庫自動生成。
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 管理員姓名或名稱
 *                 example: "王主任"
 *               email:
 *                 type: string
 *                 description: 登入用的電子信箱
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 description: 登入密碼 (後端會自動進行 bcrypt 加密)
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: 註冊成功
 *       400:
 *         description: 缺少必要欄位 (帳號、信箱或密碼)
 *       500:
 *         description: 伺服器錯誤
 */
router.post("/register", controller.registerAdmin);

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: 管理員登入 (Login)
 *     description: 使用信箱與密碼登入，驗證成功後將獲得包含權限的 JWT Token 通行證。
 *     tags: [Admin]
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
 *                 description: 註冊時的電子信箱
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 description: 登入密碼
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: 登入成功，回傳 JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "登入成功！"
 *                 token:
 *                   type: string
 *                   description: 加密後的 JWT 數位識別證
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "王主任"
 *                     centeraccount_id:
 *                       type: integer
 *                       description: 管理員的身分證字號
 *                       example: 101
 *                     center_id:
 *                       type: integer
 *                       nullable: true
 *                       description: 管理員負責的機構 ID (若尚未建立機構則為 null)
 *                       example: null
 *       400:
 *         description: 缺少信箱或密碼
 *       401:
 *         description: 信箱或密碼錯誤 (未授權)
 *       500:
 *         description: 伺服器錯誤
 */
// 定義 POST /api/admin/register 路由
router.post("/register", controller.registerAdmin);
router.post("/login", controller.loginAdmin);
module.exports = router;
