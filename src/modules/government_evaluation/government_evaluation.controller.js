const governmentEvaluationService = require("./government_evaluation.service");

exports.getAllGovernmentEvaluations = async (req, res) => {
  try {
    const data =
      await governmentEvaluationService.getAllGovernmentEvaluations();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGovernmentEvaluationById = async (req, res) => {
  try {
    const data = await governmentEvaluationService.getGovernmentEvaluationById(
      req.params.id,
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGovernmentEvaluationsByCenterId = async (req, res) => {
  try {
    const data =
      await governmentEvaluationService.getGovernmentEvaluationsByCenterId(
        req.params.centerId,
      );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGovernmentEvaluation = async (req, res) => {
  try {
    const data = await governmentEvaluationService.createGovernmentEvaluation(
      req.body,
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGovernmentEvaluation = async (req, res) => {
  try {
    const data = await governmentEvaluationService.updateGovernmentEvaluation(
      req.params.id,
      req.body,
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGovernmentEvaluation = async (req, res) => {
  try {
    const data = await governmentEvaluationService.deleteGovernmentEvaluation(
      req.params.id,
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
