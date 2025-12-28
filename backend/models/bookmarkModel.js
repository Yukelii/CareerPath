const pool = require('../config/database');

/**
 * Get all bookmarked roadmaps for a user
 * Returns: array of { roadmap_id, created_at }
 */
async function getBookmarkedRoadmaps(userId) {
  try {
    const [rows] = await pool.query(
      `SELECT roadmap_id, created_at 
       FROM user_roadmap_bookmarks 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [userId]
    );
    return rows;
  } catch (err) {
    console.error('Error fetching bookmarks:', err);
    throw err;
  }
}

/**
 * Check if a roadmap is bookmarked by a user
 */
async function isBookmarked(userId, roadmapId) {
  try {
    const [rows] = await pool.query(
      'SELECT 1 FROM user_roadmap_bookmarks WHERE user_id = ? AND roadmap_id = ?',
      [userId, roadmapId]
    );
    return rows.length > 0;
  } catch (err) {
    console.error('Error checking bookmark:', err);
    throw err;
  }
}

/**
 * Add a bookmark
 */
async function addBookmark(userId, roadmapId) {
  try {
    const [result] = await pool.query(
      'INSERT INTO user_roadmap_bookmarks (user_id, roadmap_id) VALUES (?, ?)',
      [userId, roadmapId]
    );
    return result;
  } catch (err) {
    console.error('Error adding bookmark:', err);
    throw err;
  }
}

/**
 * Remove a bookmark
 */
async function removeBookmark(userId, roadmapId) {
  try {
    const [result] = await pool.query(
      'DELETE FROM user_roadmap_bookmarks WHERE user_id = ? AND roadmap_id = ?',
      [userId, roadmapId]
    );
    return result;
  } catch (err) {
    console.error('Error removing bookmark:', err);
    throw err;
  }
}

module.exports = {
  getBookmarkedRoadmaps,
  isBookmarked,
  addBookmark,
  removeBookmark,
};
