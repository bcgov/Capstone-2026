import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const express = require('express');
const prisma = new PrismaClient();

const getAllOwners = async (req: Request, res: Response) => {
    try {
        const data = await prisma.owner.findMany();
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch owner data', details: error.message });
    }
};

const createOwner = async (req: Request, res: Response) => {
    const { username } = req.body;

    const owner = await prisma.owner.upsert({
        where: { name: username },
        update: {},
        create: {
            email: username,
            name: username,
            passwordHash: "hashed_placeholder"
        }
    });

    res.json({ id: owner.id });
};

const getOwnerById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const owner = await prisma.owner.findUnique({
            where: { id: Number(id) }
        });

        if (owner) {
            res.status(200).json(owner);
        } else {
            res.status(404).json({ error: 'Owner not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch owner', details: error.message });
    }
};

const deleteOwner = async (req: Request, res: Response) => {
    const ownerId = Number(req.params.id);

    await prisma.owner.delete({
        where: { id: ownerId }
    });

    res.json({ message: "Owner account deleted" });
};

export { getAllOwners, getOwnerById, createOwner, deleteOwner };