//import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import Layout from '../components/layout'
 
export default function Shipments() {

/*

const NextPage = () => {

const [data, setData] = useState([]);

const fetchData = async() =>{

const response = await fetch('api/shipment/getdata')
const json = await response.json()

}

useEffect(() => {
fetchData()

}, []
)



}
*/


const [isLoading, setIsLoading] = useState(true)
const [dashboardData2, setDashboardData2] = useState([])
  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch('api/shipment/getdata')
      const data = await response.json()
      setDashboardData2(JSON.parse(data))
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
<th>Name</th>
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
{dashboardData2?.map((fetchedViews) => (
<tr className="border-b"  key={fetchedViews.shipmentCuid}> 
<td
className={
"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
}
>
{fetchedViews.shipmentId}
<br />
<a href="#">
{fetchedViews.shipmentCuid}   
</a>
</td>
<td
className={
"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
}
>
<a href="#">
{fetchedViews.shipmentName}   
</a>
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.trackingNumber}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.trackingNumber}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.trackingNumber}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.trackingNumber}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.trackingNumber}
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

Shipments.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

/*



     const Index = ({ userList }) => <div style={{ margin: 20 }}>
    <table border="1">
    <thead>
      <tr>
      <th>ID</th>
      <th>shipment</th>
      <th>Tracking</th>
      <th>moNumber</th>
      <th>houseBillNumber</th>
      </tr>
    </thead>
    <tbody>
      {userList.data.map((x, i) => <tr key={i}>
        <td>{x.shipmentName}</td>
        <td>{x. trackingNumber}</td>
        <td>{x.moNumber}</td>
        <td>{x.houseBillNumber}</td></td>
      </tr>)}
    </tbody>
  </table>
</div>


  {session ? (
          <button onClick={signOut}>Log out.</button>
        ) : (
          <button onClick={signIn}>Log in.</button>
        )}

<script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
<link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" />


if(user) (
   
      return {
      <h1>Welcome Back!</h1>
      
      <p>You're login as {user.name} with the following email {user.email}</p>

      <Link href="/api/auth/logout">
          <a className='btn btn-primary' role="button">logout</a>
        </Link>
      }
    )


*/