const model = require('./favorite.model');

const getById = async (id) => {
  const item = await model.findById(id);
  if (!item) throw Object.assign(new Error('Favorite not found'), { status: 404 });
  return item;
};

const createFavorite = async (payload) => {
  const { fav_item_id, ...safePayload } = payload;
  return model.create(safePayload);
};

const deleteFavorite = async (id) => {
  await getById(id);
  return model.remove(id);
};

module.exports = { getById, createFavorite, deleteFavorite };
