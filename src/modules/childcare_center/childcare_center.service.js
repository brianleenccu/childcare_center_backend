const model = require('./childcare_center.model');

const getAll = (query) => model.findAll(query);

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

module.exports = { getAll, getById, createCenter, updateCenter, deleteCenter };
