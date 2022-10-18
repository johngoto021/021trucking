import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const mylist = await prisma.shipment.findMany(
   
{

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
}


  );

  const strserialize = JsonConvert.SerializeObject(mylist);

  return res.status(200).json(strserialize, { success: true });

}