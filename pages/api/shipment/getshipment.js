import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const shipments = await prisma.shipment.findMany({
    
       
        select: {
          // This will work!
          shipmentName: true,
          shipmentCuid: true,
          shipmentCustomerRate: true,
          shipmentCustomerTotalCost: true,
          
          accounts: {
            select: {
              accountName: true,
            },
          },
          equipmentTypes:{
            select: {
              equipmentTypeName: true,
              
            }
          }
        },





    
});
 
  return res.status(200).json(shipments, { success: true });

}