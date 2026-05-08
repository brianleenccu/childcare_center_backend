const model = require('./childcare_center.model');

const getAll = () => model.findAll();

const getById = async (id) => {
  const center = await model.findById(id);
  if (!center) throw Object.assign(new Error('Childcare center not found'), { status: 404 });
  return center;
};

const createCenter = (payload) => model.create(payload);

const updateCenter = async (id, payload) => {
  await getById(id);
  return model.update(id, payload);
};

const deleteCenter = async (id) => {
  await getById(id);
  return model.remove(id);
};

const searchByCapacity = (range) => model.findByCapacityRange(range);

const searchByOperationType = (type) => model.findByOperationType(type);

module.exports = { getAll, getById, createCenter, updateCenter, deleteCenter, searchByCapacity, searchByOperationType };
