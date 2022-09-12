import '../styles/globals.css';
import React from 'react';
import { Fragment } from 'react';
import { useEffect } from "react";
import  { Provider }  from 'next-auth/providers/google';
import { SessionProvider } from 'next-auth/react'

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
  return getLayout(<Fragment> <SessionProvider session={pageProps.session} refetchInterval={0}><Component {...pageProps} /></SessionProvider></Fragment>)
}
