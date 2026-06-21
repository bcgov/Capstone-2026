import { Response, Request } from 'express';
import { PrismaClient, Developer } from '@prisma/client';

const express = require('express');
const prisma = new PrismaClient();

const getDevData = async (req: Request, res: Response) => {
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

const deleteDev = async (req: Request, res: Response) => {
    const devId = Number(req.params.id);

    await prisma.developer.delete({
        where: { id: devId }
    });

    res.json({ message: "Developer account deleted" });
};

export { getDevData, createDev, deleteDev };