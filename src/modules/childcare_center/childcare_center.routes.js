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
 *         total_capacity:
 *           type: integer
 *         teacher_student_ratio:
 *           type: number
 *           format: float
 *         operation_type:
 *           type: string
 *         qualification:
 *           type: string
 *         open_time:
 *           type: string
 *           example: "07:30:00"
 *         close_time:
 *           type: string
 *           example: "18:30:00"
 *         centeraccount_id:
 *           type: integer
 *         updated_at:
 *           type: string
 *           example: "2024-06-01 02:00:00"
 *           description: "timestamp format: YYYY-MM-DD HH:MM:SS"
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
 *         total_capacity:
 *           type: integer
 *         teacher_student_ratio:
 *           type: number
 *           format: float
 *         operation_type:
 *           type: string
 *         qualification:
 *           type: string
 *         open_time:
 *           type: string
 *           example: "07:30:00"
 *         close_time:
 *           type: string
 *           example: "18:30:00"
 *         centeraccount_id:
 *           type: integer
 *         updated_at:
 *           type: string
 *           example: "2024-06-01 02:00:00"
 *         created_at:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /api/childcare-centers:
 *   get:
 *     summary: List all childcare centers
 *     tags: [ChildcareCenter]
 *     responses:
 *       200:
 *         description: All childcare centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildcareCenter'
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/childcare-centers/search/capacity:
 *   get:
 *     summary: Filter childcare centers by total capacity range
 *     tags: [ChildcareCenter]
 *     parameters:
 *       - in: query
 *         name: range
 *         required: true
 *         schema:
 *           type: string
 *           enum: [1-15, 16-30, 31-45, 46-60]
 *         description: Capacity range to filter by
 *     responses:
 *       200:
 *         description: List of matching childcare centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildcareCenter'
 *       400:
 *         description: Invalid range value
 */
router.get('/search/capacity', ctrl.searchByCapacity);

/**
 * @swagger
 * /api/childcare-centers/search/operation-type:
 *   get:
 *     summary: Filter childcare centers by operation type
 *     tags: [ChildcareCenter]
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [公立, 私立]
 *         description: Operation type to filter by
 *     responses:
 *       200:
 *         description: List of matching childcare centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildcareCenter'
 *       400:
 *         description: type parameter is required
 */
router.get('/search/operation-type', ctrl.searchByOperationType);

/**
 * @swagger
 * /api/childcare-centers/search/category:
 *   get:
 *     summary: Filter childcare centers by category
 *     tags: [ChildcareCenter]
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [托嬰中心, 幼兒園, 托兒所]
 *         description: Category to filter by
 *     responses:
 *       200:
 *         description: List of matching childcare centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildcareCenter'
 *       400:
 *         description: Invalid or missing category value
 */
router.get('/search/category', ctrl.searchByCategory);

/**
 * @swagger
 * /api/childcare-centers/search/district:
 *   get:
 *     summary: Filter childcare centers by Taipei district
 *     tags: [ChildcareCenter]
 *     parameters:
 *       - in: query
 *         name: district
 *         required: true
 *         schema:
 *           type: string
 *           enum: [中正區, 萬華區, 大同區, 中山區, 松山區, 大安區, 信義區, 內湖區, 南港區, 士林區, 北投區, 文山區]
 *         description: Taipei district to filter by
 *     responses:
 *       200:
 *         description: List of matching childcare centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildcareCenter'
 *       400:
 *         description: Invalid or missing district value
 */
router.get('/search/district', ctrl.searchByDistrict);

/**
 * @swagger
 * /api/childcare-centers/search/ratio:
 *   get:
 *     summary: Filter childcare centers by teacher-student ratio
 *     tags: [ChildcareCenter]
 *     description: Returns centers whose teacher_student_ratio >= the selected ratio value. Selecting 1:4 includes centers with 1:1, 1:2, 1:3, and 1:4.
 *     parameters:
 *       - in: query
 *         name: ratio
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["1:1", "1:2", "1:3", "1:4", "1:5"]
 *         description: Minimum teacher-student ratio
 *     responses:
 *       200:
 *         description: List of matching childcare centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildcareCenter'
 *       400:
 *         description: Invalid or missing ratio value
 */
router.get('/search/ratio', ctrl.searchByTeacherStudentRatio);

/**
 * @swagger
 * /api/childcare-centers/search/time:
 *   get:
 *     summary: Filter childcare centers by available time range
 *     tags: [ChildcareCenter]
 *     description: Returns centers whose open_time >= open_time param AND close_time <= close_time param
 *     parameters:
 *       - in: query
 *         name: open_time
 *         required: true
 *         schema:
 *           type: string
 *           example: "07:30"
 *         description: "Earliest acceptable open time in HH:MM format (06:00–22:00)"
 *       - in: query
 *         name: close_time
 *         required: true
 *         schema:
 *           type: string
 *           example: "18:30"
 *         description: "Latest acceptable close time in HH:MM format (06:00–22:00)"
 *     responses:
 *       200:
 *         description: List of matching childcare centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildcareCenter'
 *       400:
 *         description: open_time or close_time missing or invalid
 */
router.get('/search/time', ctrl.searchByTimeRange);

/**
 * @swagger
 * /api/childcare-centers/search:
 *   get:
 *     summary: Filter childcare centers by multiple criteria
 *     tags: [ChildcareCenter]
 *     description: All parameters are optional. When multiple parameters are provided, results must match all conditions (AND logic).
 *     parameters:
 *       - in: query
 *         name: range
 *         schema:
 *           type: string
 *           enum: [1-15, 16-30, 31-45, 46-60]
 *         description: Total capacity range
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [公立, 私立]
 *         description: Operation type
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [托嬰中心, 幼兒園, 托兒所]
 *         description: Category
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *           enum: [中正區, 萬華區, 大同區, 中山區, 松山區, 大安區, 信義區, 內湖區, 南港區, 士林區, 北投區, 文山區]
 *         description: Taipei district
 *       - in: query
 *         name: ratio
 *         schema:
 *           type: string
 *           enum: ["1:1", "1:2", "1:3", "1:4", "1:5"]
 *         description: Minimum teacher-student ratio
 *       - in: query
 *         name: open_time
 *         schema:
 *           type: string
 *           example: "07:30"
 *         description: "Earliest acceptable open time in HH:MM format (06:00–22:00)"
 *       - in: query
 *         name: close_time
 *         schema:
 *           type: string
 *           example: "18:30"
 *         description: "Latest acceptable close time in HH:MM format (06:00–22:00)"
 *     responses:
 *       200:
 *         description: List of matching childcare centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChildcareCenter'
 *       400:
 *         description: Invalid parameter value
 */
router.get('/search', ctrl.searchByFilters);

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
