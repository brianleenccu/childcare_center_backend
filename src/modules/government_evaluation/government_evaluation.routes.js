const express = require("express");
const router = express.Router();

const governmentEvaluationController = require("./government_evaluation.controller");

router.get("/", governmentEvaluationController.getAllGovernmentEvaluations);

router.get("/:id", governmentEvaluationController.getGovernmentEvaluationById);

router.post("/", governmentEvaluationController.createGovernmentEvaluation);

router.put("/:id", governmentEvaluationController.updateGovernmentEvaluation);

router.delete(
  "/:id",
  governmentEvaluationController.deleteGovernmentEvaluation,
);

module.exports = router;
