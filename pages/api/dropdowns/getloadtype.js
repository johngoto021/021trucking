import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const mylist = await prisma.loadType.findMany(
    {
      select: {
        loadTypeName: true,
        loadTypeId: true,
        loadTypeCuid: true,
        loadTypeActive: true,
      },
      where: {
        loadTypeActive: 1
      },
      orderBy: {
        loadTypeName: 'asc',
      }
    }
  );
  return res.status(200).json(mylist, { success: true });

}