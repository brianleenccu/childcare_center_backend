const staffService = require("./staff.service");

exports.getAllStaff = async (req, res) => {
  try {
    const data = await staffService.getAllStaff();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getStaffById = async (req, res) => {
  try {
    const data = await staffService.getStaffById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const data = await staffService.createStaff(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const data = await staffService.updateStaff(req.params.id, req.body);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const data = await staffService.deleteStaff(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
