import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let tal = null;

  if (body.id)
    tal = await prisma.w_talent.delete({
      where: {
        id: body.id,
      },
    });
  return tal;
});
