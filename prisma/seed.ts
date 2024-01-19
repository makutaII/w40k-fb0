import { w_talents } from "./w_Talent-with-id";
import { w_requirements } from "./w_Requirement";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let w_t of w_talents) {
    await prisma.w_Talent.create({
      data: w_t,
    });
    }
  for (let w_r of w_requirements) {
    await prisma.w_Requirement.create({
      data: w_r,
    });
  }    
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

//--- из схемы
//   model w_Talent {
//   id           Int             @id @default(autoincrement())
//   name         String?         @db.VarChar(255)
//   description  String?
//   requirements w_Requirement[]
// }
