const express = require('express');
const {
  getProgressSummaryHandler,
  getProgressByRoadmapHandler,
  updateNodeProgressHandler,
  deleteNodeProgressHandler,
} = require('../controllers/progressController');

const router = express.Router();

// GET /api/progress/summary - Get progress summary for all roadmaps
router.get('/summary', getProgressSummaryHandler);

// GET /api/progress/:roadmapId - Get all node statuses for a roadmap
router.get('/:roadmapId', getProgressByRoadmapHandler);

// PATCH /api/progress/:roadmapId/nodes/:nodeId - Update node progress status
router.patch('/:roadmapId/nodes/:nodeId', updateNodeProgressHandler);

// DELETE /api/progress/:roadmapId/nodes/:nodeId - Delete/Reset node progress
router.delete('/:roadmapId/nodes/:nodeId', deleteNodeProgressHandler);

module.exports = router;
