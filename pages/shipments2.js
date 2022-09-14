import { useState, useEffect } from "react";
import Layout from '../components/layout'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)
  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch('api/shipment/getdata')
      const data = await response.json()
      setDashboardData(data)
      setIsLoading(false)
    }
    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }



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
    {dashboardData?.map((rowData) => (
<tr className="border-b"  key={rowData.shipmentCuid}> 
<td
className={
"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
}
>
{rowData.shipmentId}
</td>
<td
className={
"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
}
>
<a href="#">
{rowData.shipmentCuid}   
</a>
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{rowData.trackingNumber}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{rowData.trackingNumber}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{rowData.trackingNumber}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{rowData.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{rowData.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{rowData.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{rowData.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{rowData.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{rowData.trackingNumber}
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
    
    Dashboard.getLayout = function getLayout(page) {
      return (
        <Layout>
          {page}
        </Layout>
      )
    }