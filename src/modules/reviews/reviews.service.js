const model = require('./reviews.model');

const getById = async (id) => {
  const review = await model.findById(id);
  if (!review) throw Object.assign(new Error('Review not found'), { status: 404 });
  return review;
};

const SCORE_FIELDS = ['score_staff', 'score_enviroment', 'score_curriculum'];

const createReview = async (payload) => {
  const { score_overall, review_id, ...safePayload } = payload;

  const { score_staff, score_enviroment, score_curriculum } = safePayload;
  if (score_staff != null && score_enviroment != null && score_curriculum != null) {
    safePayload.score_overall = Math.round((score_staff + score_enviroment + score_curriculum) / 3 * 10) / 10;
  }

  return model.create(safePayload);
};

const updateReview = async (id, payload) => {
  const current = await getById(id);

  const { score_overall, ...safePayload } = payload;

  const hasScoreUpdate = SCORE_FIELDS.some((f) => f in safePayload);
  if (hasScoreUpdate) {
    const staff      = safePayload.score_staff      ?? current.score_staff;
    const env        = safePayload.score_enviroment ?? current.score_enviroment;
    const curriculum = safePayload.score_curriculum ?? current.score_curriculum;

    if (staff != null && env != null && curriculum != null) {
      safePayload.score_overall = Math.round((staff + env + curriculum) / 3 * 10) / 10;
    }
  }

  return model.update(id, safePayload);
};

const deleteReview = async (id) => {
  await getById(id);
  return model.remove(id);
};

module.exports = { getById, createReview, updateReview, deleteReview };
