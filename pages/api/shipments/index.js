//import prisma from 'prisma'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createShipment(req, res);
  } else if (req.method === "GET") {
    return await listShipments(req, res);
  } else if (req.method === "PUT") {
    return await updateShipment(req, res);  
  } else if (req.method === "DELETE") {
    return await archiveShipment(req, res);    
    //return res.status(305).json({ message: "Method Delete", success: false });
  } else {
    return 
    //res.status(405).json({ message: "Method not allowed", success: false });
    res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function listShipments(req, res) {
  try {
    const shipmentslist = await prisma.shipment.findMany({

      where: {
        shipmentStatus: 1,
        },
    
      select: {
        shipmentId: true,
        shipmentCuid: true,
        shipmentName: true,
        trackingNumber: true,
        moNumber: true,
        houseBillNumber: true,
        accountCuid: true,
        shipmentNote: true,
        shipmentTimeZone: true,
        shipmentDateAdded: true,
        shipmentDateUpdated: true,
        trackingUrl: true,
        shipmentCustomerRate: true,
        internalRate: true,
        shipmentCustomerTotalCost: true,
        internalTotalCost: true,
        shipmentStatus: true,
        shipmentTotalWeight: true,
        shipmentTotalDimension: true,
        accounts: {
          select :{
            accountName: true,
          },
        },
    
        shipmentEquipments: {
          select: {
            shipmentEquipmentId: true,
            shipmentEquipmentCuid: true,
            equipmentTypes: {
              select: {
                equipmentTypeName: true,
              },
            },
          },
        },
    
        shipmentLoads: {
          select: {
            shipmentLoadId: true,
            shipmentLoadCuid: true,
            quantity: true,
            length: true,
            width: true,
            height: true,
            totalWeight: true,
            stackable: true,   
            loadTypes: {
              select: {
                loadTypeName: true,
              },
            },
          },
        },
    
        shipmentAccessorials: {
          select: {
            shipmentAccessorialId: true,
            shipmentAccessorialCuid: true,
            accessorials: {
              select: {
                accessorialName: true,
              },
            },
          },
        },
    
        shipmentLocations: {
          select: {
            shipmentLocationId: true,
            shipmentLocationCuid: true,
            locationType: true,
            locationName: true,
            locationFullAddress: true,
            locationContact: true,
            locationPhone: true,
            locationReference: true,
            dateStart: true,
            dateEnd: true,
            timeStart: true,
            timeEnd: true,
          },
        },
      },
      orderBy: [
        {
          shipmentId: 'desc',
        }
      ]

    });
    return res.status(200).json(shipmentslist, { success: true });
    console.log(shipmentslist);
    //return res.status(200).json(shipmentslist, {success: true});
    //return (<>Hello</>);
  } catch (error) {
    console.log(error);
    //console.error('Request error', error)
    //res.status(500).json({ error: 'Error listing shipments', success: false });
    return;
    //res.status(507).json({ error: "Error reading from database", success: false });
    res.status(350).json({ error: "Error creating Shipment.", success: false });
  }
}


async function createShipment(req, res) {
  const body = req.body;
  const equipments = JSON.parse(body.equipmentTypeCuid);
  const accessories = JSON.parse(body.accessorialCuid);
  const loads = body.formValues;
  const locations = body.formLocationValues;
  try {
    const newEntry = await prisma.shipment.create({
      data: {
        shipmentName: body.shipmentName,
        accountCuid: body.accountCuid,
        trackingNumber: body.trackingNumber,
        moNumber: body.moNumber,
        houseBillNumber: body.houseBillNumber,
        shipmentStatus : body.shipmentStatus,
        shipmentNote : body.shipmentNote,
        shipmentTimeZone : body.shipmentTimeZone,
        shipmentEquipments:{
          create: equipments
          },
        shipmentAccessorials:{
          create: accessories
          },
        
        shipmentLoads:{
          create: loads
          },
        
        shipmentLocations:{
          create: locations
          },
        
        },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error creating Shipment.", success: false });
  }
}


async function updateShipment(req, res) {
  const body = req.body;
  try {
    const myrecord = await prisma.shipment.update({
      where: {
        shipmentCuid: body.shipmentCuid,
      },
      data: {
        driverCuid: body.driverCuid,
        shipmentActive: body.shipmentActive,
        shipmentStatus: body.shipmentStatus,
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error updating Shipment.", success: false });
  }
}

async function archiveShipment(req, res) {
  const body = req.body;
  console.log(body.shipmentStatus);
  try {
    const toggleStatus = body.shipmentStatus == 1 ? 0 : 1;
    const myrecord = await prisma.shipment.update({
      where: {
        shipmentCuid: body.shipmentCuid,
      },
      data: {
        shipmentStatus: toggleStatus
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error archiving Shipment.", success: false });
  }
}