//import Head from 'next/head'
import Link from 'next/link'
//import Image from 'next/image'
//import styles from './footer.module.css'

export default function Footer() {
    return (
      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">&copy;2022 <a href="https://gtoto021.com/" className="hover:underline">Zero to One</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
              </li>
              <li>
                <Link href={'/privacypolicy'}>
                  <a className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </Link>
              </li>
              <li>
              <Link href={'/contactus'}>
                <a className="hover:underline">Contact Us</a>
              </Link>  
              </li>
          </ul>
      </footer>
    )
  }