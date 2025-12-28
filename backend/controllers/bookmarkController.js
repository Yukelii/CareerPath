const {
  getBookmarkedRoadmaps,
  isBookmarked,
  addBookmark,
  removeBookmark,
} = require('../models/bookmarkModel');

/**
 * GET /api/bookmarks
 * Get all bookmarked roadmaps for current user
 */
const getBookmarksHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const bookmarks = await getBookmarkedRoadmaps(userId);
    res.json(bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
};

/**
 * GET /api/bookmarks/:roadmapId/check
 * Check if a specific roadmap is bookmarked
 */
const checkBookmarkHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { roadmapId } = req.params;

    if (!roadmapId) {
      return res.status(400).json({ error: 'roadmapId is required' });
    }

    const bookmarked = await isBookmarked(userId, roadmapId);
    res.json({ bookmarked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to check bookmark' });
  }
};

/**
 * POST /api/bookmarks/:roadmapId
 * Toggle bookmark (add if not exists, remove if exists)
 */
const toggleBookmarkHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { roadmapId } = req.params;

    if (!roadmapId) {
      return res.status(400).json({ error: 'roadmapId is required' });
    }

    const bookmarked = await isBookmarked(userId, roadmapId);

    if (bookmarked) {
      // Remove bookmark
      await removeBookmark(userId, roadmapId);
      res.json({ success: true, bookmarked: false, message: 'Bookmark removed' });
    } else {
      // Add bookmark
      await addBookmark(userId, roadmapId);
      res.json({ success: true, bookmarked: true, message: 'Bookmark added' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle bookmark' });
  }
};

module.exports = {
  getBookmarksHandler,
  checkBookmarkHandler,
  toggleBookmarkHandler,
};
