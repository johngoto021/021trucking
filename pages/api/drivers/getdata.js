import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const mylist = await prisma.driver.findMany();
 
  return res.status(200).json(mylist, { success: true });

}