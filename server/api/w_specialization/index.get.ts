import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {  
  return await prisma.w_specialization.findMany(
    //{include: { requirements: true }, }
  );
});

