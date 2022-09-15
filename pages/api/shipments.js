//import prisma from 'prisma'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createShipments(req, res);
  } else if (req.method === "GET") {
    return await listShipments(req, res);
  } else {
    return 
    //res.status(405).json({ message: "Method not allowed", success: false });
    res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function listShipments(req, res) {
  try {
    const Shipmentslist = await prisma.shipment.findMany();
    return res.status(200).json(Shipmentslist, { success: true });
    console.log(Shipmentslist);
    
  } catch (error) {
    console.log(error);
    
    return;
    res.status(350).json({ error: "Error getting shipment.", success: false });
  }
}

async function createShipments(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.shipment.create({
      data: {
        shipmentName: body.shipmentName,
        accountCuid: body.accountCuid,
        trackingNumber: body.trackingNumber,
        moNumber: body.moNumber,
        houseBillNumber: body.houseBillNumber,
        equipmentTypeCuid: body.equipmentTypeCuid
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating shipment.", success: false });
  }
}
