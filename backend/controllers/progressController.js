const {
  getProgressByRoadmap,
  getProgressSummary,
  updateNodeProgress,
  deleteNodeProgress,
} = require('../models/progressModel');

const getProgressSummaryHandler = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    const summary = await getProgressSummary(userId);
    res.json(summary);
  } catch (err) {
    console.error('Error fetching progress summary:', err);
    res.status(500).json({ error: 'Failed to fetch progress summary' });
  }
};

const getProgressByRoadmapHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const roadmapId = req.params.roadmapId;

    if (!userId) return res.status(401).json({ error: 'User not authenticated' });
    if (!roadmapId) return res.status(400).json({ error: 'roadmapId is required' });

    const progress = await getProgressByRoadmap(userId, roadmapId);
    res.json(progress);
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

const updateNodeProgressHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { roadmapId, nodeId } = req.params;
    const { status } = req.body;

    if (!userId) return res.status(401).json({ error: 'User not authenticated' });
    if (!roadmapId || !nodeId || !status) {
      return res.status(400).json({ error: 'roadmapId, nodeId, and status are required' });
    }

    const validStatuses = ['done', 'in-progress', 'skip', 'pending'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Use: ${validStatuses.join(', ')}` });
    }

    await updateNodeProgress(userId, roadmapId, nodeId, status);
    res.json({ success: true, message: 'Progress updated', status });
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

const deleteNodeProgressHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { roadmapId, nodeId } = req.params;

    if (!userId) return res.status(401).json({ error: 'User not authenticated' });
    if (!roadmapId || !nodeId) {
      return res.status(400).json({ error: 'roadmapId and nodeId are required' });
    }

    await deleteNodeProgress(userId, roadmapId, nodeId);
    res.json({ success: true, message: 'Progress reset' });
  } catch (err) {
    console.error('Error deleting progress:', err);
    res.status(500).json({ error: 'Failed to delete progress' });
  }
};

module.exports = {
  getProgressSummaryHandler,
  getProgressByRoadmapHandler,
  updateNodeProgressHandler,
  deleteNodeProgressHandler,
};
