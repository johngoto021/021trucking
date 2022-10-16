import { useState } from "react";
import Link from 'next/link'
import Layout from "../../components/layout";
import prisma from '../../lib/prisma'

//const prisma = new PrismaClient();

export const getServerSideProps = async ({params}) => {

  const { shipmentcuid } = params;
  const shipmentData = await prisma.shipment.findUnique({

      where: {
        shipmentCuid: shipmentcuid,
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
        shipmentActive: true,
        shipmentStatus: true,
        shipmentPaid: true,
        shipmentCustomerRate: true,
        internalRate: true,
        shipmentCustomerTotalCost: true,
        internalTotalCost: true,
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


  });
  console.log(shipmentData);
  return {
    props: {
      shipmentinfo: shipmentData
    }
  }
}

export default function ShipmentForm({ shipmentinfo }) {

  //const router = useRouter();
  //const {shipmentcuid} = router.query;
  //const fetchURL = "/api/shipments/getunique?shipmentcuid=" + router.query.shipmentcuid;
  const [shipmentName, setshipmentName] = useState(shipmentinfo.shipmentName);
  const [shipmentCuid, setshipmentCuid] = useState(shipmentinfo.shipmentCuid);
  const [shipmentId, setshipmentId] = useState(shipmentinfo.shipmentId);
  const [shipmentStatus, setshipmentStatus] = useState(shipmentinfo.shipmentStatus);

  const [submitmessage, setsubmitmessage] = useState("");

  const [accountCuid, setaccountCuid] = useState(shipmentinfo.accountCuid);
  const [equipmentTypeCuid, setequipmentTypeCuid] = useState([]);
  const [accessorialCuid, setaccessorialCuid] = useState([]);
  
  const [trackingNumber, settrackingNumber] = useState(shipmentinfo.trackingNumber);
  const [moNumber, setmoNumber] = useState(shipmentinfo.moNumber);
  const [houseBillNumber, sethouseBillNumber] = useState(shipmentinfo.houseBillNumber);
  const [shipmentNote, setShipmentNote] = useState(shipmentinfo.shipmentNote);
  const [shipmentTimeZone, setShipmentTimeZone] = useState(shipmentinfo.shipmentTimeZone);
  const [shipmentTotalWeight, setShipmentTotalWeight] = useState(shipmentinfo.shipmentTotalWeight);
  const [shipmentTotalDimension, setShipmentTotalDimension] = useState(shipmentinfo.shipmentTotalDimension);
  const [shipmentCustomerTotalCost, setShipmentCustomerTotalCost] = useState(shipmentinfo.shipmentCustomerTotalCost);

  const [driverCuid, setDriverCuid] = useState(shipmentinfo.driverCuid);
  const [shipmentPaid, setShipmentPaid] = useState(shipmentinfo.shipmentPaid);
  const [shipmentCustomerRate, setShipmentCustomerRate] = useState(shipmentinfo.shipmentCustomerRate);
  const [internalRate, setInternalRate] = useState(shipmentinfo.internalRate);
  const [shipmentActive, setShipmentActive] = useState(shipmentinfo.shipmentActive);



  
   
  const [formValues, setFormValues] = useState([{ loadTypeCuid: '', quantity : 0, length : 0, width : 0, height : 0, totalWeight : 0, stackable : 0 }])
  const [formLocationValues, setFormLocationValues] = useState([{ locationType: "P", locationName : "", locationFullAddress : "", dateStart : "", dateEnd : "", dateStart2 : "", dateEnd2 : "", locationReference : "", locationContact : "", locationPhone : "", timeStart : "", timeEnd : "" }])


  




  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      shipmentName,
      shipmentCuid,
      shipmentId,
      emailAddress,
      phone,
      website,
      address1,
      address2,
      city,
      region,
      postalCode,
      country,
      referenceNumber,
      emailAddress,
      contact,
      country,
      shipmentStatus,
      marginRate,
      };
    
    try {
      const response = await fetch("/api/shipments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      //console.log(body);

      if (response.status !== 200) {
        setsubmitmessage('System failed to update your request.  Please try again.');
        console.log("something went wrong");
        //set an error banner here
      } else {
        //resetForm();
        //seeshipments();
        setsubmitmessage('The change requests were updated successfully!');
        console.log("form submitted successfully !!!");
         return data;
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            shipment <span className="text-sm text-blue-600"><Link href="/shipments">View List</Link></span>
          </h1>
          <p>
            Use this form to add client shipment information. This information is
            used for billing and contact information.
          </p>
        </div>
      </header>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="shipmentCuid" value={shipmentinfo.shipmentCuid} />
              <input type="hidden" name="shipmentId" value={shipmentinfo.shipmentId} />
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    
                    <div className="col-span-6 sm:col-span-3">
                      Shipment ID: { shipmentinfo.shipmentId }
                      
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Shipment CUID: { shipmentinfo.shipmentCuid }
                      
                    </div>

                    

                <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                  <span className="text-red-500 mx-5 text-sm font-medium">{ submitmessage }</span>
                </div>

                  </div>
                </div>
                
              </div>
            </form>
          </div>
        </div>

        


      </div>
    </>
  );
}

ShipmentForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};