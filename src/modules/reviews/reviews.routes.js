const { Router } = require("express");
const ctrl = require("./reviews.controller");
const {
  verifyToken,
  authorizeRole,
} = require("../../core/config/middleware/auth.middleware");
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         review_id:
 *           type: integer
 *         parent_id:
 *           type: integer
 *         center_id:
 *           type: integer
 *         score_overall:
 *           type: number
 *           format: float
 *           nullable: true
 *         score_staff:
 *           type: integer
 *           nullable: true
 *         score_environment:
 *           type: integer
 *           nullable: true
 *         score_curriculum:
 *           type: integer
 *           nullable: true
 *         comment:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           example: "2026-05-22 14:09:21.966028"
 *           description: "Set automatically by the server (timestamp)"
 *           readOnly: true
 *           nullable: true
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
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
 *               score_staff:
 *                 type: integer
 *               score_environment:
 *                 type: integer
 *               score_curriculum:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created review record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.post("/", verifyToken, authorizeRole("parent"), ctrl.create);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: review_id of the record
 *     responses:
 *       200:
 *         description: Review record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: review_id of the record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score_staff:
 *                 type: integer
 *               score_environment:
 *                 type: integer
 *               score_curriculum:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated review record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: review_id of the record to delete
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
/**
 * @swagger
 * /api/reviews/parent/{parentId}:
 *   get:
 *     summary: Get all reviews by parent ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: parent_id to filter reviews
 *     responses:
 *       200:
 *         description: List of reviews for the given parent
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/parent/:parentId", ctrl.getByParentId);

/**
 * @swagger
 * /api/reviews/center/{centerId}:
 *   get:
 *     summary: Get all reviews by center ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: centerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: center_id to filter reviews
 *     responses:
 *       200:
 *         description: List of reviews for the given center
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/center/:centerId", ctrl.getByCenterId);

router.get("/:id", ctrl.getById);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;
