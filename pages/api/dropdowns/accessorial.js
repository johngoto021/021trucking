//import prisma from 'prisma'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createAccessorial(req, res);
  } else if (req.method === "GET") {
    return await listAccessorial(req, res);
  } else {
    return 
    //res.status(405).json({ message: "Method not allowed", success: false });
    res.status(405).json({ message: "Method not allowed", success: false });
  }



}

async function listAccessorial(req, res) {
  try {
    const Accessoriallist = await prisma.accessorial.findMany();
    return res.status(200).json(Accessoriallist, { success: true });
    //console.log(Accessoriallist.json());
  } catch (error) {
    console.log(error);
    //console.error('Request error', error)
    //res.status(500).json({ error: 'Error listing Accessorial', success: false });
    return;
    //res.status(507).json({ error: "Error reading from database", success: false });
    res.status(500).json({ error: "Error creating accessorial.", success: false });
  }
}

async function createAccessorial(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.accessorial.create({
      data: {
        accessorialName: body.accessorialName,
        accessorialActive: parseInt(body.accessorialActive),
      },
    });
    
      
    return res.status(200).json(newEntry, { success: true });

  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating accessorial.", success: false });
  }
}

