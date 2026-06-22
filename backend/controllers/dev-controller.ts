import { Response, Request } from 'express';
import { PrismaClient, Developer } from '@prisma/client';

const express = require('express');
const prisma = new PrismaClient();

const getAllDev= async (req: Request, res: Response) => {
  try {
    const data = await prisma.developer.findMany();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch dev data', details: error.message });
  }
};

const createDev = async (req: Request, res: Response) => {
    const { username } = req.body;

    const developer = await prisma.developer.upsert({
        where: { email: username },
        update: {},
        create: {
            email: username,
            name: username,
            passwordHash: "hashed_placeholder"
        }
    });

    res.json({ id: developer.id });
};

const getDevById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const developer = await prisma.developer.findUnique({
            where: { id: Number(id) }
        });

        if (developer) {
            res.status(200).json(developer);
        } else {
            res.status(404).json({ error: 'Developer not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch developer', details: error.message });
    }
};

const deleteDev = async (req: Request, res: Response) => {
    const devId = Number(req.params.id);

    await prisma.developer.delete({
        where: { id: devId }
    });

    res.json({ message: "Developer account deleted" });
};

export { getAllDev, getDevById,createDev, deleteDev };