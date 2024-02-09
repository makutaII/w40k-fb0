import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => { 
  const body = await readBody(event);
console.log (body)

  return await prisma.w_skill.findUnique({
    where: {
     //id: 3,
      id: body.id,
    },
   
    //{include: { requirements: true }, }
  });
});
 
