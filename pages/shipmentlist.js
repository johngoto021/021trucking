//import prisma from 'prisma'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createAccounts(req, res);
  } else if (req.method === "GET") {
    return await listAccounts(req, res);
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
    res.status(350).json({ error: "Error creating account.", success: false });
  }
}

async function createAccounts(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.account.create({
      data: {
        accountName: body.accountName,
        referenceNumber: body.referenceNumber,
        emailAddress: body.emailAddress,
        website: body.website,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        region: body.stateProvince,
        postalCode: body.postalCode,
        country: body.country,
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating account.", success: false });
  }
}
