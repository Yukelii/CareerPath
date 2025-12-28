const {
  getGuideCompletionMap,
  upsertGuideCompletion,
} = require('../models/guideModel');

// GET /api/guides/completion
const getGuideCompletionHandler = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    const map = await getGuideCompletionMap(userId);
    res.json(map);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch guide completion' });
  }
};

// PUT /api/guides/:guideId/completion
const setGuideCompletionHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { guideId } = req.params;
    const { completed } = req.body;

    if (!userId) return res.status(401).json({ error: 'User not authenticated' });
    if (!guideId) return res.status(400).json({ error: 'guideId is required' });
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'completed must be boolean' });
    }

    const result = await upsertGuideCompletion(userId, guideId, completed);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update guide completion' });
  }
};

module.exports = {
  getGuideCompletionHandler,
  setGuideCompletionHandler,
};
