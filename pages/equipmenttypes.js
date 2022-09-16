import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from '../components/layout'
 
export default function Home() {

const [isLoading, setIsLoading] = useState(true)
const [dashboardData, setDashboardData] = useState([])
useEffect(() => {
async function fetchDashboardData() {
const response = await fetch('api/dropdowns/getequipmenttype')
const data = await response.json()
console.log(data);
//setDashboardData(JSON.parse(data))
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
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Equipment Type <span className="text-sm text-blue-600"><Link href="equipmenttypeform">add new</Link></span></h1>
</div>
</header>
<main>
<div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4">
<div className="px-4 py-6 sm:px-0">

<table>
<thead>
<tr>
<th>ID</th>
<th>Internal ID</th>
<th>Name</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{dashboardData?.map((fetchedViews) => (
<tr className="border-b"  key={fetchedViews.equipmentTypeCuid}> 
<td className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"}>
  {fetchedViews.equipmentTypeId}
</td>
<td className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"}>
  <a href="#">
    {fetchedViews.equipmentTypeCuid}   
  </a>
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {fetchedViews.equipmentTypeName}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  
  {fetchedViews.equipmentTypeActive ? 'Active' : 'Archived'}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  <a href="#" className="text-sm text-blue-600">edit</a> | <a href="#" className="text-sm text-blue-600">archive</a>
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

Home.getLayout = function getLayout(page) {
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