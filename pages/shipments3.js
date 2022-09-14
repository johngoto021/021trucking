import useSWR from 'swr'
import Layout from '../components/layout'


const fetcher = async () => {
  const response = await fetch('api/shipment/getdata')
  const data = await response.json()
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
  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shipments</h1>
  </div>
  </header>
  <main>
  <div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4">
  <div className="px-4 py-6 sm:px-0">

  <table>
  <thead>
  <tr>
  <th>ID</th>
  <th>References</th>
  <th>statuses</th>
  <th>Origin</th>
  <th>Destination</th>
  <th>Picked Up?</th>
  <th>Load</th>
  <th>Carrier</th>
  <th>Driver</th>
  <th>Total Cost</th>
  <th>Equipment</th>
  </tr>
  </thead>
  <tbody>
  {data?.map((dashboardData) => (
  <tr className="border-b"  key={dashboardData.shipmentCuid}> 
  <td
  className={
  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
  }
  >
  {dashboardData.shipmentId}
  </td>
  <td
  className={
  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
  }
  >
  <a href="#">
  {dashboardData.shipmentCuid}   
  </a>
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {dashboardData.trackingNumber}   
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {dashboardData.trackingNumber}   
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {dashboardData.trackingNumber}   
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {dashboardData.trackingNumber}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {dashboardData.trackingNumber}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {dashboardData.trackingNumber}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {dashboardData.trackingNumber}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {dashboardData.trackingNumber}
  </td>
  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {dashboardData.trackingNumber}
  </td>
  </tr>
  ))}
  </tbody>
  </table>

  </div>
  </div>
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