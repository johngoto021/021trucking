import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from '../../components/layout'
import { BiTrashAlt, BiMinusCircle, BiRefresh, BiPlus, BiPlusCircle, BiPencil } from "react-icons/bi"; 

export default function Home() {


  const archiveAccessorial = async (accessorialCuid, accessorialActive) =>{
    const body = {accessorialCuid, accessorialActive};
    const response = await fetch("/api/accessorials", {
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
    const response = await fetch('api/accessorials')
    const data = await response.json()
    setDashboardData(data)
    //console.log(data);
    setIsLoading(false)
  }

  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState([])

    useEffect(() => {
      /*
      async function fetchDashboardData() {
        const response = await fetch('/api/accounts')
        const data = await response.json()
        setDashboardData(data)
        setIsLoading(false)
      }
      */
      fetchDashboardData()
    }, [])
  
    if (isLoading) {
      return <h2>Loading...</h2>
    }



//const [isLoading, setIsLoading] = useState(true)
//const [accessorialData, setAccessorial] = useState([])



return (

<>

<header className="bg-white shadow">
<div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Accessorials <span className="text-sm text-blue-600"><Link href="/accessorials/create">add new</Link></span></h1>
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
<tr className="border-b"  key={fetchedViews.accessorialCuid}> 
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
<Link href={`/accessorials/${encodeURIComponent(fetchedViews.accessorialCuid)}`}>
    <a className="text-blue-600">
  {fetchedViews.accessorialId}
  </a>
  </Link>
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
  <Link href={`/accessorials/${encodeURIComponent(fetchedViews.accessorialCuid)}`}>
    <a className="text-blue-600">
    {fetchedViews.accessorialCuid}
    </a>
  </Link>
</td>
<td className={"px-2 py-2 text-sm font-light text-gray-900 border border-slate-300"}>
  <Link href={`/accessorials/${encodeURIComponent(fetchedViews.accessorialCuid)}`}>
      {fetchedViews.accessorialName}
  </Link>
</td>
<td className={"px-2 py-2 text-sm font-light text-gray-900 border border-slate-300"}>
  
  {fetchedViews.accessorialActive ? 'Active' : 'Archived'}
</td>
<td className={"px-2 py-2 text-sm font-light text-gray-900 border border-slate-300"}>
  
{fetchedViews.accessorialActive == 1 ? 

<button className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 mr-2" onClick={() => archiveAccessorial(fetchedViews.accessorialCuid, fetchedViews.accessorialActive)}><BiMinusCircle /></button>

: 

<button className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 mr-2" onClick={() => archiveAccessorial(fetchedViews.accessorialCuid, fetchedViews.accessorialActive)}><BiPlusCircle /></button>

}


<Link href={`/accessorials/${encodeURIComponent(fetchedViews.accessorialCuid)}`}>
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

useEffect(() => {
async function fetchDashboardData() {
const response = await fetch('/api/accessorials')
const data = await response.json()

//setDashboardData(JSON.parse(data))
setAccessorial(data)
setIsLoading(false)
}
fetchDashboardData()
}, [])
*/