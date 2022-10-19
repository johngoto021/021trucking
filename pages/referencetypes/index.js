import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from '../../components/layout'
import { BiTrashAlt, BiMinusCircle, BiRefresh, BiPlus, BiPlusCircle, BiPencil } from "react-icons/bi"; 
 
export default function Home() {

  const archiveReferenceType = async (referenceTypeCuid, referenceTypeActive) =>{
    const body = {referenceTypeCuid, referenceTypeActive};
    const response = await fetch("/api/referencetypes", {
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
    const response = await fetch('api/referencetypes')
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
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Reference Types <span className="text-sm text-blue-600"><Link href="/referencetypes/create">add new</Link></span></h1>
</div>
</header>
<main>
<div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4">
<div className="px-4 py-6 sm:px-0">

<table className='border-collapse border border-slate-400 table-auto w-full'>
<thead>
<tr>
<th className='border border-slate-300 px-2'>ID</th>
<th className='border border-slate-300 px-2'>Internal ID</th>
<th className='border border-slate-300 px-2'>Name</th>
<th className='border border-slate-300 px-2'>Status</th>
<th className='border border-slate-300 px-2'>Action</th>
</tr>
</thead>
<tbody>
{dashboardData?.map((fetchedViews) => (
<tr className="border-b"  key={fetchedViews.referenceTypeCuid}> 
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
<Link href={`/referencetypes/${encodeURIComponent(fetchedViews.referenceTypeCuid)}`}>
  <a className="text-blue-600">
  {fetchedViews.referenceTypeId}
  </a>
  </Link>
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
  <Link href={`/referencetypes/${encodeURIComponent(fetchedViews.referenceTypeCuid)}`}>
  <a className="text-blue-600">
    {fetchedViews.referenceTypeCuid}   
    </a>
  </Link>
</td>
<td className={"px-2 py-2 text-sm font-light text-gray-900 border border-slate-300"}>
  <Link href={`/referencetypes/${encodeURIComponent(fetchedViews.referenceTypeCuid)}`}>
  {fetchedViews.referenceTypeName}   
  </Link>
</td>
<td className={"px-2 py-2 text-sm font-light text-gray-900 border border-slate-300"}>
  
  {fetchedViews.referenceTypeActive ? 'Active' : 'Archived'}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  
{fetchedViews.referenceTypeActive == 1 ? 

<button className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 mr-2" onClick={() => archiveReferenceType(fetchedViews.referenceTypeCuid, fetchedViews.referenceTypeActive)}><BiMinusCircle /></button>

: 

<button className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 mr-2" onClick={() => archiveReferenceType(fetchedViews.referenceTypeCuid, fetchedViews.referenceTypeActive)}><BiPlusCircle /></button>

}


<Link href={`/referencetypes/${encodeURIComponent(fetchedViews.referenceTypeCuid)}`}>
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