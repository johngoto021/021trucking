import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createDriver(req, res);
  } else if (req.method === "GET") {
    return await listDrivers(req, res);
  } else if (req.method === "PUT") {
    return await updateDriver(req, res);  
  } else if (req.method === "DELETE") {
    return await archiveDriver(req, res);    
    //return res.status(305).json({ message: "Method Delete", success: false });
  } else {
    return 
    //res.status(405).json({ message: "Method not allowed", success: false });
    res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function listDrivers(req, res) {
  try {
    const mylist = await prisma.driver.findMany();
    return res.status(200).json(mylist, { success: true });
  } catch (error) {
    console.log(error);
    //console.error('Request error', error)
    //res.status(500).json({ error: 'Error listing accounts', success: false });
    return;
    //res.status(507).json({ error: "Error reading from database", success: false });
    res.status(350).json({ error: "Error creating Driver.", success: false });
  }
}

async function createDriver(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.driver.create({
      data: {
        driverName: body.driverName,
        companyName: body.companyName,
        website: body.website,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        region: body.region,
        postalCode: body.postalCode,
        emailAddress: body.emailAddress,
        //contact: body.contact,
        country: body.country
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error creating Driver.", success: false });
  }
}

async function updateDriver(req, res) {
  const body = req.body;
  try {
    const myrecord = await prisma.driver.update({
      where: {
        driverCuid: body.driverCuid,
      },
      data: {
        driverName: body.driverName,
        companyName: body.companyName,
        website: body.website,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        region: body.region,
        postalCode: body.postalCode,
        emailAddress: body.emailAddress,
        //contact: body.contact,
        country: body.country
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error updating Driver.", success: false });
  }
}

async function archiveDriver(req, res) {
  const body = req.body;
  try {

    const toggleStatus = body.driverStatus == 1 ? 0 : 1;
    const myrecord = await prisma.driver.update({
      where: {
        driverCuid: body.driverCuid,
      },
      data: {
        driverStatus: toggleStatus
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    console.log('error')
    return res.status(500).json({ error: "Error archiving Driver.", success: false });
  }
}