//import Head from 'next/head'
//import styles from './layout.module.css'
import Navbar from './navbar'
import Footer from './footer'
//import { useState, useEffect } from "react";
import { Fragment, useContext } from 'react';
import { SessionProvider } from 'next-auth/react'

//import { UserProvider } from '@auth0/nextjs-auth0';


export default function Layout({ children }) {
  return (
    <>
      <Fragment>
        <SessionProvider>
        <Navbar />
        </SessionProvider>
        <main>{children}</main>
        <Footer />
      </Fragment>
    </>
  )
}

/*
   <UserProvider><Navbar /></UserProvider>

*/