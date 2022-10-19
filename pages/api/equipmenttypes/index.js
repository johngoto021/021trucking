//import prisma from 'prisma'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createEquipmentType(req, res);
  } else if (req.method === "GET") {
    return await listEquipmentType(req, res);
  } else if (req.method === "PUT") {
    return await updateEquipmentType(req, res);    
  } else if (req.method === "DELETE") {
  return await archiveEquipmentType(req, res);    
  //return res.status(305).json({ message: "Method Delete", success: false });  
  } else {
    return 
    //res.status(405).json({ message: "Method not allowed", success: false });
    res.status(405).json({ message: "Method not allowed", success: false });
  }
  
}

async function listEquipmentType(req, res) {
  try {
    const equipmentTypelist = await prisma.equipmentType.findMany();
    return res.status(200).json(equipmentTypelist, { success: true });
    //console.log(equipmentTypelist.json());
  } catch (error) {
    console.log(error);
    //console.error('Request error', error)
    //res.status(500).json({ error: 'Error listing equipmentType', success: false });
    return;
    //res.status(507).json({ error: "Error reading from database", success: false });
    res.status(500).json({ error: "Error creating equipmentType.", success: false });
  }
}

async function createEquipmentType(req, res) {
  const body = req.body;
  try {
      
    const newEntry = await prisma.equipmentType.create({
      data: {
        equipmentTypeName: body.equipmentTypeName,
        equipmentTypeActive: parseInt(body.equipmentTypeActive),
      },
    });

    //return res.status(200).json(newEntry, { success: true });
    return res.json(newEntry);

  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating equipmentType.", success: false });
  }
}

async function updateEquipmentType(req, res) {
  const body = req.body;
  try {
    const myrecord = await prisma.equipmentType.update({
      where: {
        equipmentTypeCuid: body.equipmentTypeCuid,
      },
      data: {
        equipmentTypeName: body.equipmentTypeName,
        equipmentTypeActive: parseInt(body.equipmentTypeActive),
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error updating Accessorial.", success: false });
  }
}

async function archiveEquipmentType(req, res) {
  const body = req.body;
  //console.log(body.equipmentTypeActive);
  try {
    const toggleStatus = body.equipmentTypeActive == 1 ? 0 : 1;
    const myrecord = await prisma.equipmentType.update({
      where: {
        equipmentTypeCuid: body.equipmentTypeCuid,
      },
      data: {
        equipmentTypeActive: toggleStatus
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error archiving Accessorial.", success: false });
  }
}