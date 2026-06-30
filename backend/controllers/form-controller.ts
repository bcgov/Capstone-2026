import { Response, Request } from 'express';
import { PrismaClient, QuestionType } from '@prisma/client';

const express = require('express');
const prisma = new PrismaClient();

const getFormById = async (req: Request, res: Response) => {
  const formId = Number(req.params.id);
  try {
    const form = await prisma.feedbackForm.findUnique({
      where: { id: formId },
      include: {
        questions: {
          include: {
            answers: true,
            options: true
          },
        },
      },
    });
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ error: 'Form not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch form', details: error.message });
  }
}

const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await prisma.feedbackForm.findMany({
      include: {
        questions: {
          include: {
            answers: true,
            options: true
          },
        },
      },
    });
    res.status(200).json(forms);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch forms', details: error.message });
  }
};

/**
 * @summary This is the POST call to create the form. 
 * Updated to handle explicit stringification errors and prevent crashing.
 */
const createForm = async (req: Request, res: Response) => {
  try {
    const newForm = await prisma.feedbackForm.upsert({
      where: { id: req.body.id },
      update: {},
      create: {
        owner: {
          connect: {
            id: Number(req.body.ownerId)
          }
        },
        name: req.body.name ?? "Untitled form",
        description: req.body.description ?? "Unknown description",
        is_active: req.body.is_active ?? false,
        version: req.body.version ?? 1,
        questions: {
          create: req.body.questions.map((question: any) => ({
            questionType: question.questionType,
            question_text: question.question_text,
            is_required: question.is_required,
            display_order: question.display_order,
            options: question.options? {
              create: question.options.map((option: any) => ({
                optionText: option.optionText,
                optionValue: option.optionValue,
                displayOrder: option.displayOrder
              }))
            } : undefined
          }))
        }
      },
      include: {
        questions: true
      }
    });
    res.status(201).json(newForm);
  } catch (error: any) {
    console.error(" CREATE FORM DB CRASH:", error);

    res.status(500).json({
      error: "Failed to create form",
      message: error.message || error
    });
  }
};

const updateQuestion = async (req: Request, res: Response) => {
  const { formId, questionId } = req.params;
  const { field, value } = req.body;

  try {
    const updatedQuestion = await prisma.question.update({
      where: { formId: Number(formId), id: Number(questionId) },
      data: { [field]: value },
    });
    res.status(200).json(updatedQuestion);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update question', details: error.message });
  }
}

const updateQuestionOrder = async (req: Request, res: Response) => {
  const { formId, questionId } = req.params;
  const { newOrder } = req.body;

  try {
    const questions = await prisma.question.findMany({
      where: { formId: Number(formId) },
      orderBy: { display_order: 'asc' },
    });

    const currentQuestion = questions.find(q => q.id === Number(questionId));
    if (!currentQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const updatedQuestions = questions.map(q => {
      if (q.id === Number(questionId)) {
        return { ...q, display_order: newOrder };
      }
      if (q.display_order >= newOrder && q.id !== Number(questionId)) {
        return { ...q, display_order: q.display_order + 1 };
      }
      return q;
    });

    await Promise.all(updatedQuestions.map(q =>
      prisma.question.update({
        where: { id: q.id },
        data: { display_order: q.display_order },
      })
    ));

    res.status(200).json({ message: 'Question order updated successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update question order', details: error.message });
  }
}

const deleteQuestion = async (req: Request, res: Response) => {
  const questionId = Number(req.params.questionId);
  try {
    await prisma.question.delete({
      where: { id: questionId },
    });
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete question', details: error.message });
  }
};

const deleteForm = async (req: Request, res: Response) => {
  const formId = Number(req.params.id);
  try {
    await prisma.feedbackForm.delete({
      where: { id: formId },
    });
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete form', details: error.message });
  }
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

const test = async (req: Request, res: Response) => {
  try {
    const testAdd = await prisma.feedbackForm.create({ data: { name: "Test" } });
    console.log(testAdd);

    const testFind = await prisma.feedbackForm.findMany({ where: { id: testAdd.id } });
    console.log(testFind);

    const testDelete = await prisma.feedbackForm.delete({ where: { id: testAdd.id } });
    console.log(testDelete);

    res.status(200).send('this is a test');
  } catch (error: any) {
    res.status(500).send(`Test route crashed: ${error.message}`);
  }
}

const getFormsByOwnerId = async (req: Request, res: Response) => {
    try{
        const ownerWithForms = await prisma.owner.findUnique({
            where: { id: 1 },
            include: {
                FeedbackForm: true
            }
        });
        res.status(200).json(ownerWithForms);
    }
    catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch forms for owner', details: error.message });
    }
}

export { createForm, getFormById, getForms, updateQuestion, updateQuestionOrder, deleteQuestion, deleteForm, getFormsByOwnerId, test };