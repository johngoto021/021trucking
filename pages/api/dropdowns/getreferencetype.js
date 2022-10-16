import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const mylist = await prisma.referenceType.findMany(
    {
      select: {
        referenceTypeName: true,
        referenceTypeId: true,
        referenceTypeCuid: true,
        referenceTypeActive: true,
      },
      where: {
        referenceTypeActive: 1
      },
      orderBy: {
        referenceTypeName: 'asc',
      }
    }
  );
  return res.status(200).json(mylist, { success: true });

}