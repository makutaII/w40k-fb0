import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

  const body = await readBody(event)
  let tal = null
  
  if (body.name)
    await prisma.w_talent
      .create({
        data: {
          name: body.name,
          description: body.description,
          requirements: body.requirements,
        },
      })
      .then((response) => {
        tal = response;
      });

  return {
    tal: tal,
  };
})
