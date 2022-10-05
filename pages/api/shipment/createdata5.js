import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const body = req.body;
  const equipments = JSON.parse(body.equipmentTypeCuid);
  const accessories = JSON.parse(body.accessorialCuid);
  const loads = body.formValues;
  const locations = body.formLocationValues;

  try{
    const myrecord = await prisma.shipment.create({
      data: {
        shipmentName: body.shipmentName,
        accountCuid: body.accountCuid,
        trackingNumber: body.trackingNumber,
        moNumber: body.moNumber,
        houseBillNumber: body.houseBillNumber,
        shipmentStatus : body.shipmentStatus,
        shipmentNote : body.shipmentNote,
        shipmentEquipments:{
          create: equipments
          },
        shipmentAccessorials:{
          create: accessories
          },
        shipmentLoads:{
          create: loads
          },
          /*
        shipmentLocations:{
          create: locations
          },
          */
        },
      });
    return res.json(myrecord);
    }
  catch {
    return res.status(500).json({message: "data not saved", success: false });
    }
  return res.status(200).json({message: "data saved", success: true });
}