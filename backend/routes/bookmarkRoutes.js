const express = require('express');
const {
  getBookmarksHandler,
  checkBookmarkHandler,
  toggleBookmarkHandler,
} = require('../controllers/bookmarkController');

const router = express.Router();

// GET /api/bookmarks – get all bookmarked roadmaps
router.get('/', getBookmarksHandler);

// GET /api/bookmarks/:roadmapId/check – check if specific roadmap is bookmarked
router.get('/:roadmapId/check', checkBookmarkHandler);

// POST /api/bookmarks/:roadmapId – toggle bookmark
router.post('/:roadmapId', toggleBookmarkHandler);

module.exports = router;
