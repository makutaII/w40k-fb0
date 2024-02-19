import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => { 
  const body = await readBody(event);
// console.log('body=', body);
// console.log("body");
  return await prisma.w_characteristic.findUnique({
    where: {
      //id: 3,
      id: body.id,
    },
    // новая фишка призмы для зависимых таблиц
    relationLoadStrategy: "query",

    select: {
      id: true,
      name: true,
      description: true,
      skills: {
        select: {
          id: true,
          name: true,
          description: true,
          specs: true,
        },
      },
    },
    //{include: { requirements: true }, }
  });
  
});
 
