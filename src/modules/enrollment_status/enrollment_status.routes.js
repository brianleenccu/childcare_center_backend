const express = require("express");
const router = express.Router();

const enrollmentStatusController = require("./enrollment_status.controller");
const {
  verifyToken,
  authorizeRole,
} = require("../../core/config/middleware/auth.middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     EnrollmentStatus:
 *       type: object
 *       properties:
 *         enrollment_id:
 *           type: integer
 *         center_id:
 *           type: integer
 *         updated_at:
 *           type: string
 *           example: "2024-06-01 10:00:00"
 *         extended_care:
 *           type: boolean
 *         service_hour:
 *           type: number
 *           format: float
 *         monthly_fee:
 *           type: integer
 *         is_accepting:
 *           type: boolean
 *         waitlist_count:
 *           type: integer
 *           description: Remaining available slots based on current project definition
 *         availability_slots:
 *           type: string
 *           example: "2024-09-01 08:00:00"
 *     EnrollmentStatusInput:
 *       type: object
 *       properties:
 *         center_id:
 *           type: integer
 *         extended_care:
 *           type: boolean
 *         service_hour:
 *           type: number
 *           format: float
 *         monthly_fee:
 *           type: integer
 *         is_accepting:
 *           type: boolean
 *         waitlist_count:
 *           type: integer
 *           description: Remaining available slots based on current project definition
 *         availability_slots:
 *           type: string
 *           example: "2024-09-01 08:00:00"
 */

/**
 * @swagger
 * /api/enrollment-status:
 *   get:
 *     summary: List all enrollment status records
 *     tags: [EnrollmentStatus]
 *     responses:
 *       200:
 *         description: All enrollment status records
 */
router.get("/", enrollmentStatusController.getAllEnrollmentStatus);

/**
 * @swagger
 * /api/enrollment-status/center/{centerId}:
 *   get:
 *     summary: Get enrollment status records by childcare center ID
 *     tags: [EnrollmentStatus]
 *     parameters:
 *       - in: path
 *         name: centerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: center_id of the childcare center
 *     responses:
 *       200:
 *         description: Enrollment status records of the selected childcare center
 */
router.get(
  "/center/:centerId",
  enrollmentStatusController.getEnrollmentStatusByCenterId
);

/**
 * @swagger
 * /api/enrollment-status/{id}:
 *   get:
 *     summary: Get an enrollment status record by ID
 *     tags: [EnrollmentStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: enrollment_id of the record
 *     responses:
 *       200:
 *         description: Enrollment status record
 */
router.get("/:id", enrollmentStatusController.getEnrollmentStatusById);

/**
 * @swagger
 * /api/enrollment-status:
 *   post:
 *     summary: Create a new enrollment status record
 *     tags: [EnrollmentStatus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnrollmentStatusInput'
 *     responses:
 *       201:
 *         description: Created enrollment status record
 */
router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  enrollmentStatusController.createEnrollmentStatus
);

/**
 * @swagger
 * /api/enrollment-status/{id}:
 *   put:
 *     summary: Update an enrollment status record
 *     tags: [EnrollmentStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: enrollment_id of the record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnrollmentStatusInput'
 *     responses:
 *       200:
 *         description: Updated enrollment status record
 */
router.put(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  enrollmentStatusController.updateEnrollmentStatus
);

/**
 * @swagger
 * /api/enrollment-status/{id}:
 *   delete:
 *     summary: Delete an enrollment status record
 *     tags: [EnrollmentStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: enrollment_id of the record to delete
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", enrollmentStatusController.deleteEnrollmentStatus);

module.exports = router;
