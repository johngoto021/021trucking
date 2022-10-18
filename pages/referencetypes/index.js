import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from '../../components/layout'
 
export default function Home() {

const [isLoading, setIsLoading] = useState(true)
const [referenceTypeData, setReferenceTypeData] = useState([])
useEffect(() => {
async function fetchDashboardData() {
const response = await fetch('/api/referencetypes')
const data = await response.json()

//setDashboardData(JSON.parse(data))
setReferenceTypeData(data)
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
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Reference Type <span className="text-sm text-blue-600"><Link href="/referencetypes/create">add new</Link></span></h1>
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
{referenceTypeData?.map((fetchedViews) => (
<tr className="border-b"  key={fetchedViews.referenceTypeCuid}> 
<td className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"}>
  {fetchedViews.referenceId}
</td>
<td className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"}>
  <a href="#">
    {fetchedViews.referenceTypeCuid}   
  </a>
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  {fetchedViews.referenceTypeName}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  
  {fetchedViews.referenceTypeActive ? 'Active' : 'Archived'}
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