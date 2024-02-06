import { w_talents } from "./w_talent-id-seed";
import { w_requirements } from "./w_requirement-seed";

import { w_characteristics } from "./w_characteristic-seed";
import { w_skills } from "./w_skill-seed";
import { w_specializations } from "./w_specialization-seed";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // for (let w_t of w_talents) {
  //   await prisma.w_talent.create({
  //     data: w_t,
  //   });
  // }
  // for (let w_r of w_requirements) {
  //   await prisma.w_requirement.create({
  //     data: w_r,
  //   });
  // }

  for (let w_c of w_characteristics) {
    await prisma.w_characteristic.create({
      data: w_c,
    });
  }
  
  for (let w_s of w_skills) {
    await prisma.w_skill.create({
      data: w_s,
    });
  }

  for (let w_sp of w_specializations) {
    await prisma.w_specialization.create({
      data: w_sp,
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
