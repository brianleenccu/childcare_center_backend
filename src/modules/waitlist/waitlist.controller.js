const service = require('./waitlist.service');

// POST /api/waitlist — 家長加入候補
const join = async (req, res) => {
  try {
    const parentId = req.user.parent_id;
    const { center_id } = req.body;

    if (!center_id) {
      return res.status(400).json({ error: '請提供 center_id' });
    }

    const record = await service.joinWaitlist(parentId, parseInt(center_id));
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// DELETE /api/waitlist/:id — 家長取消候補
const leave = async (req, res) => {
  try {
    const parentId = req.user.parent_id;
    const waitlistId = parseInt(req.params.id);

    const deleted = await service.leaveWaitlist(waitlistId, parentId);
    res.json({ success: true, data: deleted });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// GET /api/waitlist/center/:centerId — 管理員查看某機構候補名單
const getByCenterId = async (req, res) => {
  try {
    const data = await service.getWaitlistByCenterId(req.params.centerId);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/waitlist/parent/:parentId — 家長查看自己的候補清單
const getByParentId = async (req, res) => {
  try {
    const requestedParentId = parseInt(req.params.parentId);
    // 只能查自己的
    if (req.user.parent_id !== requestedParentId) {
      return res.status(403).json({ error: '權限不足：只能查看自己的候補清單' });
    }
    const data = await service.getWaitlistByParentId(requestedParentId);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/waitlist/check?parent_id=&center_id= — 查詢是否已在候補
const checkStatus = async (req, res) => {
  try {
    const parentId = req.user.parent_id;
    const centerId = parseInt(req.query.center_id);

    if (!centerId) {
      return res.status(400).json({ error: '請提供 center_id' });
    }

    const record = await service.checkWaitlistStatus(parentId, centerId);
    res.json({ success: true, in_waitlist: !!record, data: record || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { join, leave, getByCenterId, getByParentId, checkStatus };