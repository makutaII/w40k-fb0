import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {

  return await prisma.w_skill.findMany({
    // новая фишка призмы для зависимых таблиц
    relationLoadStrategy: "query",

    select: {
      id:true,
      name: true,
      description: true,
      
      char: {
        select: {
          name: true,
        },
      },
      specs: true,
    },
    
  });
});
