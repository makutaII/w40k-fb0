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
      char_id:true,
      
      char: {
        select: {
          name: true,
          description:true,
        },
      },
      specs: true,
    },
    
  });
});
