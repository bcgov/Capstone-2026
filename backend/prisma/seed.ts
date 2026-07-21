import { PrismaClient, QuestionType } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { create } from 'domain'

const prisma = new PrismaClient()

async function makeAdminUser() {
  const hashedPassword = await bcrypt.hash('capslock', 10)
  const adminUser = await prisma.owner.upsert({
    where: { email: 'admin@cst.com' },
    update: {},
    create: {
      email: 'admin@cst.com',
      name: 'Admin User',
      passwordHash: hashedPassword,
    }
  })
  console.log(`✅ Admin user created: ${adminUser.name} (${adminUser.email})`)
}

async function makeColorChangeForm() {
  const feedbackForm = await prisma.feedbackForm.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Color change form",
      description: "A feedback form about the background color change button",
      owner: {
        connect: { email: 'admin@cst.com' }
      },
      is_active: true,
      version: 1,
      questions: {
        create: [
          {
            questionType: QuestionType.TEXTAREA,
            question_text: "What color showed up when you clicked the button?",
            is_required: true,
            display_order: 1,
          },
          {
            questionType: QuestionType.RADIO,
            question_text: "Does the color affect the visibility of the other content of the page?",
            options: {
              create: [
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
            questionType: QuestionType.CHECKBOX,
            question_text: "If you answered 'Yes', which component does it affect most?",
            options: {
              create: [
                {
                  displayOrder: 1,
                  optionText: "Text visibility",
                  optionValue: "text_visibility"
                },
                {
                  displayOrder: 2,
                  optionText: "Image visibility",
                  optionValue: "image_visibility"
                }
              ]
            },
            is_required: false,
            display_order: 3,
          },
          {
            questionType: QuestionType.DROPDOWN,
            question_text: "City",
            options: {
              create: [
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
                  displayOrder: 4,
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
            question_text: "How happy are you with the color change?",
            is_required: true,
            display_order: 5,
          }
        ]
      }
    },
  });

  return feedbackForm
}

async function makeNpmForm() {
  const feedbackForm = await prisma.feedbackForm.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "NMP Form",
      description: "A form to test user's satisfaction with adding dairy cattle workflow",
      owner: {
        connect: { email: 'admin@cst.com' }
      },
      is_active: true,
      version: 1,
      questions: {
        create: [
          {
            questionType: QuestionType.TEXTAREA,
            question_text: "If there is a breed(s) of cattle that is not available please add it here:",
            is_required: false,
            display_order: 1,
          },
          {
            questionType: QuestionType.SLIDER,
            question_text: "Satisfaction with workflow of adding dairy cattle?",
            is_required: true,
            display_order: 2,
          },
          {
            questionType: QuestionType.CHECKBOX,
            question_text: "Which of the auto filled fields did you need to alter the values?",
            options: {
              create: [
                {
                  displayOrder: 1,
                  optionText: "None",
                  optionValue: "none"
                },
                {
                  displayOrder: 2,
                  optionText: "Breed",
                  optionValue: "breed"
                },
                {
                  displayOrder: 3,
                  optionText: "Milk Production",
                  optionValue: "milk_production"  
                },
                {
                  displayOrder: 4,
                  optionText: "Milking Centre Wash Water",
                  optionValue: "milking_centre_wash_water"
                },
                {
                  displayOrder: 5,
                  optionText: "Units",
                  optionValue: "units"
                }
              ]
            },
            is_required: false,
            display_order: 3,
          },
        ]
      }
    },
  });

  return feedbackForm
}

async function makeRandomUsers(count: number) {
  const users = []
  for (let i = 0; i < count; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
      }
    })
    users.push(user)
  }
  console.log(`✅ ${count} random users created.`)
  return users
}

async function makeRandomSubmissions(form: any, count: number, users: any[]) {
  const feedbackForm = await prisma.feedbackForm.findFirst({
    where: { name: form.name },
    include: { questions: {include: { options: true } } }
  })

  if (!feedbackForm) {
    throw new Error('Feedback form not found. Please seed the feedback form first.')
  }

  for (let i = 0; i < count; i++) {
    await prisma.feedbackSubmission.create({
      data: {
        formId: feedbackForm.id,
        submitted_at: faker.date.recent(),
        userId: users[Math.floor(Math.random() * users.length)].id,
        answers: {
          create: feedbackForm.questions.map(question => {
            const answerValue : any = {
              questionId: question.id,
            }

            if(question.questionType === QuestionType.TEXTAREA) {
              if(form.id==2){
                answerValue.answerText = faker.helpers.arrayElements(["Jersey","Ayrshire","Milking Shorthorn"], {min: 1, max: 3}).join(", ")
              }
              else {
                answerValue.answerText = faker.color.human()
              }
            } 
            else if(question.questionType === QuestionType.RADIO) {
              const options = faker.helpers.arrayElement(question.options)
              answerValue.answerText = options.optionText
              answerValue.answerBoolean = options.optionText === "Yes"
            } 
            else if(question.questionType === QuestionType.CHECKBOX) {
              const selectedOptions = faker.helpers.arrayElements(question.options, {
                min: 1,
                max: question.options.length
              })
              answerValue.answerText = selectedOptions.map((option:any) => option.optionText).join(", ")
            } 
            else if(question.questionType === QuestionType.DROPDOWN) {
              const options = faker.helpers.arrayElement(question.options)
              answerValue.answerText = options.optionText
            } 
            else if(question.questionType === QuestionType.SLIDER) {
              answerValue.answerNumber = faker.number.int({ min: 1, max: 10 })
            }

            return answerValue
          }),
        }
      }
    })
  }
  console.log(`✅ ${count} random submissions created.`)
}

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear out any existing forms safely to prevent conflicts
  await prisma.answer.deleteMany({});
  await prisma.feedbackSubmission.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.feedbackForm.deleteMany({});

  // Reset the auto-increment counter for the ID column back to 1
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "FeedbackForm_id_seq" RESTART WITH 1;`
  );
  await makeAdminUser()

  const colorChangeForm = await makeColorChangeForm()
  const npmForm = await makeNpmForm()
  
  const submissionCount = await prisma.feedbackSubmission.count();

  if (submissionCount > 50) {
    console.log(`⚠️  Skipping submission seeding. There are already ${submissionCount} submissions in the database.`)
    return
  } 
  else{
    const users = await makeRandomUsers(10)
    await makeRandomSubmissions(colorChangeForm, 10, users)
    await makeRandomSubmissions(npmForm, 10, users)
  }

  console.log(`✅ Seeded: "${colorChangeForm.name}" created successfully!`)
  console.log(`✅ Seeded: "${npmForm.name}" created successfully!`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
