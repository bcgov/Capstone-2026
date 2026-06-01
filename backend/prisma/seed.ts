import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clean up existing data to prevent duplicate keys or clutter on re-runs
  await prisma.feedbackForm.deleteMany({})

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
            questionType: "textarea", 
            question_text: "How color showed up when you clicked the button?",
            is_required: true,
            display_order: 1,
          },
          {
            questionType: "radio", 
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
            questionType: "dropdown",
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
