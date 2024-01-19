import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {

  const body = await readBody(event)
  let tal = null
  
  if (body.name)
    await prisma.w_Talent
      .create({
        data: {
          name: body.name,
          description: body.description,
          requirements: body.requerments,
        },
      })
      .then((response) => {
        tal = response;
      });

  return {
    tal: tal,
  };
})
