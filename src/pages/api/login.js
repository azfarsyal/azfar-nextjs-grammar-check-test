import { generateToken } from '@/utils/auth';

function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { username, password } = req.body;

      // Applied minimalistic authentication for demonstration purposes only:
      // Adding user id default as 1, rather than storing in DB and use the user table identifier
      if (
        username === process.env.USER_NAME &&
        password === process.env.USER_PASSWORD
      ) {
        const token = generateToken({ id: 1, username });
        return res.status(200).json({ message: 'Login successful', token });
      } else {
        return res
          .status(401)
          .json({
            error: 'Invalid credentials: Please enter valid credentials!',
          });
      }
    } else {
      return res.status(405).json({ error: 'Request Method Not Allowed' });
    }
  } catch (error) {
    console.error('Login API Error:', error);
    res.status(500).json({ error: 'Error occurred while logging in' });
  }
}

export default handler;
