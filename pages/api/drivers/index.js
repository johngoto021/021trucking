import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  if (req.method==='GET'){
    const mylist = await prisma.driver.findMany();
    return res.status(200).json(mylist, { success: true });
  }
  else if (req.method==='POST'){
    const body = req.body;
    const myrecord = await prisma.driver.create({
      data: {
        driverName: body.driverName,
        companyName: body.companyName,
        website: body.website,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        region: body.region,
        postalCode: body.postalCode,
        emailAddress: body.emailAddress,
        //contact: body.contact,
        country: body.country
        },
      });
      return res.status(200).json(myrecord, { success: true });
  
  } 
}