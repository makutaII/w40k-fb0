import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  
  const body = await readBody(event)
  const id = body.id
  const name = body.name
  const description = body.description
  //const requirements = body.requirements

  

  const upd = await prisma.w_talent.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
      //requirements: requirements,  
    },
  });

return upd
})
