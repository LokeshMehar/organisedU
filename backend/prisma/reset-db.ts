import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Choose one of these functions depending on what you want to do:
  
  // Option 1: Only reset sequences but keep data
//   await resetSequences()
  
  // OR
  
  // Option 2: Clear all data and reset sequences
  await clearAndResetSequences()
}

async function resetSequences() {
  await prisma.$executeRaw`ALTER SEQUENCE "User_userId_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Team_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Project_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "ProjectTeam_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Task_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "TaskAssignment_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Attachment_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Comment_id_seq" RESTART WITH 1`;
}

async function clearAndResetSequences() {
  await prisma.$executeRaw`TRUNCATE TABLE "Comment" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Attachment" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "TaskAssignment" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Task" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProjectTeam" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Project" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Team" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })