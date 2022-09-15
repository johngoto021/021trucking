//import { Navbar } from "flowbite-react";
//import Head from 'next/head'
//import Image from 'next/image'
//import Link from 'next/link'
//import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
//import { useUser } from '@auth0/nextjs-auth0'
//import axios from "axios";
//import cuid from 'cuid';
//import { useSession, signIn, signOut } from 'next-auth';
//import 'tw-elements';
import Script from 'next/script'
//import 'tw-elements';

if (typeof window !== 'undefined') {
  console.log('You are on the browser');
  <Script src="./TW-ELEMENTS-PATH/dist/js/index.min.js" strategy="lazyOnload" />;
  //<Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js" />
} else {
  console.log('You are on the server');
  <Script src="./TW-ELEMENTS-PATH/dist/js/index.min.js" strategy="lazyOnload" />
}






export default function Home() {
  
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

  return (

<>

<header className="bg-white shadow">
    <div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
    </div>
  </header>
  <main>
    <div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4">
      
      <div className="px-4 py-6 sm:px-0">
        
      <ul className="stepper" data-mdb-stepper="stepper">
  <li className="stepper-step stepper-active">
    <div className="stepper-head">
      <span className="stepper-head-icon"> 1 </span>
      <span className="stepper-head-text"> step1 </span>
    </div>
    <div className="stepper-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </div>
  </li>
  <li className="stepper-step">
    <div className="stepper-head">
      <span className="stepper-head-icon"> 2 </span>
      <span className="stepper-head-text"> step2 </span>
    </div>
    <div className="stepper-content">
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
  </li>
  <li className="stepper-step">
    <div className="stepper-head">
      <span className="stepper-head-icon"> 3 </span>
      <span className="stepper-head-text"> step3 </span>
    </div>
    <div className="stepper-content">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </div>
  </li>
</ul>





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