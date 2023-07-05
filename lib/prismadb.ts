
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient()

// Now check wheere globalThis.prisma or PrismaClient() is selected
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb;