import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const metabaseRouter = express.Router();

metabaseRouter.get('/metabase/:dashboardId', async (req, res) => {
    const formId = parseInt(req.params.dashboardId);

    try {
        // Query your Form model using Prisma
        const form = await prisma.feedbackForm.findUnique({
            where: { id: formId },
        });

        // If the form doesn't exist, return 404
        if (!form) {
            return res.status(404).json({ error: "Form does not exist" });
        }

        // Apply your offset rule (e.g., Form ID 1 -> Metabase ID 2)
        const metabaseId = formId + 1;

        // Optional: If you only have built dashboards up to a certain ID limit
        const MAX_FORM_ID = 2; 
        if (formId > MAX_FORM_ID) {
            return res.status(404).json({ error: "Dashboard does not exist yet" });
        }

        const payload = {
            resource: { dashboard: metabaseId },
            params: {},
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 10)
        };

        const secretKey = process.env.METABASE_SECURE_KEY;
        if (!secretKey) {
            return res.status(500).json({ error: "METABASE_SECURE_KEY is not defined." });
        }

        const token = jwt.sign(payload, secretKey);
        res.json({ token });
    } catch (err) {
        console.error("Error generating Metabase token:", err);
        res.status(500).json({ error: err });
    }
});

export default metabaseRouter;