import { useState } from "react";
import { useEffect } from "react";
import Layout from "../components/layout";


export default function ShipmentForm() {
  const [shipmentName, setshipmentName] = useState("");
  const [accountCuid, setaccountCuid] = useState("");
  const [equipmentTypeId, setequipmentTypeId] = useState("");
  const [trackingNumber, settrackingNumber] = useState("");
  const [moNumber, setmoNumber] = useState("");
  const [houseBillNumber, sethouseBillNumber] = useState("");
  const [APIResponse, setAPIResponse] = useState(null);

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
  const seeShipments = async () => {
    try {
      const response = await fetch("/api/shipments", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setAPIResponse(await response.json());
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        console.log("form submitted successfully !!!");
      }
    } catch (error) {
      console.log("there was an error reading from the db", error);
    }
  };

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
        resetForm();
        seeShipments();
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  const resetForm = () => {
    setshipmentName("");
    setaccountCuid("");
    setequipmentTypeId("");
    settrackingNumber("");
    setmoNumber("");
    sethouseBillNumber("");
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Shipment
          </h1>
          <p>
            Use this form to create a shipment for clients.
          </p>
        </div>
      </header>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">


                  <div className="col-span-6 sm:col-span-2">
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

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="accountCuid"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Billable Account
                      </label>
                      <select name="accountCuid" id="accountCuid">
<option value="1">ABC Corp 1</option>
<option value="2">ABC Corp 2</option>
<option value="3">ABC Corp 3</option>
<option value="4">ABC Corp 4</option>
<option value="5">ABC Corp 4</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                    <label
                        htmlFor="equipmentTypeId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Equipment Type
                      </label>
                      <select name="equipmentTypeId" id="equipmentTypeId">
<option value="1">53&apos; / Trailer</option>
<option value="2">Flatbed</option>
<option value="3">Van</option>
<option value="4">Power Only</option>
<option value="5">Straight Truck</option>
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

                    <div className="col-span-2">
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
                <div className="px-4 py-2 text-right sm:px-6">
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

        

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Shipment
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Equipment
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Tracking Id
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        MO Number.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {APIResponse?.map((shipmentView) => (
                      <tr className="border-b"  key={shipmentView.shipmentId}> 
                        <td
                          className={
                            "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          }
                        >
                          {shipmentView.shipmentId}
                        </td>
                        <td
                          className={
                            "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          }
                        >
                          {shipmentView.accountCuid} <br />
                          
                          
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {shipmentView.accountCuid}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {shipmentView.equipmentTypeId}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {shipmentView.trackingNumber} 
                        ({shipmentView.moNumber})
                        {shipmentView.houseBillNumber} 
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ShipmentForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
