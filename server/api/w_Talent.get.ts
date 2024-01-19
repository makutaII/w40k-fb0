import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {  // async
  return await prisma.w_Talent.findMany(
   // {include: { requirements: true }, }
  );
});
