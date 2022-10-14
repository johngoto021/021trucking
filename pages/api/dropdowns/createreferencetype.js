import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const body = req.body;
  const myrecord = await prisma.referenceType.create({
    data: {
      referenceTypeName: body.referenceTypeName,
      //referenceTypeName: test,
      referenceTypeActive: parseInt(body.referenceTypeActive),
    },
  });
console.log(body);
  return res.status(200).json(myrecord, { success: true });
  
}