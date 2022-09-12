import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await addShipment(req, res);
  } 
  else if (req.method === 'GET') {
    return await getShipments(req, res);
  } 
  else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}


async function getShipments(req, res) {
  const body = req.body
  try {
    const newEntry = await prisma.shipment.create({
      data: {
        name: body.firstName,
        email: body.email,
        subject: body.subject,
        message: body.message
      }
    })
    return res.status(200).json(newEntry, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating shipment', success: false })
  }
}

async function addShipment(req, res) {
  const body = req.body
  try {
    const newEntry = await prisma.shipment.create({
      data: {
        name: body.firstName,
        email: body.email,
        subject: body.subject,
        message: body.message
      }
    })
    return res.status(200).json(newEntry, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating shipment', success: false })
  }
}
