import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const body = req.body;
  const myrecord = await prisma.account.update({

    where: {
      accountCuid: 'cl7ydo8h700103wmniu9cwubz',
    },
    data: {
      accountName: 'My Shipment',
      /*
      accountCuid: body.accountCuid,
      trackingNumber: body.trackingNumber,
      moNumber: body.moNumber,
      houseBillNumber: body.houseBillNumber
      */
    },

  });
 
  return res.status(200).json(myrecord, { success: true });

}