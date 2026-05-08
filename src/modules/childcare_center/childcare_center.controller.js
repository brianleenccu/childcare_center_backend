const service = require('./childcare_center.service');

const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const center = await service.getById(req.params.id);
    res.json(center);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { center_id, ...payload } = req.body;
    const center = await service.createCenter(payload);
    res.status(201).json(center);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const center = await service.updateCenter(req.params.id, req.body);
    res.json(center);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteCenter(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByCapacity = async (req, res) => {
  try {
    const data = await service.searchByCapacity(req.query.range);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByOperationType = async (req, res) => {
  try {
    if (!req.query.type) return res.status(400).json({ error: 'type is required' });
    const data = await service.searchByOperationType(req.query.type);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove, searchByCapacity, searchByOperationType };
