const { Router } = require('express');
const ctrl = require('./reviews.controller');

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
 *         score_enviroment:
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
 *           format: date-time
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
 *               score_enviroment:
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
router.post('/', ctrl.create);

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
 *               score_enviroment:
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
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
