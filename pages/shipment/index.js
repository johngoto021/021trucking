//import { Navbar } from "flowbite-react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Layout from '../../components/layout'
//import { useUser } from '@auth0/nextjs-auth0'


/*const getServerSideProps = withPageAuthRequired();

console.log(getServerSideProps);

const membersOnly = () => {
    return (
        <div>
        <h1 className="text-5xl font-semibold mt-10 text-center text-indigo-600">This page is for Members Only.</h1>   
        </div>
    )
}
*/
//export default membersOnly;

//export const getServerSideProps = withPageAuthRequired();

export default function Home() {
  return (

<>

<div className="container-fluid">
<header className="bg-white shadow">
    <div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shipments</h1>
    </div>
  </header>
  <main>
    <div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4">
      
      <div className="px-4 py-6 sm:px-0">
        <div className="h-96 rounded-lg border-4 border-dashed border-gray-200">

          
        </div>
      </div>
      
    </div>
  </main>
  </div>

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

<link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" />

*/