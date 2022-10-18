//import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import Layout from '../../components/layout'
//import { Navbar } from "flowbite-react";
//import Head from 'next/head'
//import Image from 'next/image'
import Link from 'next/link'
//import styles from '../styles/Home.module.css'
//import { useUser } from '@auth0/nextjs-auth0'
//import axios from "axios";
//import cuid from 'cuid';
//import { useSession, signIn, signOut } from 'next-auth';
import { BiTrashAlt, BiMinusCircle, BiRefresh, BiPlus, BiPlusCircle, BiPencil } from "react-icons/bi";

export default function Drivers() {
  
  //const [session] = useSession();


  //const mycuid = cuid();
  //console.log( cuid() );
  //console.log(mycuid);

/*
var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://dev-b8c2qsq6.us.auth0.com/api/v2/users',
  params: {q: 'name:"John Wong"', search_engine: 'v3'},
  headers: {authorization: '2363bef524807193387b8b53266ba90c2831f5024999bc2a92685a217cb7cecd'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
*/


//  const {user, error, isloading} = useUser();

 
//  console.log(user);

  /*
  const MainContent = 'is logged in'
  const SomeOtherComponent  = 'test'
  */
  /*
  if(isloading) {
    return (
      <div className="alert alert-warning" role="alert">...Loading</div>
    )
  }


  if(user) {
    return (
      <>
      <h1>Welcome Back!</h1>
      
      <p>You're login as {user.name} with the following email {user.email}</p>

      <Link href="/api/auth/logout">
          <a className='btn btn-primary' role="button">logout</a>
        </Link>
      </>
    )
  }
  */

  const archiveDriver = async (driverCuid, driverStatus) =>{
    const body = {driverCuid, driverStatus};
    const response = await fetch("/api/drivers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json()
    //console.log(data)
    fetchDashboardData()
  }

  const fetchDashboardData = async () => {
    const response = await fetch('api/drivers')
    const data = await response.json()
    setDashboardData(data)
    setIsLoading(false)
    console.log(data);
  }

  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState([])
  
  useEffect(() => {
    /* async function fetchDashboardData() {
      const response = await fetch('api/drivers/')
      const data = await response.json()
      setDashboardData(data)
      setIsLoading(false)
    } */
    fetchDashboardData()
  }, [])
  



/*
  const archiveDriver =async (driverCuid) => {
    const response = await fetch(`/api/drivers/${driverCuid}`, {
      method: 'DELETE',
    })
    const data = await response.json()
  }  
  */  
    
    if (isLoading) {
      return <h2>Loading...</h2>
    }

  return (

<>

<header className="bg-white shadow">
<div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Drivers 
<span className="text-sm text-blue-600 ml-3"><Link href="/driver/create">add new</Link></span></h1>
</div>
</header>
<main>
<div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4">
<div className="px-4 py-6 sm:px-0">

<button className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-1 px-1 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700" 
title="Click here to refresh list" 
onClick={fetchDashboardData}>Refresh List</button>


<table className='border-collapse border border-slate-400 table-auto w-full'>
<thead>
<tr>
<th className='border border-slate-300 px-4'>ID</th>
<th className='border border-slate-300 px-4'>Company</th>
<th className='border border-slate-300 px-4'>Driver</th>
<th className='border border-slate-300 px-4'>Address</th>
<th className='border border-slate-300 px-4'>Address</th>
<th className='border border-slate-300 px-4'>City</th>
<th className='border border-slate-300 px-4'>State</th>
<th className='border border-slate-300 px-4'>Postal</th>
<th className='border border-slate-300 px-4'>Country</th>
<th className='border border-slate-300 px-4'>Email</th>
<th className='border border-slate-300 px-4'>Phone</th>
<th className='border border-slate-300 px-4'>Website</th>
<th className='border border-slate-300 px-4'>Date Created</th>
<th className='border border-slate-300 px-4'>Status</th>
<th className='border border-slate-300 px-4'>Action</th>
</tr>
</thead>

<tbody>
{dashboardData?.map((fetchedViews) => (

<tr className="border-b"  key={fetchedViews.driverCuid}> 
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
<Link href={`/drivers/${encodeURIComponent(fetchedViews.driverCuid)}`}>
  <a className="text-blue-600">{fetchedViews.driverId}</a>
</Link>
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
<Link href={`/drivers/${encodeURIComponent(fetchedViews.driverCuid)}`}>
  <a className="text-blue-600">{fetchedViews.companyName}</a>
</Link>
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.driverName}   
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.address1}   
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.address2}   
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.city}   
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.region}   
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.postalCode}   
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.country}   
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.emailAddress}   
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.phone}
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.website}   
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.dateCreated}
</td>
<td className={"px-2 py-2 text-sm font-medium text-gray-900 border border-slate-300"}>
{fetchedViews.driverStatus == 1 ? 'Active' : 'Archived'}
</td>
<td>

{fetchedViews.driverStatus == 1 ? 

  <button className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 mr-2" onClick={() => archiveDriver(fetchedViews.driverCuid, fetchedViews.driverStatus)}><BiMinusCircle /></button>

  : 
   
   <button className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 mr-2" onClick={() => archiveDriver(fetchedViews.driverCuid, fetchedViews.driverStatus)}><BiPlusCircle /></button>
   
   }

  <Link href={`/drivers/${encodeURIComponent(fetchedViews.driverCuid)}`}>
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

Drivers.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

/*

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