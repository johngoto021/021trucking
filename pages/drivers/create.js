//import Head from "next/head";
//import Image from "next/image";
import { useState } from "react";
import Link from 'next/link'
//import { useEffect } from "react";
//import styles from "../styles/Home.module.css";
//import { Switch } from "@headlessui/react";
import Layout from "../../components/layout";

export default function DriverForm() {
  const [driverName, setDriverName] = useState("");
  const [courierService, setCourierService] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("US");
  const [APIResponse, setAPIResponse] = useState(null);

  /*
  useEffect(() => {
    console.log("driverName", driverName);
    console.log("courierService", courierService);
    console.log("emailAddress", emailAddress);
    console.log("website", website);
    console.log("address1", address1);
    console.log("address2", address2);
    console.log("city", city);
    console.log("region", region);
    console.log("postalCode", postalCode);
    console.log("country", country);
    console.log("APIResponse", APIResponse);
  }, [
    driverName,
    courierService,
    emailAddress,
    website,
    address1,
    address2,
    city,
    region,
    postalCode,
    country,
    APIResponse,
  ]);
*/

  const seedrivers = async () => {
    try {
      const response = await fetch("/api/drivers/getdata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setAPIResponse(await response.json());
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        console.log("form submitted successfully !!!");
      }
    } catch (error) {
      console.log("there was an error reading from the db", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      driverName,
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
    console.log(body);
    try {
      const response = await fetch("/api/drivers/createdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        seedrivers();
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  const resetForm = () => {
    setDriverName("");
    setCompanyName("");
    setCourierService("");
    setEmailAddress("");
    setWebsite("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setRegion("");
    setPostalCode("");
    setCountry("");
    setPhone("");

  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Driver
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
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">

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
                        required="required"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={companyName}
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
                        value={driverName}
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
                        onChange={(e) => setEmailAddress(e.target.value)}
                        value={emailAddress}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone"
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
                        value={phone}
                      />
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="address1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address1"
                        id="address1"
                        autoComplete="address1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setAddress1(e.target.value)}
                        value={address1}
                      />
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="address2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street Address 2
                      </label>
                      <input
                        type="text"
                        name="address2"
                        id="address2"
                        autoComplete="address2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setAddress2(e.target.value)}
                        value={address2}
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
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
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
                        onChange={(e) => setRegion(e.target.value)}
                        value={region}
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
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
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
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={website}
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-12">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                
              </div>
            </form>
          </div>
        </div>

        

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Company
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Driver
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {APIResponse?.map((driverView) => (
                      <tr className="border-b"  key={driverView.driverId}> 
                        <td
                          className={
                            "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          }
                        >

<Link href={`/driver/${encodeURIComponent(driverView.driverCuid)}`}>

                          {driverView.driverId}
                          </Link>
                        </td>
                        <td
                          className={
                            "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          }
                        >
                          {driverView.companyName}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {driverView.driverName}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {driverView.emailAddress}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {driverView.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

DriverForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
