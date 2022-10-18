//import prisma from 'prisma'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createAccount(req, res);
  } else if (req.method === "GET") {
    return await listAccounts(req, res);
  } else if (req.method === "PUT") {
    return await updateAccount(req, res);  
  } else if (req.method === "DELETE") {
    return await archiveAccount(req, res);    
    //return res.status(305).json({ message: "Method Delete", success: false });
  } else {
    return 
    //res.status(405).json({ message: "Method not allowed", success: false });
    res.status(405).json({ message: "Method not allowed", success: false });
  }
}

async function listAccounts(req, res) {
  try {
    const accountslist = await prisma.account.findMany();
    return res.status(200).json(accountslist, { success: true });
    console.log(accountslist);
    //return res.status(200).json(accountslist, {success: true});
    //return (<>Hello</>);
  } catch (error) {
    console.log(error);
    //console.error('Request error', error)
    //res.status(500).json({ error: 'Error listing accounts', success: false });
    return;
    //res.status(507).json({ error: "Error reading from database", success: false });
    res.status(350).json({ error: "Error creating Account.", success: false });
  }
}


async function createAccount(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.account.create({
      data: {
        accountName: body.accountName,
        referenceNumber: body.referenceNumber,
        website: body.website,
        phone: body.phone,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        region: body.region,
        postalCode: body.postalCode,
        emailAddress: body.emailAddress,
        contact: body.contact,
        country: body.country
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error creating account.", success: false });
  }
}


async function updateAccount(req, res) {
  const body = req.body;
  try {
    const myrecord = await prisma.account.update({
      where: {
        accountCuid: body.accountCuid,
      },
      data: {
        accountName: body.accountName,
        referenceNumber: body.referenceNumber,
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
    return res.status(500).json({ error: "Error updating Account.", success: false });
  }
}

async function archiveAccount(req, res) {
  const body = req.body;
  console.log(body.accountStatus);
  try {
    const toggleStatus = body.accountStatus == 1 ? 0 : 1;
    const myrecord = await prisma.account.update({
      where: {
        accountCuid: body.accountCuid,
      },
      data: {
        accountStatus: toggleStatus
      },
    });
    return res.status(200).json(myrecord, { success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error: "Error archiving Account.", success: false });
  }
}