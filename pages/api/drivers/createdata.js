import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

/*
const Data = {
  accountName:              string,
  accountCuid:               string,
  courierService: string,
  website:                  string,
  phone:           string,
  address1:               string,
  address2:              string,
  city:      string,
  region:              string,
  postalCode: string,
  emailAddress: string,
  contact: string
  country: string
}
*/

export default async function handler(req, res) {
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