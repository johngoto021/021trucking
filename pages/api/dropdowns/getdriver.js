import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const mylist = await prisma.driver.findMany(
    {
      select: {
        driverName: true,
        driverId: true,
        driverCuid: true,
        driverStatus: true,
        companyName: true,
      },
      where: {
        driverStatus: 1
      },
      orderBy: {
        driverName: 'asc',
      }
    }
  );
  return res.status(200).json(mylist, { success: true });

}