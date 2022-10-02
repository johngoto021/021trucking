import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

/*
const Data = {
  shipmentName:              string,
  accountCuid:               string,
  trackingNumber: string,
  moNumber:                  string,
  houseBillNumber:           string,
  trackingUrl:               string,
  shipmentPaid:              Int,
  shipmentCustomerRate:      Int,
  internalRate:              Int,
  shipmentCustomerTotalCost: Int,
  internalTotalCost: Int,
  equipmentTypeId: Int
}
*/


function replacer(key, value) {
  console.log(typeof value);
  if (key === 'number') {
    return parseFloat;
  }
  return value;
}


export default async function handler(req, res) {
  const body = req.body;
  const equipments = JSON.parse(body.equipmentTypeCuid);
  const loads = body.formValues;

  //let userStrReplacer = JSON.stringify(loads, replacer);
  //console.log(userStrReplacer)
  //window.alert(userStrReplacer)
  
  try{
    const myrecord = await prisma.shipment.create({
      data: {
        shipmentName: body.shipmentName,
        accountCuid: body.accountCuid,
        trackingNumber: body.trackingNumber,
        moNumber: body.moNumber,
        houseBillNumber: body.houseBillNumber,
        shipmentEquipments:{
          //create: petsObject
          //create: [{"equipmentTypeCuid":"cl81y57mj00144wmnmn12cemm"},{"equipmentTypeCuid":"cl81y5k3000224wmn7c2secic"},{"equipmentTypeCuid":"cl81y5tl800304wmnoaw7lb9n"},{"equipmentTypeCuid":"cl81y64fp00384wmn87q01g3m"}]
          create: equipments
          //body.equipmentTypeCuid 
          },
          
          shipmentLoads:{
            //create: [{"loadTypeCuid":"cl8rljpp00228z8mnkrpnwhe6","quantity":3.0}]
            //create:  [{loadTypeCuid: 'cl8rljpp00228z8mnkrpnwhe6',quantity: 3}]
          /*create:  [{loadTypeCuid: 'cl8rljpp00228z8mnkrpnwhe6',
                quantity: 3,
                length: 7,
                width: 5,
                height: 6,
                totalWeight: 6,
                stackable: 1
              }
            ]
            */
            create: loads
            //body.equipmentTypeCuid 
            }
            
        } 
      });
      //const jobj = JSON.stringify(myrecord); 

      //console.log("hello" +  jobj);
      //return res.status(200).json(myrecord, {message: "data saved", success: true });
      return res.json(myrecord);
  }
  
catch {

  return res.status(500).json({message: "data not saved", success: false });
}
   
return res.status(200).json({message: "data not saved", success: true });
}


  //console.log(body.equipmentTypeCuid);
  
  /*
  const myrecord = await prisma.shipment.create({
    data: {
      shipmentName: 'shipmentTest20220926', 
      accountCuid: 'cl827iebm0180mcmnwu7ms9rl',
      trackingNumber: 'tracking number123',
      moNumber: 'Mo Number',
      houseBillNumber: 'house bill number',
      shipmentEquipments:{
        create: [{"equipmentTypeCuid":"cl81y5k3000224wmn7c2secic"},{"equipmentTypeCuid":"cl81y5tl800304wmnoaw7lb9n"},{"equipmentTypeCuid":"cl81y64fp00384wmn87q01g3m"}]
        }
      } 
    });
  */
/*
  const myrecord = await prisma.shipment.create({
    data: {
      shipmentName: body.shipmentName,
      accountCuid: body.accountCuid,
      trackingNumber: body.trackingNumber,
      moNumber: body.moNumber,
      houseBillNumber: body.houseBillNumber,
      shipmentEquipments:{
        create: body.equipmentTypeCuid 
        }
      } 
    });
*/ 
/*
    const myrecord = await prisma.shipment.create({
      include: {
        shipmentEquipments: {
        },
      },
      data: {
        shipmentName: 'shipmentTest1234', 
      accountCuid: 'cl827iebm0180mcmnwu7ms9rl',
      trackingNumber: 'tracking number123',
      moNumber: 'Mo Number',
      houseBillNumber: 'house bill number',
      shipmentEquipments: {
          create: [
            {
              equipmentTypeCuid: 'cl81y57mj00144wmnmn12cemm',
              
            },
            {
              equipmentTypeCuid: 'cl81y5k3000224wmn7c2secic',
              
            },
          ],
        },
      },
    });
*/