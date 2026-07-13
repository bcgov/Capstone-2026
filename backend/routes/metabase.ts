import express from 'express';
import jwt from 'jsonwebtoken';

const metabaseRouter = express.Router();

// Match your frontend's endpoint: /api/metabase
metabaseRouter.get('/metabase', (req, res) => {
    const payload = {
        resource: { dashboard: 1 }, // Your dashboard ID
        params: {},
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 10) // 10 minutes
    };

    const secretKey = process.env.METABASE_SECURE_KEY;
    if (!secretKey) {
        return res.status(500).json({ error: "METABASE_SECURE_KEY is not defined on the server." });
    }

    // Sign the token
    const token = jwt.sign(payload, secretKey);

    // Return exactly what your frontend is looking for: data.token
    res.json({ token: token });
});

export default metabaseRouter;