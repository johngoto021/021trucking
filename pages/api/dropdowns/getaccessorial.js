import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const mylist = await prisma.accessorial.findMany(
    {
    select: {
      accessorialName: true,
      accessorialId: true,
      accessorialCuid: true,
      accessorialActive: true,
      },
    where: {
      accessorialActive: 1
    },
    orderBy: {
        accessorialName: 'asc',
      }
    }
  );
  return res.status(200).json(mylist, { success: true });
}