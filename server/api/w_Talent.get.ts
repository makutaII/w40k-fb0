import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  return prisma.w_Talent.findMany({
    include: { requirements: true },
  });



});
