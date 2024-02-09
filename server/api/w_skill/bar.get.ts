import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => { 
//  const body = await readBody(event);
//console.log (body)

  return await prisma.w_skill.findMany({
    where: {
     
      //id: body.id,
    },
   
    //{include: { requirements: true }, }
  });
});
 
