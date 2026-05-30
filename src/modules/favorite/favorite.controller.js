const service = require("./favorite.service");

const getById = async (req, res) => {
  try {
    const item = await service.getById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const item = await service.createFavorite(req.body);
    res.status(201).json(item);
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "重複收藏：這間機構已在您的收藏清單中！" });
    }
    res.status(err.status || 500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteFavorite(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { getById, create, remove };
