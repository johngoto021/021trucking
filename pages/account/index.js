//import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import Layout from '../../components/layout'
//import { Navbar } from "flowbite-react";
//import Head from 'next/head'
//import Image from 'next/image'
//import Link from 'next/link'
//import styles from '../styles/Home.module.css'
//import { useUser } from '@auth0/nextjs-auth0'
//import axios from "axios";
//import cuid from 'cuid';
//import { useSession, signIn, signOut } from 'next-auth';
 
export default function Accounts() {
  
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


  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState([])
    useEffect(() => {
      async function fetchDashboardData() {
        const response = await fetch('api/account/getdata')
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
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Client Accounts</h1>
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
<th>References</th>
<th>Address</th>
<th>Contact</th>
<th>Phone</th>
<th>Date Created</th>
<th>Status</th>
</tr>
</thead>

<tbody>
{dashboardData?.map((fetchedViews) => (

<tr className="border-b"  key={fetchedViews.accountCuid}> 
<td
className={
"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
}
>
{fetchedViews.accountId}
</td>
<td
className={
"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
}
>
<a href="#">
{fetchedViews.accountName}   
</a>
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.referenceNumber}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.address1}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.contact}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.contact}   
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.phone}
</td>
<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
{fetchedViews.accountStatus}
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

Accounts.getLayout = function getLayout(page) {
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