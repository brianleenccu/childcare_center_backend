const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const controller = require("./photo.controller");

/**
 * @swagger
 * /api/photo/upload:
 *   post:
 *     summary: 上傳設施照片
 *     tags: [Photos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photoblob:
 *                 type: string
 *                 format: binary
 *                 description: 圖片檔案
 *               center_id:
 *                 type: integer
 *                 description: 托育中心 ID
 *                 example: 1
 *               caption:
 *                 type: string
 *                 description: 照片描述
 *                 example: 戶外遊戲區
 *               uploaded_at:
 *                 type: string
 *                 format: date-time
 *                 description: 上傳時間
 *                 example: "2026-05-08T10:00:00Z"
 *     responses:
 *       200:
 *         description: 上傳成功
 *       400:
 *         description: 參數錯誤
 *       500:
 *         description: 伺服器錯誤
 */
router.post("/upload", upload.single("photoblob"), controller.uploadPhoto);
/**
 * @swagger
 * /api/photo/center/{center_id}:
 *   get:
 *     summary: 獲取特定托育中心的所有照片
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: center_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 托育中心 ID
 *         example: 1
 *     responses:
 *       200:
 *         description: 成功獲取照片列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   photo_id:
 *                     type: integer
 *                     example: 10
 *                   image_url:
 *                     type: string
 *                     example: "https://example.com/photo.jpg"
 *                   caption:
 *                     type: string
 *                     example: "戶外遊戲區"
 *                   uploaded_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: 伺服器錯誤
 */

router.get("/center/:center_id", controller.getCenterPhotos);
module.exports = router;
