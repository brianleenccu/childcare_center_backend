const service = require('./reviews.service');

const getById = async (req, res) => {
  try {
    const review = await service.getById(req.params.id);
    res.json(review);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const review = await service.createReview(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const review = await service.updateReview(req.params.id, req.body);
    res.json(review);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteReview(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getByParentId = async (req, res) => {
  try {
    const reviews = await service.getByParentId(req.params.parentId);
    res.json(reviews);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getByCenterId = async (req, res) => {
  try {
    const reviews = await service.getByCenterId(req.params.centerId);
    res.json(reviews);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { getById, getByParentId, getByCenterId, create, update, remove };
