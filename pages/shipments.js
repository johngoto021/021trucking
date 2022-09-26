import useSWR from 'swr'
import Layout from '../components/layout'
import Link from 'next/link'

const fetcher = async () => {
  const response = await fetch('api/shipment/getdata')
  const data = await response.json();
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
  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shipments <span className="text-sm text-blue-600"><Link href="shipmentform">[ add new ]</Link></span></h1>
  </div>
  </header>
  <main>

<section className="bg-white">


<div className="flex flex-wrap -mx-4">
<div className="w-full px-4">
<div className="max-w-full overflow-x-auto">

  <table className='border-collapse border border-slate-400 table-auto w-full'>
  <thead>
  <tr>
  <th className='border border-slate-300 py-2'>ID</th>
  <th className='border border-slate-300 px-4'>Name</th>
  <th className='border border-slate-300 px-4'>Status</th>
  <th className='border border-slate-300 px-4'>Origin</th>
  <th className='border border-slate-300 px-4'>Destination</th>
  <th className='border border-slate-300 px-2'>Picked Up?</th>
  <th className='border border-slate-300 px-4'>Load</th>
  <th className='border border-slate-300 px-4'>Carrier</th>
  <th className='border border-slate-300 px-4'>Driver</th>
  <th className='border border-slate-300 px-4'>Total Cost</th>
  <th className='border border-slate-300 px-4'>Equipment</th>
  </tr>
  </thead>
  <tbody>
  {data?.map((dashboardData) => (
  <tr className="border-b"  key={dashboardData.shipmentCuid}> 
  <td
  className={
  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-slate-300"
  }
  >
  {dashboardData.shipmentId}
  </td>
  <td
  className={"px-6 py-4 text-sm font-medium text-gray-900 border border-slate-300"}
  >
  <a href="#">
  {dashboardData.shipmentName}   
  </a>
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 border border-slate-300">
  {dashboardData.shipmentStatus}   
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4  border border-slate-300">
  {dashboardData.trackingNumber}   
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4  border border-slate-300">
  {dashboardData.trackingNumber}   
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4  border border-slate-300">
  {dashboardData.trackingNumber}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4  border border-slate-300">
  {dashboardData.trackingNumber}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4  border border-slate-300">
  {dashboardData.trackingNumber}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4  border border-slate-300">
  {dashboardData.trackingNumber}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4  border border-slate-300">
  {dashboardData.shipmentCustomerTotalCost}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4  border border-slate-300">
  {dashboardData.trackingNumber}
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