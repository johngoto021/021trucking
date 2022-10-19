//import prisma from 'prisma'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createReferenceType(req, res);
  } else if (req.method === "GET") {
    return await listReferenceType(req, res);
  } else if (req.method === "PUT") {
    return await updateReferenceType(req, res);    
  } else if (req.method === "DELETE") {
    return await archiveReferenceType(req, res);   
  } else {
    return 
    //res.status(405).json({ message: "Method not allowed", success: false });
    res.status(405).json({ message: "Method not allowed", success: false });
  }
  
}

async function listReferenceType(req, res) {
  try {
    const referenceTypelist = await prisma.referenceType.findMany();
    return res.status(200).json(referenceTypelist, { success: true });
    //console.log(referenceTypelist.json());
  } catch (error) {
    console.log(error);
    //console.error('Request error', error)
    //res.status(500).json({ error: 'Error listing referenceType', success: false });
    return;
    //res.status(507).json({ error: "Error reading from database", success: false });
    res.status(500).json({ error: "Error creating referenceType.", success: false });
  }
}

async function createReferenceType(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.referenceType.create({
      data: {
        referenceTypeName: body.referenceTypeName,
        referenceTypeActive: parseInt(body.referenceTypeActive),
      },
    });
      
    //return res.status(200).json(newEntry, { success: true });
    return res.json(newEntry);

  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating Reference Type.", success: false });
  }
}

async function updateReferenceType(req, res) {
  const body = req.body;
  try {
    const myrecord = await prisma.referenceType.update({
      where: {
        referenceTypeCuid: body.referenceTypeCuid,
      },
      data: {
        referenceTypeName: body.referenceTypeName,
        referenceTypeActive: parseInt(body.referenceTypeActive),
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error updating Accessorial.", success: false });
  }
}

async function archiveReferenceType(req, res) {
  const body = req.body;
  
  try {
    const toggleStatus = body.referenceTypeActive == 1 ? 0 : 1;
    const myrecord = await prisma.referenceType.update({
      where: {
        referenceTypeCuid: body.referenceTypeCuid,
      },
      data: {
        referenceTypeActive: toggleStatus
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error archiving Reference Type.", success: false });
  }
}