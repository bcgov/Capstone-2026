import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const express = require('express');
const prisma = new PrismaClient();

const getUserDataById = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch user', details: error.message });
  }
};

const getAllUserData = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};

const createUserData = async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.userData.create({
      data: {
        buttonClickCount: req.body.button_click_count,
      },
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

export { getUserDataById, getAllUserData, createUserData };