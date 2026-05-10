const model = require('./childcare_center.model');

const getAll = () => model.findAll();

const getById = async (id) => {
  const center = await model.findById(id);
  if (!center) throw Object.assign(new Error('Childcare center not found'), { status: 404 });
  return center;
};

const createCenter = (payload) => model.create(payload);

const updateCenter = async (id, payload) => {
  await getById(id);                // 等查完，如果找不到會 throw 404
  return model.update(id, payload);
};

const deleteCenter = async (id) => {
  await getById(id);                 // 等查完，如果找不到會 throw 404
  return model.remove(id);
};

const searchByCapacity = (range) => model.findByCapacityRange(range);

const searchByOperationType = (type) => model.findByOperationType(type);

const searchByDistrict = (district) => model.findByDistrict(district);

const searchByCategory = (category) => model.findByCategory(category);

const searchByTimeRange = (openTime, closeTime) => model.findByTimeRange(openTime, closeTime);

const searchByTeacherStudentRatio = (ratio) => model.findByTeacherStudentRatio(ratio);

module.exports = { getAll, getById, createCenter, updateCenter, deleteCenter, searchByCapacity, searchByOperationType, searchByDistrict, searchByCategory, searchByTimeRange, searchByTeacherStudentRatio };
