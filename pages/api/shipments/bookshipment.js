import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    return await bookShipment(req, res);
  } else {
    return 
    //res.status(405).json({ message: "Method not allowed", success: false });
    res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function bookShipment(req, res) {
  const body = req.body;
  try {
    const myrecord = await prisma.shipment.update({
      where: {
        shipmentCuid: body.shipmentCuid,
      },
      data: {
        shipmentStatus: 1,
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error updating Shipment.", success: false });
  }
}