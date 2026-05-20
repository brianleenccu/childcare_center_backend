const express = require("express");
const router = express.Router();

const governmentEvaluationController = require("./government_evaluation.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     GovernmentEvaluation:
 *       type: object
 *       properties:
 *         evaluation_id:
 *           type: integer
 *         center_id:
 *           type: integer
 *         evaluation_academic_year:
 *           type: string
 *           example: "114學年度"
 *         completion_date:
 *           type: string
 *           format: date
 *           example: "2026-05-08"
 *         evalution_result:
 *           type: string
 *           example: "甲等"
 *         non_compliance_details:
 *           type: string
 *           example: "無"
 *     GovernmentEvaluationInput:
 *       type: object
 *       properties:
 *         center_id:
 *           type: integer
 *         evaluation_academic_year:
 *           type: string
 *           example: "114學年度"
 *         completion_date:
 *           type: string
 *           format: date
 *           example: "2026-05-08"
 *         evalution_result:
 *           type: string
 *           example: "甲等"
 *         non_compliance_details:
 *           type: string
 *           example: "無"
 */

/**
 * @swagger
 * /api/government-evaluations:
 *   get:
 *     summary: List all government evaluation records
 *     tags: [GovernmentEvaluation]
 *     responses:
 *       200:
 *         description: All government evaluation records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GovernmentEvaluation'
 */
router.get("/", governmentEvaluationController.getAllGovernmentEvaluations);

/**
 * @swagger
 * /api/government-evaluations/center/{centerId}:
 *   get:
 *     summary: Get government evaluation records by childcare center ID
 *     tags: [GovernmentEvaluation]
 *     parameters:
 *       - in: path
 *         name: centerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: center_id of the childcare center
 *     responses:
 *       200:
 *         description: Evaluation records of the selected childcare center
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GovernmentEvaluation'
 */
router.get(
  "/center/:centerId",
  governmentEvaluationController.getGovernmentEvaluationsByCenterId,
);

/**
 * @swagger
 * /api/government-evaluations/{id}:
 *   get:
 *     summary: Get a government evaluation record by ID
 *     tags: [GovernmentEvaluation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: evaluation_id of the record
 *     responses:
 *       200:
 *         description: Government evaluation record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GovernmentEvaluation'
 *       404:
 *         description: Not found
 */
router.get("/:id", governmentEvaluationController.getGovernmentEvaluationById);

/**
 * @swagger
 * /api/government-evaluations:
 *   post:
 *     summary: Create a new government evaluation record
 *     tags: [GovernmentEvaluation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GovernmentEvaluationInput'
 *     responses:
 *       201:
 *         description: Created government evaluation record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GovernmentEvaluation'
 */
router.post("/", governmentEvaluationController.createGovernmentEvaluation);

/**
 * @swagger
 * /api/government-evaluations/{id}:
 *   put:
 *     summary: Update a government evaluation record
 *     tags: [GovernmentEvaluation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: evaluation_id of the record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GovernmentEvaluationInput'
 *     responses:
 *       200:
 *         description: Updated government evaluation record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GovernmentEvaluation'
 *       404:
 *         description: Not found
 */
router.put("/:id", governmentEvaluationController.updateGovernmentEvaluation);

/**
 * @swagger
 * /api/government-evaluations/{id}:
 *   delete:
 *     summary: Delete a government evaluation record
 *     tags: [GovernmentEvaluation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: evaluation_id of the record to delete
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.delete(
  "/:id",
  governmentEvaluationController.deleteGovernmentEvaluation,
);

module.exports = router;
