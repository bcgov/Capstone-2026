import { PrismaClient, QuestionType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')
  
  // 1. Explicitly clear children first to prevent key/state locking issues
  await prisma.answer.deleteMany({})
  await prisma.questionOption.deleteMany({})
  await prisma.question.deleteMany({})
  await prisma.feedbackForm.deleteMany({})

  console.log('🧹 Existing database records cleared successfully.')

  // ... your prisma.feedbackForm.create code goes right below here


  // Your exact form configuration from your controller
  const feedbackForm = await prisma.feedbackForm.create({
    data: {
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
            display_order: 1, 
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
  })

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
