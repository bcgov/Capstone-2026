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
    where: { name: "Color change form" },
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
async function makeRandomUsers(count: number) {
  const users = []
  for (let i = 0; i < count; i++) {
    const hashedPassword = await bcrypt.hash(faker.internet.password(), 10)
    const user = await prisma.owner.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        passwordHash: hashedPassword,
      }
    })
    users.push(user)
  }
  console.log(`✅ ${count} random users created.`)
  return users
}

async function makeRandomSubmissions(count: number, users: any[]) {
  const feedbackForm = await prisma.feedbackForm.findFirst({
    where: { name: "Color change form" },
    include: { questions: true }
  })

  if (!feedbackForm) {
    throw new Error('Feedback form not found. Please seed the feedback form first.')
  }

  for (let i = 0; i < count; i++) {
    await prisma.feedbackSubmission.create({
      data: {
        formId: feedbackForm.id,
        submitted_at: faker.date.recent(),
        user : users[Math.floor(Math.random() * users.length)],
        answers: {
          create: feedbackForm.questions.map(question => {
            let answerValue = ""

            if(question.questionType === QuestionType.TEXTAREA) {
              answerValue = faker.color.human()
            } else if(question.questionType === QuestionType.RADIO) {
              answerValue = faker.helpers.arrayElement(["yes", "no"])
            } else if(question.questionType === QuestionType.CHECKBOX) {
              answerValue = faker.helpers.arrayElement(["text_visibility", "image_visibility"])
            } else if(question.questionType === QuestionType.DROPDOWN) {
              answerValue = faker.helpers.arrayElement(["vancouver", "victoria", "kelowna"])
            } else if(question.questionType === QuestionType.SLIDER) {
              answerValue = faker.number.int({ min: 1, max: 10 }).toString()
            }

            return {
              questionId: question.id,
              answerValue: answerValue
            }
          }),
        }
      }
    })
  }
  console.log(`✅ ${count} random submissions created.`)
}

async function main() {
  console.log('🌱 Starting database seeding...')

  await makeAdminUser()

  const feedbackForm = await makeColorChangeForm()

  const users = await makeRandomUsers(10)
  await makeRandomSubmissions(10, users)
  
  console.log(`✅ Seeded: "${feedbackForm.name}" created successfully!`)
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
