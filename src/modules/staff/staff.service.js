const staffModel = require("./staff.model");

exports.getAllStaff = async () => {
  return await staffModel.getAllStaff();
};

exports.getStaffById = async (id) => {
  return await staffModel.getStaffById(id);
};

exports.getStaffByCenterId = async (centerId) => {
  return await staffModel.getStaffByCenterId(centerId);
};

exports.createStaff = async (staff) => {
  return await staffModel.createStaff(staff);
};

exports.updateStaff = async (id, updates) => {
  return await staffModel.updateStaff(id, updates);
};

exports.deleteStaff = async (id) => {
  return await staffModel.deleteStaff(id);
};
