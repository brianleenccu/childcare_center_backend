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

const searchByDistrict = async (req, res) => {
  try {
    if (!req.query.district) return res.status(400).json({ error: 'district is required' });
    const data = await service.searchByDistrict(req.query.district);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByCategory = async (req, res) => {
  try {
    if (!req.query.category) return res.status(400).json({ error: 'category is required' });
    const data = await service.searchByCategory(req.query.category);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByTimeRange = async (req, res) => {
  try {
    const { open_time, close_time } = req.query;
    if (!open_time || !close_time) return res.status(400).json({ error: 'open_time and close_time are required' });
    const data = await service.searchByTimeRange(open_time, close_time);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByTeacherStudentRatio = async (req, res) => {
  try {
    if (!req.query.ratio) return res.status(400).json({ error: 'ratio is required' });
    const data = await service.searchByTeacherStudentRatio(req.query.ratio);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByFilters = async (req, res) => {
  try {
    const { range, type, category, district, ratio, open_time, close_time } = req.query;
    const data = await service.searchByFilters({ range, type, category, district, ratio, open_time, close_time });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove, searchByCapacity, searchByOperationType, searchByDistrict, searchByCategory, searchByTimeRange, searchByTeacherStudentRatio, searchByFilters };
