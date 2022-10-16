import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const mylist = await prisma.equipmentType.findMany(
    {
      select: {
        equipmentTypeName: true,
        equipmentTypeId: true,
        equipmentTypeCuid: true,
        equipmentTypeActive: true,
      },
      where: {
        equipmentTypeActive: 1
      },
      orderBy: {
        equipmentTypeName: 'asc',
      }
    }
  );
  return res.status(200).json(mylist, { success: true });

}