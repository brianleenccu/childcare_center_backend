const express = require('express');
const router = express.Router();
const ctrl = require('./waitlist.controller');
const { verifyToken, authorizeRole } = require('../../core/config/middleware/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     WaitlistEntry:
 *       type: object
 *       properties:
 *         waitlist_id:
 *           type: integer
 *         parent_id:
 *           type: integer
 *         center_id:
 *           type: integer
 *         joined_at:
 *           type: string
 *           example: "2026-05-30 10:00:00"
 */

/**
 * @swagger
 * /api/waitlist:
 *   post:
 *     summary: 家長加入候補名單
 *     tags: [Waitlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - center_id
 *             properties:
 *               center_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: 成功加入候補
 *       409:
 *         description: 已在候補名單中
 */
router.post('/', verifyToken, authorizeRole('parent'), ctrl.join);

/**
 * @swagger
 * /api/waitlist/check:
 *   get:
 *     summary: 查詢家長是否已在某機構候補名單
 *     tags: [Waitlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: center_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 回傳 in_waitlist 布林值與記錄
 */
router.get('/check', verifyToken, authorizeRole('parent'), ctrl.checkStatus);

/**
 * @swagger
 * /api/waitlist/parent/{parentId}:
 *   get:
 *     summary: 家長查看自己的候補清單
 *     tags: [Waitlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: parentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 候補清單（含機構名稱）
 */
router.get('/parent/:parentId', verifyToken, authorizeRole('parent'), ctrl.getByParentId);

/**
 * @swagger
 * /api/waitlist/center/{centerId}:
 *   get:
 *     summary: 管理員查看某機構候補名單
 *     tags: [Waitlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: centerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 候補名單（含家長姓名與電話）
 */
router.get('/center/:centerId', verifyToken, authorizeRole('admin'), ctrl.getByCenterId);

/**
 * @swagger
 * /api/waitlist/{id}:
 *   delete:
 *     summary: 家長取消候補
 *     tags: [Waitlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: waitlist_id
 *     responses:
 *       200:
 *         description: 成功取消候補
 *       404:
 *         description: 找不到記錄或無權限
 */
router.delete('/:id', verifyToken, authorizeRole('parent'), ctrl.leave);

module.exports = router;