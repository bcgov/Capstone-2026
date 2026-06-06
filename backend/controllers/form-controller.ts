import { Response, Request } from 'express';
import { PrismaClient, QuestionType } from '@prisma/client';

const express = require('express');
const prisma = new PrismaClient();

const getFormById = async(req: Request, res: Response) => {
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
          where: { id: req.body.id},
          update: {},
          create: {
            name: "Color change form",
            description: "A feedback form about the background color change button",
            is_active: true,
            version: 1,
            questions: {
              create: [
                {
                  questionType: QuestionType.TEXTAREA, 
                  question_text: "How color showed up when you clicked the button?",
                  is_required: true,
                  display_order: 1,
                },
                {
                  questionType: QuestionType.RADIO, 
                  question_text: "Does the color affect the visibility of the other content of the page?",
                  options:{
                    create:[
                    {
                      displayOrder: 1,
                      optionText: "Yes",
                      optionValue: "yes"
                    },
                    {
                      displayOrder: 2,
                      optionText: "No",
                      optionValue: "no"
                    }
                    ]
                  },
                  is_required: true,
                  display_order: 2, 
                },
                {
                  questionType: QuestionType.DROPDOWN,
                  question_text: "City",
                  options:{
                    create:[
                    {
                      displayOrder: 1,
                      optionText: "Vancouver",
                      optionValue: "vancouver"
                    },
                    {
                      displayOrder: 2,
                      optionText: "Victoria",
                      optionValue: "victoria"
                    },
                    {
                      displayOrder: 3,
                      optionText: "Kelowna",
                      optionValue: "kelowna"
                    }
                     ]
                   },
                  is_required: true,
                  display_order: 3,
                },
                {
                  questionType: QuestionType.SLIDER,
                  question_text: "On a scale of 1-5, how happy are you with the color change?",
                  defaultAnswer: 3,
                  is_required: true,
                  display_order: 4,
                }
              ]
            }
          },
      });
    res.status(201).json(newForm); 
  } catch (error: any) {
    // 1. Logs the true message directly inside your active Docker 'api' console
    console.error("❌ CREATE FORM DB CRASH:", error); 
    
    // 2. Returns the true readable error text back to your curl terminal response
    res.status(500).json({ 
      error: "Failed to create form", 
      message: error.message || error 
    });  
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

const test = async (req: Request, res: Response)=> {
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

export {createForm, getFormById, getForms, deleteForm, test};