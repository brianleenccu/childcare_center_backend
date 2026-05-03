const { Router } = require('express');
const ctrl = require('./childcare_center.controller');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ChildcareCenter:
 *       type: object
 *       properties:
 *         center_id:
 *           type: integer
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         country:
 *           type: string
 *         city:
 *           type: string
 *         district:
 *           type: string
 *         streetline:
 *           type: string
 *         zip_code:
 *           type: string
 *         longitude:
 *           type: number
 *           format: float
 *         latitude:
 *           type: number
 *           format: float
 *         representative:
 *           type: string
 *         phone:
 *           type: string
 *         operating_hours:
 *           type: string
 *         total_capacity:
 *           type: integer
 *         teacher_student_ratio:
 *           type: number
 *           format: float
 *         operation_type:
 *           type: string
 *         qualification:
 *           type: string
 *         updated_at:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date
 *     ChildcareCenterInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         country:
 *           type: string
 *         city:
 *           type: string
 *         district:
 *           type: string
 *         streetline:
 *           type: string
 *         zip_code:
 *           type: string
 *         longitude:
 *           type: number
 *           format: float
 *         latitude:
 *           type: number
 *           format: float
 *         representative:
 *           type: string
 *         phone:
 *           type: string
 *         operating_hours:
 *           type: string
 *         total_capacity:
 *           type: integer
 *         teacher_student_ratio:
 *           type: number
 *           format: float
 *         operation_type:
 *           type: string
 *         qualification:
 *           type: string
 */

/**
 * @swagger
 * /api/childcare-centers:
 *   get:
 *     summary: List all childcare centers
 *     tags: [ChildcareCenter]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated list of childcare centers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ChildcareCenter'
 *                 count:
 *                   type: integer
 *                   description: Total number of records
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/childcare-centers/{id}:
 *   get:
 *     summary: Get a childcare center by ID
 *     tags: [ChildcareCenter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: center_id of the record
 *     responses:
 *       200:
 *         description: Childcare center record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChildcareCenter'
 *       404:
 *         description: Not found
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/childcare-centers:
 *   post:
 *     summary: Create a new childcare center
 *     tags: [ChildcareCenter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChildcareCenterInput'
 *     responses:
 *       201:
 *         description: Created record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChildcareCenter'
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /api/childcare-centers/{id}:
 *   put:
 *     summary: Update a childcare center
 *     tags: [ChildcareCenter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: center_id of the record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChildcareCenterInput'
 *     responses:
 *       200:
 *         description: Updated record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChildcareCenter'
 *       404:
 *         description: Not found
 */
router.put('/:id', ctrl.update);

/**
 * @swagger
 * /api/childcare-centers/{id}:
 *   delete:
 *     summary: Delete a childcare center
 *     tags: [ChildcareCenter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: center_id of the record to delete
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
