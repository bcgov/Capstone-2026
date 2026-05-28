import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

// Initialize Express app and Prisma client
const express = require('express');
//const app = express(); // <--- Creates the application instance
const prisma = new PrismaClient();

const getSubmissionById = async (req: Request, res: Response) => {
  const submissionId = req.params.id;
  try {
    const submission = prisma.feedbackSubmission.findUnique({
      where: { id: Number(submissionId) },
      include: {
        answers: true,
      },
    });
    if (submission) {
      res.status(200).json(submission);
    } else {    
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
};

const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await prisma.feedbackSubmission.findMany({
      include: {
        answers: true,
      },
    });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

const createSubmission = async (req: Request, res: Response) => {
  try {
    const newSubmission = await prisma.feedbackSubmission.create({
      data: {
        formId: req.body.formId,
        session_id: req.body.session_id,
        anonymous_id: req.body.anonymous_id,
        page_url: req.body.page_url,
        answers: {
          create: req.body.answers.map((answer: any) => ({
            questionId: answer.questionId,
            answerText: answer.answerText,
            answerNumber: answer.answerNumber,
            answerBoolean: answer.answerBoolean,
            answerJson: answer.answerJson,
          })),
        },
      },
      include: {
        answers: true,
      },
    });
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create submission' });
  }
}

const deleteSubmission = async (req: Request, res: Response) => {
  const submissionId = req.params.id;
  try {
    await prisma.feedbackSubmission.delete({
      where: { id: Number(submissionId) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete submission' });
  }
}



// model FeedbackSubmission {
//   id                  Int      @id @default(autoincrement())
  
//   formId              Int
//   form                FeedbackForm @relation(fields: [formId], references: [id])

//   submitted_at        DateTime  @default(now())

//   session_id          String?
//   anonymous_id        String?

//   page_url            String?

//   userId              Int?
//   user                User?     @relation(fields: [userId], references: [id])

//   answers             Answer[]

//   createdAt           DateTime @default(now())
// }

// model Answer {
//   id                  Int      @id @default(autoincrement())
  
//   submissionId      Int
//   submission        FeedbackSubmission @relation(fields: [submissionId], references: [id])

//   questionId        Int
//   question          Question  @relation(fields: [questionId], references: [id])

//   answerText        String?
//   answerNumber      Float?
//   answerBoolean     Boolean?
//   answerJson        Json?

//   createdAt         DateTime  @default(now())
// }
export default {getSubmissionById, getAllSubmissions, createSubmission, deleteSubmission};
