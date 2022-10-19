import { useState } from "react";
import useSWR from "swr"
import Link from 'next/link'
import Layout from "../../components/layout";
import prisma from '../../lib/prisma'
import superjson from 'superjson';

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
            emailAddress: true,
          },
        },

        drivers:{
          select :{
            driverName: true,
            companyName: true,
            courierService: true,
          }
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
  const jsonString = superjson.stringify(shipmentData);
  //const { json, meta } = serialize(shipmentData);

  return {
    props: {
      shipmentinfo: jsonString
    }
    
  }
  //console.log(shipmentData);
}

export default function ShipmentForm({ shipmentinfo }) {

  const fetcher1 = async () => {
    const response = await fetch('/api/dropdowns/getdriver')
    const data = await response.json()
    return data
  };

  const { data: data1, error: error1 } = useSWR('name1', fetcher1);
  const myobject = superjson.parse(shipmentinfo);

  //console.log(shipmentinfo);
  //const router = useRouter();
  //const {shipmentcuid} = router.query;
  //const fetchURL = "/api/shipments/getunique?shipmentcuid=" + router.query.shipmentcuid;
  const [shipmentName, setshipmentName] = useState(myobject.shipmentName);
  const [shipmentCuid, setshipmentCuid] = useState(myobject.shipmentCuid);
  const [shipmentId, setshipmentId] = useState(myobject.shipmentId);
  const [shipmentStatus, setshipmentStatus] = useState(myobject.shipmentStatus);


  const [submitmessage, setsubmitmessage] = useState("");

  const [accountCuid, setaccountCuid] = useState(myobject.accountCuid);
  const [accountName, setaccountName] = useState(myobject.accounts.accountName);
  
  const [equipmentTypeCuid, setequipmentTypeCuid] = useState([]);
  const [shipmentEquipments, setShipmentEquipments] = useState(myobject.shipmentEquipments);

  const [accessorialCuid, setaccessorialCuid] = useState([]);
  
  const [trackingNumber, settrackingNumber] = useState(myobject.trackingNumber);
  const [moNumber, setmoNumber] = useState(myobject.moNumber);
  const [houseBillNumber, sethouseBillNumber] = useState(myobject.houseBillNumber);
  const [shipmentNote, setShipmentNote] = useState(myobject.shipmentNote);
  const [shipmentTimeZone, setShipmentTimeZone] = useState(myobject.shipmentTimeZone);
  const [shipmentTotalWeight, setShipmentTotalWeight] = useState(myobject.shipmentTotalWeight);
  const [shipmentTotalDimension, setShipmentTotalDimension] = useState(myobject.shipmentTotalDimension);
  const [shipmentCustomerTotalCost, setShipmentCustomerTotalCost] = useState(myobject.shipmentCustomerTotalCost);

  const [driverCuid, setDriverCuid] = useState(myobject.driverCuid);
  const [shipmentPaid, setShipmentPaid] = useState(myobject.shipmentPaid);
  const [shipmentCustomerRate, setShipmentCustomerRate] = useState(myobject.shipmentCustomerRate);
  const [internalRate, setInternalRate] = useState(myobject.internalRate);
  const [shipmentActive, setShipmentActive] = useState(myobject.shipmentActive);


  const [toEmail, setToEmail] = useState(myobject.accounts.emailAddress);
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState("Send");
   
  const [formValues, setFormValues] = useState([{ loadTypeCuid: '', quantity : 0, length : 0, width : 0, height : 0, totalWeight : 0, stackable : 0 }])
  const [formLocationValues, setFormLocationValues] = useState([{ locationType: "P", locationName : "", locationFullAddress : "", dateStart : "", dateEnd : "", dateStart2 : "", dateEnd2 : "", locationReference : "", locationContact : "", locationPhone : "", timeStart : "", timeEnd : "" }])


  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;
    
    if (toEmail.length <= 0) {
      tempErrors["toEmail"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }
    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let isValidForm = handleValidation();

    const body = {
      shipmentCuid,
      driverCuid,
      shipmentStatus,
      shipmentCustomerTotalCost,
      toEmail,
      message,
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
         //return data;
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
    
    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/sendgridShipmentUpdate", {
        //body: JSON.stringify({email: toEmail, message: message, }),
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
        if (error) {
          console.log(error);
          setButtonText("Send");
          return;
        }
        setButtonText("Send");
      }

  };

  
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shipment <span className="text-sm text-blue-600"><Link href="/shipments">View List</Link></span>
          </h1>
          <p>
            Use this form to assign a driver to client shipment request. This information is
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
                      Shipment ID: { shipmentId }
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Shipment CUID: { shipmentCuid }
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Shipment: { shipmentName }
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Account: { accountName }
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Equipments: &nbsp;
                        {shipmentEquipments?.map((equipments2, n) => (
                          <span key={equipments2.shipmentEquipmentCuid}> 
                          {equipments2.equipmentTypes.equipmentTypeName},&nbsp;  
                          </span>
                        ))}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Accessorials: 
                      {myobject.shipmentAccessorials?.map((accessories, m) => (
                        <span key={accessories.shipmentAccessorialCuid}> 
                        {accessories.accessorials.accessorialName},&nbsp;  
                        </span>
                      ))}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Total Dimension: { shipmentTotalDimension }
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Total Weight: { shipmentTotalWeight }
                    </div>

                    

                    
                    <div className="lg:col-span-3 md:col-span-2 sm:col-span-3">
                      <label
                      htmlFor="driverCuid"
                      className="block text-sm font-medium text-gray-700"
                      >Assign Driver to Shipment Order
                      </label>
                      <select name="driverCuid" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                      value={driverCuid}
                      defaultValue={driverCuid}
                      onChange={(e) => {
                      setDriverCuid(e.target.value);
                      }}
                      required="required">
                      <option value="">Please select Driver</option>
                      {data1?.map((driverDD) => (
                      <option key={driverDD.driverCuid} value={driverDD.driverCuid}
                      >{driverDD.companyName} ( {driverDD.driverName} )</option>
                      ))}
                      </select>
                    </div>

                    <div className="lg:col-span-3 md:col-span-2 sm:col-span-3">
                      <label
                      htmlFor="shipmentCustomerTotalCost"
                      className="block text-sm font-medium text-gray-700"
                      >Customer Total Cost
                      </label>
                      <input
                        type="number"
                        name="shipmentCustomerTotalCost"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm inpqty"
                        value={shipmentCustomerTotalCost || "0"} 
                        onChange={(e) => setShipmentCustomerTotalCost(e.target.value)}
                        min="1" max="100000" step="1" maxLength={9}
                        required="required" />
                    </div>

                    <div className="lg:col-span-6 md:col-span-4 sm:col-span-6">
                      <label
                      htmlFor="shipmentStatus"
                      className="block text-sm font-medium text-gray-700"
                      >Update Status
                      </label>
                      <select name="shipmentStatus" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                      value={shipmentStatus}
                      defaultValue={shipmentStatus}
                      onChange={(e) => {
                      setShipmentStatus(e.target.value);
                      }}
                      required="required">
                      <option value="1">Active</option>
                      <option value="2">Quote</option>
                      <option value="0">Archived</option>
                      <option value="3">Accepted</option>
                      <option value="4">Reviewing</option>
                      <option value="5">Picked Up</option>
                      <option value="5">Delayed</option>
                      <option value="5">Lost</option>
                      <option value="5">Damaged</option>
                      <option value="5">Delivered Up</option>
                      </select>
                    </div>

                    <div className="lg:col-span-6 md:col-span-4 sm:col-span-6">
                      <label
                      htmlFor="toEmail"
                      className="block text-sm font-medium text-gray-700"
                      >Email to send shipment update notifications
                      </label>
                      <input
                        type="email"
                        name="toEmail"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm inpqty"
                        value={toEmail} 
                        onChange={(e) => setToEmail(e.target.value)}
                        maxLength={255}
                        />
                    </div>


                    <div className="lg:col-span-6 md:col-span-4 sm:col-span-6">
                      <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                      >Message to send
                      </label>
                      <textarea
                      name="message"
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); }}
                      className="bg-transparent border-b focus:outline-none focus:rounded-md focus:ring-1 " cols={200}></textarea>
                    </div>





                    
          


                    <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {buttonText}
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




/*
const refreshShipments = async () => {
    try {
      const response = await fetch(`/api/shipments/${shipmentCuid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setAPIResponse(await response.json());
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        //resetForm();
        console.log("form submitted successfully !!!");
      }
    } catch (error) {
      console.log("there was an error reading from the db", error);
    }
  };


*/