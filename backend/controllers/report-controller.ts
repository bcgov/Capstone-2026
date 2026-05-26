import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

// Initialize Express app and Prisma client
const express = require('express');
const app = express(); // <--- Creates the application instance
const prisma = new PrismaClient();

/**
 * @summary This is the  POST call to create the form. 
 * 05-26-2026 - This is a starting point, submission row will be included later. 
 */ 

app.get('/form', async (req: Request, res: Response) => {
  try {
    const forms = await prisma.feedbackForm.findMany({
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
});

app.post('/form', async (req: Request, res: Response) => {
  try {
    const newForm = await prisma.feedbackForm.create({
          data: {
            name: "Color change form",
            description: "A feedback form about the background color change button",
            isActive: true,
            version: 1,
            questions: {
              create: [
                {
                  formId: 1, 
                  questionType: "textarea", //this field tells the frontend how to render the question 
                  question_text: "How color showed up when you clicked the button?",
                  is_required: true,
                  display_order: 1,
                },
                {
                  formId: 1, 
                  questionType: "radio", //this field tells the frontend how to render the question 
                  question_text: "Does the color affect the visibility of the other content of the page?",
                  answers:{
                    create:[
                    {
                      submissionId: 1,
                      answerText: "Yes"
                    },
                    {
                      submissionId: 1,
                      answerText: "No"
                    }
                    ]
                  },
                  is_required: true,
                  display_order: 1, 
                },
                {
                  formId: 1,  
                  questionType: "dropdown",
                  question_text: "City",
                  answers:{
                    create:[
                    {
                      submissionId: 1,
                      answerText: "Vancouver"
                    },
                    {
                      submissionId: 1,
                      answerText: "Victoria"
                    },
                    {
                      submissionId: 1,
                      answerText: "Kelowna"
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to create form' });
  }
});

/**
 * @summary Add report is the main adding report page and from there
 *          we can add other reports ie - addSurfaceCoverageReport 
 */ 
const addReport = (req: Request, res: Response) => {
  res.status(200).send('Add report is working');
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
  const testAdd = await prisma.user.create({
    data: {
      email: 'test@test.com',
      name: 'test'
    }
  });

  console.log(testAdd);

  // find test
  const testFind = await prisma.user.findMany({
    where: {
      email: 'test@test.com',
      name: 'test'
    }
  });

  console.log(testFind);

  // delete test
  const testDelete = await prisma.user.delete({
    where: {
      email: 'test@test.com',
      name: 'test'
    }
  });

  console.log(testDelete);

  res.status(200).send('this is a test');
}

export {addReport, test};