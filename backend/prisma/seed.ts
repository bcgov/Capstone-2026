import { PrismaClient, QuestionType } from '@prisma/client'
import bcrypt from 'bcryptjs'

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

async function main() {
  console.log('🌱 Starting database seeding...')

  console.log('🧹 Existing database records cleared successfully.')

  await makeAdminUser()

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
