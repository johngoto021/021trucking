import { useState, useEffect } from "react";
import useSWR from 'swr'
import Layout from '../components/layout'

const fetcher = async () => {
  const response = await fetch('api/account/getdataidname')
  const data = await response.json()
  return data
}

/*
const fetcher2 = async () => {
  const response2 = await fetch('api/dropdown/getequipmenttype')
  const equiptype = await response2.json()
  console.log(equiptype)
  return equiptype
}
*/
export default function Dashboard() {
  
  const { data, error } = useSWR('accountDropDown', fetcher)
  //const { data, error } = useSWR('equiptypeDropDown', fetcher)


  const [shipmentName, setshipmentName] = useState("");
  const [accountCuid, setaccountCuid] = useState("");
  const [equipmentTypeId, setequipmentTypeId] = useState("0");
  const [trackingNumber, settrackingNumber] = useState("");
  const [moNumber, setmoNumber] = useState("");
  const [houseBillNumber, sethouseBillNumber] = useState("");
  
  const [APIResponse, setAPIResponse] = useState(null);
  //const [accountName, setAccountName] = useState("");
  //const [accountNameSelected, setAccountNameSelected] = useState("");
  
  const [isLoading, setIsLoading] = useState(true)
  //const [accountDropDown, setAccountDropDown] = useState(null)
  const [equiptypeDropDown, setEquiptypeDropDown] = useState(null)
  
  
  
  useEffect(() => {
    async function fetchEquipTypeDropDown() {
      const response = await fetch('api/dropdowns/getequipmenttype')
      const data = await response.json()
      setEquiptypeDropDown(data)
      setIsLoading(false)
    }
    fetchEquipTypeDropDown()
  }, [])
  
  /*
  useEffect(() => {
    console.log("shipmentName", shipmentName);
    console.log("accountCuid", accountCuid);
    console.log("equipmentTypeId", equipmentTypeId);
    console.log("trackingNumber", trackingNumber);
    console.log("moNumber", moNumber);
    console.log("houseBillNumber", houseBillNumber);
    console.log("APIResponse", APIResponse);
  }, [
    shipmentName,
    accountCuid,
    equipmentTypeId,
    trackingNumber,
    moNumber,
    houseBillNumber,
    APIResponse,
  ]);
*/
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      shipmentName,
      accountCuid,
      equipmentTypeId,
      trackingNumber,
      moNumber,
      houseBillNumber,
    };
    try {
      const response = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        //resetForm();
        //seeShipments();
        console.log(response);
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  
/*
   if (isLoading) {
    return <h2>Loading...</h2>;
  }
*/


  return (

<>
   
<header className="bg-white shadow">
<div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Shipment</h1>
</div>
</header>
<main>


<div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4">
<div className="px-4 py-6 sm:px-0">


<div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-3">


<div className="col-span-6 sm:col-span-3">
<label
htmlFor="equipmentTypeId"
className="block text-sm font-medium text-gray-700"
>
Equipment Type
</label>

<select name="equipmentTypeCud" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" >

{equiptypeDropDown?.map((equipmentDD) => (
<option key={equipmentDD.equipmentTypeCuid} value={equipmentDD.equipmentTypeCuid}
>{equipmentDD.equipmentTypeName}</option>
))}
</select>


</div>

<div className="col-span-6 sm:col-span-3">
Total Weight
</div>


<div className="col-span-6 sm:col-span-3">
<label
htmlFor="shipmentName"
className="block text-sm font-medium text-gray-700"
>
Shipment Name
</label>
<input
type="text"
name="shipmentName"
id="shipmentName"
autoComplete="shipmentName"
className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
onChange={(e) => setshipmentName(e.target.value)}
value={shipmentName}
/>
</div>

<div className="col-span-6 sm:col-span-3">
<label
htmlFor="accountCuid"
className="block text-sm font-medium text-gray-700"
>
Billable Account
</label>

<select name="accountCuid" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" >
{data?.map((accountDD) => (
<option key={accountDD.accountCuid} value={accountDD.accountId}
>{accountDD.accountName}</option>
))}


</select>
</div>

                    

<div className="col-span-6 sm:col-span-2">
<label
htmlFor="trackingNumber"
className="block text-sm font-medium text-gray-700"
>
Tracking Id
</label>
<input
type="text"
name="trackingNumber"
id="trackingNumber"
autoComplete="trackingNumber"
className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
onChange={(e) => settrackingNumber(e.target.value)}
value={trackingNumber}
/>
</div>

<div className="col-span-6 sm:col-span-2">
<label
htmlFor="moNumber"
className="block text-sm font-medium text-gray-700"
>
MO Number
</label>
<input
type="text"
name="moNumber"
id="moNumber"
autoComplete="moNumber"
className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
onChange={(e) => setmoNumber(e.target.value)}
value={moNumber}
/>
</div>

<div className="col-span-6 sm:col-span-2">
  <label
  htmlFor="houseBillNumber"
  className="block text-sm font-medium text-gray-700"
  >
  House Bill Number
  </label>
  <input
  type="text"
  name="houseBillNumber"
  id="houseBillNumber"
  autoComplete="houseBillNumber"
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  onChange={(e) => sethouseBillNumber(e.target.value)}
  value={houseBillNumber}
  />
  </div>
                    
                  </div>
                </div>
                <div className="px-4 py-2 text-left sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>





</div>
</div>
</main>
</>
    
    )}
    
    Dashboard.getLayout = function getLayout(page) {
      return (
        <Layout>
          {page}
        </Layout>
      )
    }