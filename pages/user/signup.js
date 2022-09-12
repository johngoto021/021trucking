//import { Navbar } from "flowbite-react";
//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../../styles/Home.module.css'
//import { useEffect, useState } from "react";
//import { useLayoutEffect, useState } from "react";
import Layout from '../../components/layout'

import SignupForm from "../../components/user/signup-form";

export default function SignUpPage() {
  return (
    <div className="container-fluid">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sign Up for an Account</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4 justify-center">
          <div className="px-4 py-6 sm:px-0 ">
            <SignupForm />
          </div>
        </div>
      </main>
    </div>
  );
}

SignUpPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
