import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const shipments = await prisma.account.findMany();
 
  return res.status(200).json(shipments, { success: true });

}