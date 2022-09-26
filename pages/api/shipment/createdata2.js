import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

/*
const Data = {
  shipmentName:              string,
  accountCuid:               string,
  trackingNumber: string,
  moNumber:                  string,
  houseBillNumber:           string,
  trackingUrl:               string,
  shipmentPaid:              Int,
  shipmentCustomerRate:      Int,
  internalRate:              Int,
  shipmentCustomerTotalCost: Int,
  internalTotalCost: Int,
  equipmentTypeId: Int
}
*/

export default async function handler(req, res) {
  const body = req.body;
  const myrecord = await prisma.shipment.create({
    data: {
      shipmentName: body.shipmentName,
      accountCuid: body.accountCuid,
      trackingNumber: body.trackingNumber,
      moNumber: body.moNumber,
      houseBillNumber: body.houseBillNumber,
      //equipmentTypeCuid: body.equipmentTypeCuid
    },
  });
 
  return res.status(200).json(myrecord, { success: true });

}