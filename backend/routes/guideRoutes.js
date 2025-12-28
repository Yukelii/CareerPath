const express = require('express');
const {
  getGuideCompletionHandler,
  setGuideCompletionHandler,
} = require('../controllers/guideController');

const router = express.Router();

// GET /api/guides/completion
router.get('/completion', getGuideCompletionHandler);

// PUT /api/guides/:guideId/completion
router.put('/:guideId/completion', setGuideCompletionHandler);

module.exports = router;
