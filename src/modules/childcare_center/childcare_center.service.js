const model = require('./childcare_center.model');

const getAll = () => model.findAll();

const getById = async (id) => {
  const center = await model.findById(id);
  if (!center) throw Object.assign(new Error('Childcare center not found'), { status: 404 });
  return center;
};

const createCenter = (payload) => {
  const { created_at, updated_at, ...rest } = payload;
  const now = new Date();
  return model.create({
    ...rest,
    created_at: now.toISOString().split('T')[0],
    updated_at: now,
  });
};

const updateCenter = async (id, payload) => {
  await getById(id);                // 等查完，如果找不到會 throw 404
  const { updated_at, ...rest } = payload;
  return model.update(id, { ...rest, updated_at: new Date() });
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

const searchByFilters = (filters) => model.findByFilters(filters);

module.exports = { getAll, getById, createCenter, updateCenter, deleteCenter, searchByCapacity, searchByOperationType, searchByDistrict, searchByCategory, searchByTimeRange, searchByTeacherStudentRatio, searchByFilters };
