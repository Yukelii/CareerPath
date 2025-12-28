const pool = require('../config/database');

/**
 * Get all node statuses for a specific user and roadmap.
 * Returns object: { [node_id]: status }
 */
async function getProgressByRoadmap(userId, roadmapId) {
  try {
    const [rows] = await pool.query(
      'SELECT node_id, status FROM user_node_progress WHERE user_id = ? AND roadmap_id = ?',
      [userId, roadmapId]
    );

    const progress = {};
    rows.forEach((row) => {
      progress[row.node_id] = row.status;
    });

    return progress;
  } catch (err) {
    console.error('Error fetching progress:', err);
    throw err;
  }
}

/**
 * Summary must match frontend's ProgressSummaryItem (snake_case fields).
 * Returns array of { roadmap_id, total_tracked, done_count }
 */
async function getProgressSummary(userId) {
  try {
    const [rows] = await pool.query(
      `SELECT
        roadmap_id,
        COUNT(*) AS total_tracked,
        SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS done_count
      FROM user_node_progress
      WHERE user_id = ?
      GROUP BY roadmap_id
      ORDER BY done_count DESC, total_tracked DESC`,
      [userId]
    );

    // Ensure numeric values are numbers (mysql2 may return strings for aggregates)
    return rows.map((r) => ({
      roadmap_id: String(r.roadmap_id),
      total_tracked: Number(r.total_tracked) || 0,
      done_count: Number(r.done_count) || 0,
    }));
  } catch (err) {
    console.error('Error fetching progress summary:', err);
    throw err;
  }
}

async function updateNodeProgress(userId, roadmapId, nodeId, status) {
  try {
    const result = await pool.query(
      `INSERT INTO user_node_progress
        (user_id, roadmap_id, node_id, status)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        status = VALUES(status),
        updated_at = CURRENT_TIMESTAMP`,
      [userId, roadmapId, nodeId, status]
    );
    return result;
  } catch (err) {
    console.error('Error updating progress:', err);
    throw err;
  }
}

async function deleteNodeProgress(userId, roadmapId, nodeId) {
  try {
    const result = await pool.query(
      
      [userId, roadmapId, nodeId]
    );
    return result;
  } catch (err) {
    console.error('Error deleting progress:', err);
    throw err;
  }
}

module.exports = {
  getProgressByRoadmap,
  getProgressSummary,
  updateNodeProgress,
  deleteNodeProgress,
};
