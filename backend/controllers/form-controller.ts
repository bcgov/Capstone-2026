import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

// Initialize Express app and Prisma client
const express = require('express');
//const app = express(); // <--- Creates the application instance
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form' });
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
};

/**
 * @summary This is the  POST call to create the form. 
 * 05-26-2026 - This is a starting point, submission row will be included later. 
 * 05-27-2026 - Added this comment to recommit because GitHub used the wrong version of the file.
 */ 

const createForm = async (req: Request, res: Response) => {
  try {
    const newForm = await prisma.feedbackForm.create({
          data: {
            name: "Color change form",
            description: "A feedback form about the background color change button",
            is_active: true,
            version: 1,
            questions: {
              create: [
                {
                  questionType: "textarea", //this field tells the frontend how to render the question 
                  question_text: "How color showed up when you clicked the button?",
                  is_required: true,
                  display_order: 1,
                },
                {
                  questionType: "radio", //this field tells the frontend how to render the question 
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
                  display_order: 1, 
                },
                {
                  questionType: "dropdown",
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
                  display_order: 1,
                }
              ]
            }
          },
      });
    res.status(201).json(newForm); 
  }catch (error) {
    console.error(error);
    res.status(500).json({ error });  
  }
};

const deleteForm = async (req: Request, res: Response) => {
  const formId = Number(req.params.id);  
  try {
    await prisma.feedbackForm.delete({
      where: { id: formId },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete form', details: error });
  }
};

/**
 * @summary     Test is just as it says a test page. For now it is just
 *              for now it is just a blank page and the logs will only 
 *              show up in the compiler. It is just testing to see if CRUD
 *              commands are working with the database
 * @param req   a request being sent to this api endpoint
 * @param res   the response being sent by this api endpoint
 */

const test = async (req: Request, res: Response)=> {
  // add test
  const testAdd = await prisma.feedbackForm.create({});

  console.log(testAdd);

  // find test
  const testFind = await prisma.feedbackForm.findMany({
    where: {
      id: 1
    }
  });

  console.log(testFind);

  // delete test
  const testDelete = await prisma.feedbackForm.delete({
    where: {
      id: 1
    }
  });

  console.log(testDelete);

  res.status(200).send('this is a test');
}

export {createForm, getFormById, getForms, deleteForm, test};
