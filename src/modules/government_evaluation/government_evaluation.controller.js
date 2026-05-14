const governmentEvaluationService = require("./government_evaluation.service");

exports.getAllGovernmentEvaluations = async (req, res) => {
  try {
    const data =
      await governmentEvaluationService.getAllGovernmentEvaluations();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch government evaluations",
    });
  }
};

exports.getGovernmentEvaluationById = async (req, res) => {
  try {
    const { id } = req.params;

    const data =
      await governmentEvaluationService.getGovernmentEvaluationById(id);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch government evaluation",
    });
  }
};

exports.createGovernmentEvaluation = async (req, res) => {
  try {
    const data = await governmentEvaluationService.createGovernmentEvaluation(
      req.body,
    );

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create government evaluation",
    });
  }
};

exports.updateGovernmentEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await governmentEvaluationService.updateGovernmentEvaluation(
      id,
      req.body,
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update government evaluation",
    });
  }
};

exports.deleteGovernmentEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    await governmentEvaluationService.deleteGovernmentEvaluation(id);

    res.status(200).json({
      message: "Government evaluation deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete government evaluation",
    });
  }
};
