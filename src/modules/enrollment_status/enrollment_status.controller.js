const enrollmentStatusService = require("./enrollment_status.service");

exports.getAllEnrollmentStatus = async (req, res) => {
  try {
    const data = await enrollmentStatusService.getAllEnrollmentStatus();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEnrollmentStatusById = async (req, res) => {
  try {
    const data = await enrollmentStatusService.getEnrollmentStatusById(
      req.params.id,
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEnrollmentStatusByCenterId = async (req, res) => {
  try {
    const data = await enrollmentStatusService.getEnrollmentStatusByCenterId(
      req.params.centerId,
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEnrollmentStatus = async (req, res) => {
  try {
    const data = await enrollmentStatusService.createEnrollmentStatus(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const data = await enrollmentStatusService.updateEnrollmentStatus(
      req.params.id,
      req.body,
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEnrollmentStatus = async (req, res) => {
  try {
    const data = await enrollmentStatusService.deleteEnrollmentStatus(
      req.params.id,
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
