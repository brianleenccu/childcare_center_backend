const service = require("./childcare_center.service");
//----------------------------------------------------------------------------
//製作compare專用的controller，讓前端一次拿到四個模組的資料，提升比較頁面的效能和使用體驗
//----------------------------------------------------------------------------
// 🌟 1. 確保你有在檔案最上方引入這四個模組的 Service (路徑請依你的專案架構微調)

const childcareService = require("./childcare_center.service");
const staffService = require("../staff/staff.service");
const enrollmentService = require("../enrollment_status/enrollment_status.service");
const evaluationService = require("../government_evaluation/government_evaluation.service");
// 🌟 2. 建立比較專用的聚合 API
const getCompareDetails = async (req, res) => {
  try {
    const centerId = parseInt(req.params.id);

    // 🚀 核心魔法：Promise.all 讓四個資料庫查詢「同時並行」，速度極快！
    const [basicInfo, staffList, enrollmentStatus, evaluations] =
      await Promise.all([
        childcareService.getById(centerId), // 1. 基本資料
        staffService.getStaffByCenterId(centerId), // 2. 師資陣列
        enrollmentService.getEnrollmentStatusByCenterId(centerId), // 3. 招生狀態
        evaluationService.getGovernmentEvaluationsByCenterId(centerId), // 4. 評鑑紀錄
      ]);

    if (!basicInfo) {
      return res.status(404).json({ error: "找不到該機構資料" });
    }

    // 📦 將四散的資料打包成一個結構清晰的 JSON 回傳給前端
    res.json({
      success: true,
      data: {
        center_id: centerId,
        basic_info: basicInfo,
        staff: staffList || [],
        // 處理 enrollment 可能是陣列或單一物件的狀況
        enrollment_status: Array.isArray(enrollmentStatus)
          ? enrollmentStatus[0]
          : enrollmentStatus || null,
        government_evaluations: evaluations || [],
      },
    });
  } catch (err) {
    console.error("❌ 獲取比較資料失敗:", err);
    res.status(500).json({ error: err.message });
  }
};

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
    if (!req.query.type)
      return res.status(400).json({ error: "type is required" });
    const data = await service.searchByOperationType(req.query.type);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByDistrict = async (req, res) => {
  try {
    if (!req.query.district)
      return res.status(400).json({ error: "district is required" });
    const data = await service.searchByDistrict(req.query.district);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByCategory = async (req, res) => {
  try {
    if (!req.query.category)
      return res.status(400).json({ error: "category is required" });
    const data = await service.searchByCategory(req.query.category);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByTimeRange = async (req, res) => {
  try {
    const { open_time, close_time } = req.query;
    if (!open_time || !close_time)
      return res
        .status(400)
        .json({ error: "open_time and close_time are required" });
    const data = await service.searchByTimeRange(open_time, close_time);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByTeacherStudentRatio = async (req, res) => {
  try {
    if (!req.query.ratio)
      return res.status(400).json({ error: "ratio is required" });
    const data = await service.searchByTeacherStudentRatio(req.query.ratio);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const searchByFilters = async (req, res) => {
  try {
    const { range, type, category, district, ratio, open_time, close_time } =
      req.query;
    const data = await service.searchByFilters({
      range,
      type,
      category,
      district,
      ratio,
      open_time,
      close_time,
    });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = {
  getCompareDetails,
  getAll,
  getById,
  create,
  update,
  remove,
  searchByCapacity,
  searchByOperationType,
  searchByDistrict,
  searchByCategory,
  searchByTimeRange,
  searchByTeacherStudentRatio,
  searchByFilters,
};
