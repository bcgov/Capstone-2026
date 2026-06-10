import { PrismaClient, QuestionType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')
  
  // // 1. Explicitly clear children first to prevent key/state locking issues
  // await prisma.answer.deleteMany({})
  // await prisma.questionOption.deleteMany({})
  // await prisma.question.deleteMany({})
  // //await prisma.feedbackSubmission.deleteMany({})
  // await prisma.feedbackForm.deleteMany({})

  console.log('🧹 Existing database records cleared successfully.')
    const feedbackForm = await prisma.feedbackForm.upsert({
          where: { id: 1},
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
                  question_text: "What color showed up when you clicked the button?",
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
                  questionType: QuestionType.MULTIPLE_CHOICE,
                  question_text: "If you answered 'Yes', which component does it affect most?",
                  options:{
                    create:[
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
                  is_required: true,
                  display_order: 3,
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
                  question_text: "On a scale of 1-5, how happy are you with the color change?",
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
