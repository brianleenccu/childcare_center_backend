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
 *     description: 根據 center_id 查詢指定托育中心的所有設施照片
 *     tags: [Photos]
 *
 *     parameters:
 *       - in: path
 *         name: center_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 托育中心 ID
 *         example: 1
 *
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
 *                     example: 15
 *
 *                   center_id:
 *                     type: integer
 *                     example: 1
 *
 *                   image_url:
 *                     type: string
 *                     example: "https://example.com/photo.jpg"
 *
 *                   caption:
 *                     type: string
 *                     example: "戶外遊戲區"
 *
 *                   uploaded_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-05-09T10:00:00Z"
 *
 *       404:
 *         description: 找不到該托育中心照片
 *
 *       500:
 *         description: 伺服器錯誤
 */
router.get("/center/:center_id", controller.getCenterPhotos);

/**
 * @swagger
 * /api/photo/{center_id}/{photo_id}/caption:
 *   patch:
 *     summary: 更新照片描述
 *     description: 根據 center_id 與 photo_id 更新指定照片的 caption
 *     tags: [Photos]
 *
 *     parameters:
 *       - in: path
 *         name: center_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 托育中心 ID
 *         example: 1
 *
 *       - in: path
 *         name: photo_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 照片 ID
 *         example: 15
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - caption
 *             properties:
 *               caption:
 *                 type: string
 *                 description: 新的照片描述內容
 *                 example: "全新改裝的室內遊戲區"
 *
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Caption updated successfully
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     center_id:
 *                       type: integer
 *                       example: 1
 *
 *                     photo_id:
 *                       type: integer
 *                       example: 15
 *
 *                     caption:
 *                       type: string
 *                       example: "全新改裝的室內遊戲區"
 *
 *       400:
 *         description: 參數錯誤
 *
 *       404:
 *         description: 找不到該照片
 *
 *       500:
 *         description: 伺服器錯誤
 */
router.patch("/:center_id/:photo_id/caption", controller.updateCaption);

/**
 * @swagger
 * /api/photo/{center_id}/{photo_id}:
 *   delete:
 *     summary: 刪除設施照片
 *     description: 根據 center_id 與 photo_id 刪除指定照片
 *     tags: [Photos]
 *
 *     parameters:
 *       - in: path
 *         name: center_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 托育中心 ID
 *         example: 3
 *
 *       - in: path
 *         name: photo_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 照片 ID
 *         example: 2
 *
 *     responses:
 *       200:
 *         description: 刪除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Photo deleted successfully
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     deleted_center_id:
 *                       type: integer
 *                       example: 3
 *
 *                     deleted_photo_id:
 *                       type: integer
 *                       example: 2
 *
 *       404:
 *         description: 找不到照片
 *
 *       500:
 *         description: 伺服器錯誤
 */
router.delete("/:center_id/:photo_id", controller.deletePhoto);
/**
 * @swagger
 * /api/photo/{center_id}/{photo_id}/caption:
 *   get:
 *     summary: 獲取特定照片的描述 (Caption)
 *     description: 根據 center_id 與 photo_id 精準查詢單張照片的說明文字，用於前端畫面標註
 *     tags:
 *       - Photos
 *     parameters:
 *       - in: path
 *         name: center_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 托育中心 ID
 *         example: 1
 *
 *       - in: path
 *         name: photo_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 照片 ID
 *         example: 2
 *
 *     responses:
 *       200:
 *         description: 成功獲取描述
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 caption:
 *                   type: string
 *                   example: "閱讀區"
 *
 *       404:
 *         description: 找不到該照片描述
 *
 *       500:
 *         description: 伺服器錯誤
 */
router.get("/:center_id/:photo_id/caption", controller.getPhotoCaption);
module.exports = router;
