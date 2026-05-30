const model = require('./reviews.model');

const getById = async (id) => {
  const review = await model.findById(id);
  if (!review) throw Object.assign(new Error('Review not found'), { status: 404 });
  return review;
};

const SCORE_FIELDS = ['score_staff', 'score_environment', 'score_curriculum'];

const createReview = async (payload) => {
  const { score_overall, review_id, created_at, ...safePayload } = payload;
  safePayload.created_at = new Date();

  const { score_staff, score_environment, score_curriculum } = safePayload;
  if (score_staff != null && score_environment != null && score_curriculum != null) {
    safePayload.score_overall = Math.round((Number(score_staff) + Number(score_environment) + Number(score_curriculum)) / 3 * 10) / 10;
  }

  return model.create(safePayload);
};

const updateReview = async (id, payload) => {
  const current = await getById(id);

  const { score_overall, ...safePayload } = payload;

  const hasScoreUpdate = SCORE_FIELDS.some((f) => f in safePayload);
  if (hasScoreUpdate) {
    const staff      = Number(safePayload.score_staff      ?? current.score_staff);
    const env        = Number(safePayload.score_environment ?? current.score_environment);
    const curriculum = Number(safePayload.score_curriculum  ?? current.score_curriculum);

    if (!isNaN(staff) && !isNaN(env) && !isNaN(curriculum)) {
      safePayload.score_overall = Math.round((staff + env + curriculum) / 3 * 10) / 10;
    }
  }

  return model.update(id, safePayload);
};

const deleteReview = async (id) => {
  await getById(id);
  return model.remove(id);
};

const getByParentId = async (parentId) => {
  return model.findByParentId(parentId);
};

const getByCenterId = async (centerId) => {
  return model.findByCenterId(centerId);
};

module.exports = { getById, getByParentId, getByCenterId, createReview, updateReview, deleteReview };
