//import useSWR from 'swr'
import { useState, useEffect } from "react";
import Layout from '../../components/layout'
import Link from 'next/link'

import { BiTrashAlt, BiMinusCircle, BiRefresh, BiPlus, BiPlusCircle, BiPencil } from "react-icons/bi";
import { FaTruckPickup, FaUserCheck, FaUserPlus, FaUserMinus } from "react-icons/fa";


export default function Quotes() {
  
  const bookShipment = async (shipmentCuid) =>{
    const body = {shipmentCuid};
    const response = await fetch("/api/shipments/bookshipment", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json()
    //console.log(data)
    fetchDashboardData()
  }

  const fetchDashboardData = async () => {
    const response = await fetch('api/shipments/getpagingquotedata')
    const data = await response.json()
    if(data){
      //setRecordCount(data.length);
      setFetchedViews(data)
      setIsLoading(false)
    }
    //setFetchedViews(data)
    //setIsLoading(false)
    console.log(data);
    //console.log(data.length);
  }

  const [isLoading, setIsLoading] = useState(true)
  const [fetchedViews, setFetchedViews] = useState([])
  //const [recordCount, setRecordCount] = useState(0)
  
  
  useEffect(() => {
    /* async function fetchDashboardData() {
      const response = await fetch('api/shipments/')
      const data = await response.json()
      setDashboardData(data)
      setIsLoading(false)
    } */
    fetchDashboardData()
  }, [])
  

 
    
    if (isLoading) {
      return <h2>Loading...</h2>
    }



  return (

<>
  <header className="bg-white shadow">
  <div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Quotes <span className="text-sm text-blue-600"><Link href="/shipments/create">[ add new ]</Link></span></h1>
  </div>
  </header>
  <main>
    <section className="bg-white">
    <div className="flex flex-wrap -mx-4">
    <div className="w-full px-4">
    <div className="max-w-full overflow-x-auto">

      <span className="ml-4">{fetchedViews.length} Record{fetchedViews.length > 1 ? 's' : ''} Found</span>

      <table className='border-collapse border border-slate-400 table-auto w-full'>
      <thead>
        <tr>
          <th className='border border-slate-300 py-2'>ID</th>
          <th className='border border-slate-300 px-4'>Name</th>
          <th className='border border-slate-300 px-4'>Reference</th>
          <th className='border border-slate-300 px-4'>Locations</th>
          <th className='border border-slate-300 px-4'>Load</th>
          <th className='border border-slate-300 px-4'>Driver</th>
          <th className='border border-slate-300 px-4'>Total Cost</th>
          <th className='border border-slate-300 px-4'>Accessorials</th>
          <th className='border border-slate-300 px-4'>Equipment</th>
          <th className='border border-slate-300 px-4'>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {fetchedViews?.map((dashboardData, i) => (
        <tr className="border-b"  key={dashboardData.shipmentCuid}> 
          <td className={"px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-slate-300"} >
            <Link href={`/shipments/${encodeURIComponent(dashboardData.shipmentCuid)}`}>
              <a className="text-blue-600">{dashboardData.shipmentId}</a>
            </Link>
          </td>
          <td className={"px-4 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
            <Link href={`/shipments/${encodeURIComponent(dashboardData.shipmentCuid)}`}>
            <a className="text-blue-600">{dashboardData.shipmentName}</a>
            </Link>
            <br/>
            {dashboardData.accounts.accountName}
          </td>
          <td className="text-sm text-gray-900 font-light px-4 py-2  border border-slate-300">
            <span className="font-medium text-gray-900">Tracking #:</span> {dashboardData.trackingNumber}<br/><br/>
            <span className="font-medium text-gray-900">MO #:</span> {dashboardData.moNumber}<br/><br/>
            <span className="font-medium text-gray-900">House Bill #:</span>{dashboardData.houseBillNumber}
          </td>
      
          <td className="text-sm text-gray-900 font-light px-4 py-2 border border-slate-300">
          
            {dashboardData.shipmentLocations?.map((locations, m) => (
            <span key={locations.shipmentLocationCuid}>
              <span className="font-medium text-gray-900">Location {m+1}:</span><br/>
              {locations.locationType === 'P' ? 'Pick Up' : 'Delivery'}<br/>
              <span className="font-medium text-gray-900">Name:</span> {locations.locationName} <br />
              <span className="font-medium text-gray-900">Address:</span> {locations.locationFullAddress} <br />
              <span className="font-medium text-gray-900">Contact:</span> {locations.locationContact} <br />
              <span className="font-medium text-gray-900">Phone:</span> {locations.locationPhone} <br /><br />
              <span className="font-medium text-gray-900">Timezone:</span>{dashboardData.shipmentTimeZone}<br/>
              <span className="font-medium text-gray-900">Start:</span> {locations.dateStart} <br />
              <span className="font-medium text-gray-900">time:</span> {locations.timeStart} <br />
              <span className="font-medium text-gray-900">End:</span> {locations.dateEnd} <br />
              <span className="font-medium text-gray-900">time:</span> {locations.timeEnd} <br /><br />
            </span>
            ))}
          
          </td>
      
          

          <td className="text-sm text-gray-900 font-light px-4 py-2 border border-slate-300">

            <span className="font-medium text-gray-900">Total Weight:</span> {dashboardData.shipmentTotalWeight}<br />
            <span className="font-medium text-gray-900">Total Dimension:</span> {dashboardData.shipmentTotalDimension}<br /><br />

            {dashboardData.shipmentLoads?.map((loads, m) => (
            <span key={loads.shipmentLoadCuid}>
              <span className="font-medium text-gray-900">Load {m+1}:</span><br/>
              Length: {loads.length} <br />
              Width: {loads.width} <br />
              Height: {loads.height} <br />
              Weight: {loads.weight} <br /><br />
            </span>
            ))}
          </td>
          
          <td className="text-sm text-gray-900 font-light px-6 py-2 border border-slate-300">
            {dashboardData.drivers === null? 'TBD': `${dashboardData.drivers.companyName} (${dashboardData.drivers.driverName})`}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-2 border border-slate-300">
            {dashboardData.shipmentCustomerTotalCost}
          </td>
          <td className="text-sm text-gray-900 font-light px-2 py-2 border border-slate-300">
            {dashboardData.shipmentAccessorials?.map((accessories, m) => (
              <span key={accessories.shipmentAccessorialCuid}> 
              {accessories.accessorials.accessorialName},&nbsp;  
              </span>
            ))}
          </td>
          <td className="text-sm text-gray-900 font-light px-2 py-2 border border-slate-300">
            {dashboardData.shipmentEquipments?.map((equipments, m) => (
              <span key={equipments.shipmentEquipmentCuid}> 
              {equipments.equipmentTypes.equipmentTypeName},&nbsp;  
              </span>
            ))}
          </td>
          <td className="text-sm text-gray-900 font-light px-2 py-2 border border-slate-300">
            {dashboardData.shipmentNote}
          </td>
          <td className="text-sm text-gray-900 font-light px-2 py-2 border border-slate-300">

          <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 mr-2" onClick={() => bookShipment(dashboardData.shipmentCuid)} title="Book Shipment"><FaTruckPickup /></button>

         
          
          
          </td>
        </tr>
        ))}
      </tbody>
      </table>

    </div>
    </div>
    </div>
    </section>
  </main>

  </>
    
    )}
    
    Quotes.getLayout = function getLayout(page) {
      return (
        <Layout>
          {page}
        </Layout>
      )
    }



/*    

 <Link href={`/shipments/${encodeURIComponent(dashboardData.shipmentCuid)}`}>
            <button className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2" title='Assign Driver'><BiPencil /></button>
          </Link>


{dashboardData.shipmentEquipments[m].equipmentTypes.equipmentTypeName}


{(() => {
    let stat = dashboardData.shipmentStatus
  if (stat == 1) {
    return 'Booked'
  }
  else if (stat == 2) {
    return 'Quoted'
  }
  else if (stat == 3) {
    return 'Picked Up'
  }
  else {
    return 'Draft'
  }
})()}


{(() => {

  for (var key in data) {
      if (data.hasOwnProperty(key)) {
          
        return <span>
  {data[key].shipmentCuid}
  
  
        </span>
        
        
      }
  }
  
  
  // for-of with Object.keys()
  for (var key of Object.keys(data)) {
      //console.log(key + " -> " + data[key])
  return <span key={data[key].shipmentCuid}>hello
  {data[key].shipmentCuid};
        </span>
  
  }
  
  
  
  })()}
  */