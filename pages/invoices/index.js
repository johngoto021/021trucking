import useSWR from 'swr'
import Layout from '../../components/layout'
import Link from 'next/link'

import { BiTrashAlt, BiMinusCircle, BiRefresh, BiPlus, BiPlusCircle, BiPencil, BiCreditCard, BiEnvelope, BiPrinter } from "react-icons/bi";
import { FaTruckPickup, FaUserCheck, FaUserPlus, FaUserMinus } from "react-icons/fa";


const fetcher = async () => {
  const response = await fetch('/api/shipments')
  const data = await response.json();
  console.log(data);
  return data
  }

export default function DashboardSWR() {
  const { data, error } = useSWR('dashboard', fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  return (

<>
  <header className="bg-white shadow">
  <div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Invoices</h1>
  </div>
  </header>
  <main>
    <section className="bg-white">
    <div className="flex flex-wrap -mx-4">
    <div className="w-full px-4">
    <div className="max-w-full overflow-x-auto">

      <span className="ml-4">{data.length} Record{data.length > 1 ? 's' : ''} Found</span>

      <table className='border-collapse border border-slate-400 table-auto w-full'>
      <thead>
        <tr>
          <th className='border border-slate-300 py-2'>ID</th>
          <th className='border border-slate-300 px-4'>Name</th>
          <th className='border border-slate-300 px-4'>Job Name</th>
          <th className='border border-slate-300 px-4'>Locations</th>
          <th className='border border-slate-300 px-2'>Status/Paid</th>
          <th className='border border-slate-300 px-4'>Load</th>
          <th className='border border-slate-300 px-4'>Driver</th>
          <th className='border border-slate-300 px-4'>Accessorials</th>
          <th className='border border-slate-300 px-4'>Equipment</th>
          <th className='border border-slate-300 px-4'>Invoice Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {data?.map((dashboardData, i) => (
        <tr className="border-b"  key={dashboardData.shipmentCuid}> 
          <td className={"px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-slate-300"} >
            <Link href={`/invoices/${encodeURIComponent(dashboardData.shipmentCuid)}`}>
              <a className="text-blue-600">{dashboardData.shipmentId}</a>
            </Link>
          </td>
          <td className={"px-4 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
            <Link href={`/invoices/${encodeURIComponent(dashboardData.shipmentCuid)}`}>
            <a className="text-blue-600">{dashboardData.accounts.accountName}
              </a>
            </Link>
            <br/>
            
          </td>
          <td className="text-sm text-gray-900 font-light px-4 py-2  border border-slate-300">
          {dashboardData.shipmentName}
          </td>
      
          <td className="text-sm text-gray-900 font-light px-4 py-2 border border-slate-300">
          
            {dashboardData.shipmentLocations?.map((locations, m) => (
            <span key={locations.shipmentLocationCuid}>
              <span className="font-medium text-gray-900">Location {m+1}:</span><br/>
              {data.locationType === 'P' ? 'Pick Up' : 'Delivery'}<br/>
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
            {(() => {
              let stat2 = dashboardData.shipmentStatus
                  switch (dashboardData.shipmentStatus) {
                    case 1:
                      return 'Booked'
                    case 2:
                      return 'Quoted'
                    case 3:
                      return 'Picked Up'
                    default:
                      return null
                  }
                })()}
            <br/>
            
            {dashboardData.shipmentPaid ==1? 'Paid': 'Outstanding'}


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
          
          <td className="text-sm text-gray-900 font-light px-2 py-2 border border-slate-300">
            {dashboardData.shipmentAccessorials?.map((accessories, m) => (
              <span key={accessories.shipmentAccessorialCuid}> 
              {accessories.accessorials.accessorialName}<br/>
              </span>
            ))}
          </td>
          <td className="text-sm text-gray-900 font-light px-2 py-2 border border-slate-300">
            {dashboardData.shipmentEquipments?.map((equipments, m) => (
              <span key={equipments.shipmentEquipmentCuid}> 
              {equipments.equipmentTypes.equipmentTypeName}<br/>
              </span>
            ))}
          </td>
          <td className="text-sm text-gray-900 font-light px-6 py-2 border border-slate-300">
            {dashboardData.shipmentCustomerTotalCost}
          </td>
          <td className="text-sm text-gray-900 font-light px-2 py-2 border border-slate-300">
          <Link href={`/invoices/${encodeURIComponent(dashboardData.shipmentCuid)}`}>
            <button className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2" title='Email Customer'><BiEnvelope /></button>
          </Link>
          
          
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
    
    DashboardSWR.getLayout = function getLayout(page) {
      return (
        <Layout>
          {page}
        </Layout>
      )
    }



/*    
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