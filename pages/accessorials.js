import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from '../components/layout'
 
export default function Home() {

const [isLoading, setIsLoading] = useState(true)
const [accessorialData, setAccessorial] = useState([])
useEffect(() => {
async function fetchDashboardData() {
const response = await fetch('api/dropdowns/accessorial')
const data = await response.json()

//setDashboardData(JSON.parse(data))
setAccessorial(data)
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
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Accessorials <span className="text-sm text-blue-600"><Link href="accessorialform">add new</Link></span></h1>
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
{accessorialData?.map((fetchedViews) => (
<tr className="border-b"  key={fetchedViews.accessorialCuid}> 
<td className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"}>
  {fetchedViews.accessorialId}
</td>
<td className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"}>
  <a href="#">
    {fetchedViews.accessorialCuid}   
  </a>
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {fetchedViews.accessorialName}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  
  {fetchedViews.accessorialActive ? 'Active' : 'Archived'}
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