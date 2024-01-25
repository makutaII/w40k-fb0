import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  
  const body = await readBody(event)
  const id = body.id
  const name = body.name

  

  const req = await prisma.w_Requirement.update({
    where: {
      id: id,
    },
    data: {
      name: name,

    },
  });

return req
})
