import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from '../../components/layout'
import { BiTrashAlt, BiMinusCircle, BiRefresh, BiPlus, BiPlusCircle, BiPencil } from "react-icons/bi"; 
 
export default function Home() {


  const archiveEquipmentType = async (equipmentTypeCuid, equipmentTypeActive) =>{
    const body = {equipmentTypeCuid, equipmentTypeActive};
    const response = await fetch("/api/equipmenttypes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    //console.log(data)
    const data = await response.json()
    //console.log(data)
    fetchDashboardData()
  }

  const fetchDashboardData = async () => {
    const response = await fetch('api/equipmenttypes')
    const data = await response.json()
    setDashboardData(data)
    //console.log(data);
    setIsLoading(false)
  }

  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState([])


  useEffect(() => {
    fetchDashboardData()
  }, [])

if (isLoading) {
return <h2>Loading...</h2>
}


return (

<>

<header className="bg-white shadow">
<div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Equipments <span className="text-sm text-blue-600"><Link href="/equipmenttypes/create">add new</Link></span></h1>
</div>
</header>
<main>
<div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4">
<div className="px-4 py-6 sm:px-0">

<table className='border-collapse border border-slate-400 table-auto w-full'>
<thead>
<tr>
<th className='border border-slate-300 px-4'>ID</th>
<th className='border border-slate-300 px-4'>Internal ID</th>
<th className='border border-slate-300 px-4'>Name</th>
<th className='border border-slate-300 px-4'>Status</th>
<th className='border border-slate-300 px-4'>Action</th>
</tr>
</thead>
<tbody>
{dashboardData?.map((fetchedViews) => (
<tr className="border-b"  key={fetchedViews.equipmentTypeCuid}> 
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
<Link href={`/equipmenttypes/${encodeURIComponent(fetchedViews.equipmentTypeCuid)}`}>
  <a className="text-blue-600">
  {fetchedViews.equipmentTypeId}
  </a>
  </Link>
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
  <Link href={`/equipmenttypes/${encodeURIComponent(fetchedViews.equipmentTypeCuid)}`}>
  <a className="text-blue-600">
    {fetchedViews.equipmentTypeCuid}   
    </a>
  </Link>
</td>
<td className={"px-2 py-2 text-sm font-light text-gray-900 border border-slate-300"}>
  <Link href={`/equipmenttypes/${encodeURIComponent(fetchedViews.equipmentTypeCuid)}`}>
  {fetchedViews.equipmentTypeName}   
  </Link>
</td>
<td className={"px-2 py-2 text-sm font-light text-gray-900 border border-slate-300"}>
  
  {fetchedViews.equipmentTypeActive ? 'Active' : 'Archived'}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

  {fetchedViews.equipmentTypeActive == 1 ? 

  <button className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 mr-2" onClick={() => archiveEquipmentType(fetchedViews.equipmentTypeCuid, fetchedViews.equipmentTypeActive)}><BiMinusCircle /></button>

  : 

  <button className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 mr-2" onClick={() => archiveEquipmentType(fetchedViews.equipmentTypeCuid, fetchedViews.equipmentTypeActive)}><BiPlusCircle /></button>

  }


  <Link href={`/equipmenttypes/${encodeURIComponent(fetchedViews.equipmentTypeCuid)}`}>
  <button className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"><BiPencil /></button>
  </Link>
 
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
      <th className='border border-slate-300 px-4'>ID</th>
      <th className='border border-slate-300 px-4'>shipment</th>
      <th className='border border-slate-300 px-4'>Tracking</th>
      <th className='border border-slate-300 px-4'>moNumber</th>
      <th className='border border-slate-300 px-4'>houseBillNumber</th>
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


useEffect(() => {
async function fetchDashboardData() {
const response = await fetch('/api/equipmenttypes')
const data = await response.json()

//setDashboardData(JSON.parse(data))
setEquipmentTypeData(data)
setIsLoading(false)
}
fetchDashboardData()
}, [])    

*/