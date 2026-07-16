import express from 'express';
import jwt from 'jsonwebtoken';

const metabaseRouter = express.Router();

metabaseRouter.get('/metabase/:dashboardId', (req, res) => {
    const payload = {
        resource: { dashboard: parseInt(req.params.dashboardId) + 1 }, //dashboard 1 is the example dashboard on metabase, so we add 1 to get our self-made dashboard
        params: {},
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 10) // 10 minutes
    };

    const secretKey = process.env.METABASE_SECURE_KEY;
    if (!secretKey) {
        return res.status(500).json({ error: "METABASE_SECURE_KEY is not defined on the server." });
    }

    const token = jwt.sign(payload, secretKey);

    res.json({ token: token });
});

export default metabaseRouter;