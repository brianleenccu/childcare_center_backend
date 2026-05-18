const governmentEvaluationModel = require("./government_evaluation.model");

exports.getAllGovernmentEvaluations = async () => {
  return await governmentEvaluationModel.getAllGovernmentEvaluations();
};

exports.getGovernmentEvaluationById = async (id) => {
  return await governmentEvaluationModel.getGovernmentEvaluationById(id);
};

exports.getGovernmentEvaluationsByCenterId = async (centerId) => {
  return await governmentEvaluationModel.getGovernmentEvaluationsByCenterId(
    centerId,
  );
};

exports.createGovernmentEvaluation = async (data) => {
  return await governmentEvaluationModel.createGovernmentEvaluation(data);
};

exports.updateGovernmentEvaluation = async (id, data) => {
  return await governmentEvaluationModel.updateGovernmentEvaluation(id, data);
};

exports.deleteGovernmentEvaluation = async (id) => {
  return await governmentEvaluationModel.deleteGovernmentEvaluation(id);
};
