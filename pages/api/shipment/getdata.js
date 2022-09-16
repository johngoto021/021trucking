import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const accounts = await prisma.shipment.findMany();
 
  return res.status(200).json(accounts, { success: true });
}