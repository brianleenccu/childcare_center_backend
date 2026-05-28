const { Router } = require("express");
const ctrl = require("./favorite.controller");

const router = Router();
const {
  verifyToken,
  authorizeRole,
} = require("../../core/config/middleware/auth.middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     FavoriteItem:
 *       type: object
 *       properties:
 *         fav_item_id:
 *           type: integer
 *         parent_id:
 *           type: integer
 *         center_id:
 *           type: integer
 *         added_at:
 *           type: string
 *           example: "2026-05-22 14:09:21.966028"
 *           description: "Set automatically by the server (timestamp)"
 *           readOnly: true
 *           nullable: true
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add a favorite
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - parent_id
 *               - center_id
 *             properties:
 *               parent_id:
 *                 type: integer
 *               center_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created favorite item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteItem'
 */
router.post("/", verifyToken, authorizeRole("parent"), ctrl.create);

/**
 * @swagger
 * /api/favorites/{id}:
 *   get:
 *     summary: Get a favorite by ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: fav_item_id of the record
 *     responses:
 *       200:
 *         description: Favorite item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteItem'
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Remove a favorite by ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: fav_item_id of the record to delete
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.get("/:id", ctrl.getById);
router.delete("/:id", verifyToken, authorizeRole("parent"), ctrl.remove);

module.exports = router;
