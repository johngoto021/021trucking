import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const body = req.body;
  const myrecord = await prisma.shipment.delete({
    where: {
      //shipmentCuid: body.shipmentCuid
      shipmentCuid: "cl7ydo8h700103wmniu9cwubz"
    },
  });
 
  return res.status(200).json(myrecord, { success: true });

}