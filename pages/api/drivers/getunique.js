import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  //const mylist = await prisma.driver.findMany();
  const driverCuid = req.query.drivercuid;

  try{
    const mylist = await prisma.driver.findUnique({
      where: {
        driverCuid: driverCuid
  
      }
    });
    return res.json(mylist);
    }
  catch {
    return res.status(500).json({message: "data not saved", success: false });
    }
  return res.status(200).json(mylist, {message: "data saved", success: true});

}