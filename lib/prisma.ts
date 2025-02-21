// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   global.p = prisma;
// }

export default prisma;
