import { useState } from "react";
import Link from 'next/link'
import Layout from "../../components/layout";
import prisma from '../../lib/prisma'

//const prisma = new PrismaClient();

export const getServerSideProps = async ({params}) => {
  //const {accountcuid} = params.accountcuid
  const { accountcuid } = params;
  const accountData = await prisma.account.findUnique({

    select: {
      accountId: true,
      accountCuid: true,
      accountName: true,
      referenceNumber: true,
      website: true,
      phone: true,
      address1: true,
      address2: true,
      city: true,
      region: true,
      postalCode: true,
      emailAddress: true,
      contact: true,
      country: true,
      accountStatus: true,
      marginRate: true,
    },

    where: {
      accountCuid: accountcuid
      //'cl94h144l0000vjygdfo5t933'
    }
  });
  console.log(accountData);
  return {
    props: {
      accountinfo: accountData
    }
  }
}

export default function AccountForm({ accountinfo }) {

  //const router = useRouter();
  //const {accountcuid} = router.query;
  //const fetchURL = "/api/accounts/getunique?accountcuid=" + router.query.accountcuid;
  const [accountName, setAccountName] = useState(accountinfo.accountName);
  const [accountCuid, setAccountCuid] = useState(accountinfo.accountCuid);
  const [accountId, setAccountId] = useState(accountinfo.accountId);
  const [emailAddress, setEmailAddress] = useState(accountinfo.emailAddress);
  const [phone, setPhone] = useState(accountinfo.phone);
  const [website, setWebsite] = useState(accountinfo.website);
  const [address1, setAddress1] = useState(accountinfo.address1);
  const [address2, setAddress2] = useState(accountinfo.address2);
  const [city, setCity] = useState(accountinfo.city);
  const [region, setRegion] = useState(accountinfo.region);
  const [postalCode, setPostalCode] = useState(accountinfo.postalCode);
  const [country, setCountry] = useState(accountinfo.country);
  const [referenceNumber, setReferenceNumber] = useState(accountinfo.referenceNumber);
  const [contact, setContact] = useState(accountinfo.contact);
  const [accountStatus, setAccountStatus] = useState(accountinfo.accountStatus);
  const [marginRate, setMarginRate] = useState(accountinfo.marginRate);
  const [submitmessage, setsubmitmessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      accountName,
      accountCuid,
      accountId,
      emailAddress,
      phone,
      website,
      address1,
      address2,
      city,
      region,
      postalCode,
      country,
      referenceNumber,
      emailAddress,
      contact,
      country,
      accountStatus,
      marginRate,
      };
    
    try {
      const response = await fetch("/api/accounts", {
        method: "PUT",
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
        //seeaccounts();
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
    setAccountName("");
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
            Account <span className="text-sm text-blue-600"><Link href="/accounts">View List</Link></span>
          </h1>
          <p>
            Use this form to add client account information. This information is
            used for billing and contact information.
          </p>
        </div>
      </header>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="accountCuid" value={accountinfo.accountCuid} />
              <input type="hidden" name="accountId" value={accountinfo.accountId} />
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    
                    <div className="col-span-6 sm:col-span-3">
                      Account ID: { accountinfo.accountId }
                      
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      Account CUID: { accountinfo.accountCuid }
                      
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="referenceNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Reference Number *
                      </label>
                      <input
                        type="text"
                        name="referenceNumber"
                        id="referenceNumber"
                        autoComplete="referenceNumber"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={accountinfo.companyName}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        required="required"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="accountName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Account Name *
                      </label>
                      <input
                        type="text"
                        name="accountName"
                        id="accountName"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setAccountName(e.target.value)}
                        defaultValue={accountinfo.accountName}
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
                        defaultValue={accountinfo.emailAddress}
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
                        defaultValue={accountinfo.phone}
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
                        defaultValue={accountinfo.address1}
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
                        defaultValue={accountinfo.address2}
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
                        defaultValue={accountinfo.city}
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
                        defaultValue={accountinfo.region}
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
                        defaultValue={accountinfo.postalCode}
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
                        value={accountinfo.country} defaultValue={accountinfo.country}
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
                        defaultValue={accountinfo.website}
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

AccountForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


//const fetchURL = "/api/accounts/getunique?accountcuid=" + {accountcuid};
  // Fetch data from external API
  //const res = await fetch(fetchURL)
  //const data = await res.json()


//const fetchURL2 = "/api/accounts/getunique?accountcuid=cl94haskg0004vjyg197bw7aa";
  
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
  
  //const accountcuid = context.params.accountcuid;
  const { accountcuid } = params;
  const accountData = await prisma.account.findUnique({

    select: {
      accountCuid: true,
      accountName: true,
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
      accountCuid: accountcuid
    }
  });
  



  // Pass data to the page via props
  return { props: { accountData } }
}
*/