const pool = require('../config/database');

async function getGuideCompletionMap(userId) {
  const [rows] = await pool.query(
    `SELECT guide_id, completed, completed_at
     FROM user_guide_completion
     WHERE user_id = ?`,
    [userId]
  );

  const map = {};
  for (const r of rows) {
    map[r.guide_id] = {
      guide_id: String(r.guide_id),
      completed: Boolean(r.completed),
      completed_at: r.completed_at ? new Date(r.completed_at).toISOString() : null,
    };
  }
  return map;
}

async function upsertGuideCompletion(userId, guideId, completed) {
  const completedAt = completed ? new Date() : null;

  await pool.query(
    `INSERT INTO user_guide_completion (user_id, guide_id, completed, completed_at)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       completed = VALUES(completed),
       completed_at = VALUES(completed_at),
       updated_at = CURRENT_TIMESTAMP`,
    [userId, guideId, completed ? 1 : 0, completedAt]
  );

  return { guide_id: guideId, completed, completed_at: completedAt ? completedAt.toISOString() : null };
}

module.exports = {
  getGuideCompletionMap,
  upsertGuideCompletion,
};
