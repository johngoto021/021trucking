//import Head from "next/head";
//import Image from "next/image";
//import { getDriver } from "../api/drivers/getdriver"
//import { useState } from "react";
import { useState } from "react";
import Link from 'next/link'
//import useSWR from "swr"
//import { useEffect } from "react";
//import styles from "../styles/Home.module.css";
//import { Switch } from "@headlessui/react";
//import { useRouter } from 'next/router'
import Layout from "../../components/layout";
//import { data } from "autoprefixer";
//import { PrismaClient } from "@prisma/client"
import prisma from '../../lib/prisma'

//const prisma = new PrismaClient();

export const getServerSideProps = async ({params}) => {
  //const {drivercuid} = params.drivercuid
  const { drivercuid } = params;
  const driverData = await prisma.driver.findUnique({

    select: {
      driverId: true,
      driverCuid: true,
      driverName: true,
      courierService: true,
      companyName: true,
      emailAddress: true,
      phone: true,
      website: true,
      address1: true,
      address2: true,
      city: true,
      region: true,
      postalCode: true,
      country: true,
    },

    where: {
      driverCuid: drivercuid
      //'cl94h144l0000vjygdfo5t933'
    }
  });
  console.log(driverData);
  return {
    props: {
      driverinfo: driverData
    }
  }
}

export default function DriverForm({ driverinfo }) {

  //const router = useRouter();
  //const {drivercuid} = router.query;
  //const fetchURL = "/api/drivers/getunique?drivercuid=" + router.query.drivercuid;
  const [driverName, setDriverName] = useState(driverinfo.driverName);
  const [driverCuid, setDriverCuid] = useState(driverinfo.driverCuid);
  const [driverId, setDriverId] = useState(driverinfo.driverId);
  //const [courierService, setCourierService] = useState(driverinfo.courierService);
  const [companyName, setCompanyName] = useState(driverinfo.companyName);
  const [emailAddress, setEmailAddress] = useState(driverinfo.emailAddress);
  const [phone, setPhone] = useState(driverinfo.phone);
  const [website, setWebsite] = useState(driverinfo.website);
  const [address1, setAddress1] = useState(driverinfo.address1);
  const [address2, setAddress2] = useState(driverinfo.address2);
  const [city, setCity] = useState(driverinfo.city);
  const [region, setRegion] = useState(driverinfo.region);
  const [postalCode, setPostalCode] = useState(driverinfo.postalCode);
  const [country, setCountry] = useState(driverinfo.country);
  const [submitmessage, setsubmitmessage] = useState("");

  //const [APIResponse, setAPIResponse] = useState(null);
  //const { driverName, driverCuid, companyName, emailAddress, phone, website, address1, address2, city, region, postalCode, country } = formData;
  /*
  useEffect(() => {
   
    setDriverName(driverinfo.driverName)
    
  }, [
    driverName,
    courierService,
    companyName,
    emailAddress,
    phone,
    website,
    address1,
    address2,
    city,
    region,
    postalCode,
    country,
  ]);
*/


/*
  const seedrivers = async () => {
    try {
      const response = await fetch("/api/drivers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setAPIResponse(await response.json());
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        //resetForm();
        console.log("form submitted successfully !!!");
      }
    } catch (error) {
      console.log("there was an error reading from the db", error);
    }
  };
*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      driverName,
      driverCuid,
      driverId,
      companyName,
      emailAddress,
      phone,
      website,
      address1,
      address2,
      city,
      region,
      postalCode,
      country,
    };
    
    try {
      const response = await fetch("/api/drivers/updatedata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      //console.log(body);

      if (response.status !== 200) {
        setsubmitmessage('System failed to update your request.  Please try again.');
        console.log("something went wrong");
        //set an error banner here
      } else {
        //resetForm();
        //seedrivers();
        setsubmitmessage('The change requests were updated successfully!');
        console.log("form submitted successfully !!!");
         return data;
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  /*
  const resetForm = () => {
    setDriverName("");
    setCourierService("");
    setEmailAddress("");
    setWebsite("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setRegion("");
    setPostalCode("");
    setCountry("");
  };
*/
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Driver <span className="text-sm text-blue-600"><Link href="/drivers">View List</Link></span>
          </h1>
          <p>
            Use this form to add client driver information. This information is
            used for billing and contact information.
          </p>
        </div>
      </header>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="driverCuid" value={driverinfo.driverCuid} />
              <input type="hidden" name="driverId" value={driverinfo.driverId} />
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    
                    <div className="col-span-6 sm:col-span-3">
                      Driver ID: { driverinfo.driverId }
                      
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Driver CUID: { driverinfo.driverCuid }
                      
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        autoComplete="companyName"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={driverinfo.companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required="required"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="driverName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Driver Name *
                      </label>
                      <input
                        type="text"
                        name="driverName"
                        id="driverName"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setDriverName(e.target.value)}
                        defaultValue={driverinfo.driverName}
                        required="required"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="emailAddress"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="emailAddress"
                        id="emailAddress"
                        autoComplete="emailAddress"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={driverinfo.emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setPhone(e.target.value)}
                        defaultValue={driverinfo.phone}
                      />
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="address1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="address1"
                        id="address1"
                        autoComplete="address1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={driverinfo.address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="address2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address 2
                      </label>
                      <input
                        type="text"
                        name="address2"
                        id="address2"
                        autoComplete="address2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={driverinfo.address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={driverinfo.city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="region"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={driverinfo.region}
                        onChange={(e) => setRegion(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        autoComplete="postalCode"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={driverinfo.postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setCountry(e.target.value)}
                        value={driverinfo.country} defaultValue={driverinfo.country}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Website
                      </label>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        autoComplete="website"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={driverinfo.website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                  <span className="text-red-500 mx-5 text-sm font-medium">{ submitmessage }</span>
                </div>

                  </div>
                </div>
                
              </div>
            </form>
          </div>
        </div>

        


      </div>
    </>
  );
}

DriverForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


//const fetchURL = "/api/drivers/getunique?drivercuid=" + {drivercuid};
  // Fetch data from external API
  //const res = await fetch(fetchURL)
  //const data = await res.json()


//const fetchURL2 = "/api/drivers/getunique?drivercuid=cl94haskg0004vjyg197bw7aa";
  
  /*
  const fetcher1 = async () => {
    const response = await fetch(fetchURL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      })
    const data = await response.json()
    return data
  };

  const { data: data1, error: error1 } = useSWR('name1', fetcher1);


console.log(router);

console.log(fetchURL);
//console.log(fetchURL2);
console.log(data1);
  */


/*
export async function getServerSideProps({params}) {
  
  //const drivercuid = context.params.drivercuid;
  const { drivercuid } = params;
  const driverData = await prisma.driver.findUnique({

    select: {
      driverCuid: true,
      driverName: true,
      courierService: true,
      companyName: true,
      emailAddress: true,
      phone: true,
      website: true,
      address1: true,
      address2: true,
      city: true,
      region: true,
      postalCode: true,
      country: true,
    },

    where: {
      driverCuid: drivercuid
    }
  });
  



  // Pass data to the page via props
  return { props: { driverData } }
}
*/