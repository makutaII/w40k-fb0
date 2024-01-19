import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

  const body = await readBody(event)
  let req = null
  
  if (body.name)
    await prisma.w_Requirement
      .create({
        data: {
          name: body.name,
          talentId: body.talentId,
        },
      })
      .then((response) => {
        req = response;
      });

  return {
    req: req,
  };
})
