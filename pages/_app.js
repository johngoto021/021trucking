import '../styles/globals.css';
import React from 'react';
import { Fragment } from 'react';
//import { useEffect } from "react";
//import { Provider }  from 'next-auth/providers/google';
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import Script from 'next/script'
/*
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}*/

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  
  //return getLayout(<UserProvider><Component {...pageProps} /></UserProvider>)
  //return getLayout(<Component {...pageProps} />)
  //return getLayout(<Fragment><Provider session={pageProps.session}><Component {...pageProps} /></Provider></Fragment>)
  //return getLayout(<Fragment><sessionProvider session={pageProps.session}><Component {...pageProps} /></sessionProvider></Fragment>)
  return getLayout(<Fragment>
    
    <div>
      <Head>
        <title>021 Cargo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js" strategy="afterInteractive" />    
      <Script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAYNbaX9jl_sdScfJIdeE6eC9hMl55krLI&libraries=places&callback=initMap" />

    </div>
     <SessionProvider session={pageProps.session} refetchInterval={0}><Component {...pageProps} /></SessionProvider></Fragment>)
}

//