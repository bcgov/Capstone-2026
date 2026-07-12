import express from 'express';
import jwt from 'jsonwebtoken';

const metabaseRouter= express.Router();

metabaseRouter.get('/dashboard/metabase', (req, res) => {
    const payload = {
        resource: { dashboard: 1 }, // Your dashboard ID
        params: {},
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 10) // Token expires in 10 minutes
    };

    const token = jwt.sign(payload, process.env.METABASE_SECURE_KEY!);

    const embedUrl = `https://metabase-route-b4cd74-dev.apps.silver.devops.gov.bc.ca/embed/dashboard/${token}#theme=light&bordered=false&titled=true`;

    res.json({ url: embedUrl });
});

export default metabaseRouter;