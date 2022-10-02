//import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

import { signIn, signOut, useSession } from "next-auth/react"

//import styles from './navbar.module.css'
//import { UserProvider } from '@auth0/nextjs-auth0';
//import { useUser } from '@auth0/nextjs-auth0'

export default function Navbar() {

    //const {user, error, isloading} = useUser();

    const { data: session, status } = useSession()
    const loading = status === "loading"
    
    return (
      
<>

    <Script
    src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"
    strategy="lazyOnload" />  

    

      
      <nav className="border-gray-600 bg-gray-900 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-8xl px-4 md:px-6 py-2.5">
              <Link href={'/'}> 
              <a className="flex items-center">
                <Image alt="logo" src={'/assets/images/021SvcLogo3.png'} width={95} height={45} />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Cargo</span>
              </a>
              </Link>
      
              <button data-collapse-toggle="mega-menu-full" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-full" aria-expanded="false">
                      <span className="sr-only">Open main menu</span>
                      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              </button>
              <div id="mega-menu-full" className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
                  <ul className="flex flex-col mt-4 text-sm font-medium md:flex-row md:space-x-8 md:mt-0">
                      <li>
                      <Link href="/" >
                        <a className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
                      </Link>
                          
                      </li>
                      <li>
                          <button id="mega-menu-full-dropdown-button" data-collapse-toggle="mega-menu-full-dropdown" className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-500 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700">Shipment <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                      </li>
                      <li>
                        <Link href="#" >
                          <a className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700">My Invoices</a>
                          </Link>
                      </li>
                      <li>
                        <Link href="accessorials" >
                          <a className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700">Accessorials</a>
                        </Link>
                      </li>
                      <li>
                     
                        
                      <Link href={session ? '/api/auth/signout' : '/api/auth/signin'} >          
                          <a className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700">
                          {session ? 'Logout' : 'Login'}</a></Link>
         

                      

                      </li>
                      <li><Image src={'/assets/images/profileicon.png'} className="rounded-full" width={25} height={25} alt="MyProfile" /></li>

                      
                  </ul>
              </div>
          </div>
          <div id="mega-menu-full-dropdown" className="hidden bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600">
              <div className="grid py-5 px-4 mx-auto max-w-screen-xl text-gray-900 dark:text-white sm:grid-cols-2 md:grid-cols-3 md:px-6">
                  <ul aria-labelledby="mega-menu-full-dropdown-button">
                      <li>
                      <Link href="shipmentform" >          
                          <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="font-semibold">Create Shipment</div>
                              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Create a shipment order here.</span>
                          </a>
                          </Link>
                      </li>
                      <li>
                      <Link href="shipments" >          
                          <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="font-semibold">Shipments</div>
                              <span className="text-sm font-light text-gray-500 dark:text-gray-400">View a list of shipments.</span>
                          </a>
                          </Link>
                      </li>
                      <li>
                      <Link href="#" >          
                          <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="font-semibold">Quotes</div>
                              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Request a shipment quote here</span>
                          </a>
                          </Link>
                      </li>
                  </ul>
                  <ul>
                      <li>
                      <Link href="accounts" >          
                          <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="font-semibold">Accounts</div>
                              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Manage and view list of client accounts.</span>
                          </a>
                          </Link>
                      </li>
                      <li>
                      <Link href="accountform" >                   
                          <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="font-semibold">Add Account</div>
                              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Add client accounts.</span>
                          </a>
                          </Link>
                      </li>
                      <li>
                      <Link href="equipmenttypes">
                          <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="font-semibold">Equipments</div>
                              <span className="text-sm font-light text-gray-500 dark:text-gray-400">View and nanage equipments</span>
                          </a>
                          </Link>
                      </li>
                  </ul>
                  <ul className="hidden md:block">
                      <li>
                      <Link href="accessorials" >
                          <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="font-semibold">Accessorials</div>
                              <span className="text-sm font-light text-gray-500 dark:text-gray-400">View and manage accessorials.</span>
                          </a>
                          </Link>
                      </li>
                      <li>
                      <Link href="#" >
                          <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="font-semibold">Invoice Management</div>
                              <span className="text-sm font-light text-gray-500 dark:text-gray-400">Connect with third-party tools that youare already using.</span>
                          </a>
                          </Link>
                      </li>
                      <li>
                      <Link href="#" >
                          <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="font-semibold">Drivers</div>
                              <span className="text-sm font-light text-gray-500 dark:text-gray-400">View and manager list of drives.</span>
                          </a></Link>
                      </li>
                      
                  </ul>
              </div>
          </div>
      </nav>

      </>
      
    )
  }

/* 


 {!session && (
            <>
              <Link href={'/api/auth/signin'} >     
              <a className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700"  
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
              </Link>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <Link href={'/api/auth/signout'} >     
              <a className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
              </Link>
            </>
          )}
        

 <Link href="/user/signup" >          
                          <a className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700">
                          SignUp</a></Link>


<Link href={user ? '/api/auth/logout' : '/api/auth/login'} >          
                          <a className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700">
                          {user ? 'Logout' : 'Login'}</a></Link>

  const {user, error, isloading} = useUser();
  const style1 = {color: '#598392'};
  const style2 = {fontSize: '30px'};  

    <Script
    src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"
    strategy="lazyOnload"
    onLoad={() =>
    console.log(`script loaded correctly, window.FB has been populated`)
    }/>

  */

  /*


<Link href={user ? '/api/auth/logout' : '/api/auth/login'} >
                          <a className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0 dark:text-gray-400 md:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-yellow-500 md:dark:hover:bg-transparent dark:border-gray-700">
                            {user ? 'Logout' : 'Login'}
                          </a>
                        </Link>   

  not sure what className mt-1 means, it causes nav bar to drop
  <div id="mega-menu-full-dropdown" className="hidden mt-1 bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600">
  */