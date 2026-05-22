const enrollmentStatusModel = require("./enrollment_status.model");

exports.getAllEnrollmentStatus = async () => {
  return await enrollmentStatusModel.getAllEnrollmentStatus();
};

exports.getEnrollmentStatusById = async (id) => {
  return await enrollmentStatusModel.getEnrollmentStatusById(id);
};

exports.getEnrollmentStatusByCenterId = async (centerId) => {
  return await enrollmentStatusModel.getEnrollmentStatusByCenterId(centerId);
};

exports.createEnrollmentStatus = async (data) => {
  return await enrollmentStatusModel.createEnrollmentStatus(data);
};

exports.updateEnrollmentStatus = async (id, data) => {
  return await enrollmentStatusModel.updateEnrollmentStatus(id, data);
};

exports.deleteEnrollmentStatus = async (id) => {
  return await enrollmentStatusModel.deleteEnrollmentStatus(id);
};
