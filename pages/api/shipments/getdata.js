import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const mylist = await prisma.shipment.findMany(

{
  select: {
    shipmentId: true,
    shipmentName: true,
    shipmentCuid: true,
    trackingNumber: true,
    moNumber: true,
    houseBillNumber: true,
    equipmentTypeCuid: true,
    accountCuid: true,
  },
  orderBy: [
        {
          shipmentId: 'desc',
        }
      ]
}

  
  );
 
  return res.status(200).json(mylist, { success: true });

}