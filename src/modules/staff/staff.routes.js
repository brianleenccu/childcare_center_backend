const express = require("express");
const router = express.Router();

const staffController = require("./staff.controller");
const {
  verifyToken,
  authorizeRole,
} = require("../../core/config/middleware/auth.middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       properties:
 *         staff_id:
 *           type: integer
 *         center_id:
 *           type: integer
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         qualification:
 *           type: string
 *         biography:
 *           type: string
 *     StaffInput:
 *       type: object
 *       properties:
 *         center_id:
 *           type: integer
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         qualification:
 *           type: string
 *         biography:
 *           type: string
 */

/**
 * @swagger
 * /api/staff:
 *   get:
 *     summary: List all staff
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: All staff records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 */
router.get("/", staffController.getAllStaff);

/**
 * @swagger
 * /api/staff/center/{centerId}:
 *   get:
 *     summary: Get staff by childcare center ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: centerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: center_id of the childcare center
 *     responses:
 *       200:
 *         description: Staff records of the selected childcare center
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 */
router.get("/center/:centerId", staffController.getStaffByCenterId);

/**
 * @swagger
 * /api/staff/{id}:
 *   get:
 *     summary: Get staff by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: staff_id of the staff record
 *     responses:
 *       200:
 *         description: Staff record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Not found
 */
router.get("/:id", staffController.getStaffById);

/**
 * @swagger
 * /api/staff:
 *   post:
 *     summary: Create a new staff record
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StaffInput'
 *     responses:
 *       201:
 *         description: Created staff record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 */
router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  staffController.createStaff
);

/**
 * @swagger
 * /api/staff/{id}:
 *   put:
 *     summary: Update a staff record
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: staff_id of the staff record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StaffInput'
 *     responses:
 *       200:
 *         description: Updated staff record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Not found
 */
router.put(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  staffController.updateStaff
);

/**
 * @swagger
 * /api/staff/{id}:
 *   delete:
 *     summary: Delete a staff record
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: staff_id of the staff record to delete
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.delete(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  staffController.deleteStaff
);

module.exports = router;
