import authMiddleware from '@/middleware/authMiddleware';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({
          error: 'Text is required: Please provide text for grammar checking',
        });
    }

    try {
      const response = await fetch(
        `${process.env.GRAMMAR_API_BASE_URL}/check`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `text=${encodeURIComponent(
            text
          )}&language=en&enabledOnly=false`,
        }
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Grammar Check API Error:', error);
      res.status(500).json({ error: 'Error occurred while checking grammar' });
    }
  } else {
    res.status(405).json({ error: 'Request Method Not Allowed' });
  }
}

export default authMiddleware(handler);
