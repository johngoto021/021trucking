import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();



export default async function handler(req, res) {
  
  const body = req.body;
  const myrecord = await prisma.equipmentType.create({
    data: {
      equipmentTypeName: 'test',
    },
  });

  return res.status(200).json(myrecord, { success: true });
 
  
}