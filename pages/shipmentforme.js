import { useState, useEffect } from "react";
import useSWR from "swr"
import Layout from "../components/layout";
import Script from "next/script";




//
/*
const fetcher2 = async () => {
  const response2 = await fetch(&apos;api/dropdown/getequipmenttype&apos;)
  const equiptype = await response2.json()
  console.log(equiptype)
  return equiptype
}
*/
export default function ShipmentForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)

  const fetcher1 = async () => {
    const response = await fetch('api/account/getdataidname')
    const data = await response.json()
    setIsLoading(false)
    return data
  }
  
  const fetcher2 = async () => {
    const response = await fetch('api/dropdowns/getequipmenttype')
    const data = await response.json()
    setIsLoading2(false)
    return data
  }
  
  const { data: data1, error: error1 } = useSWR('name1', fetcher1)
  const { data: data2, error: error2 } = useSWR('name2', fetcher2)

  const [shipmentName, setshipmentName] = useState("");
  const [shipmentCuid, setshipmentCuid] = useState("");
  const [accountCuid, setaccountCuid] = useState("");
  //const [equipmentTypeCuid, setequipmentTypeCuid] = useState([]);
  //const [equipmentTypeCuid2, setequipmentTypeCuid2] = useState([]);
  //const [equipmentTypeCuid, setequipmentTypeCuid] = useState([{ equipmentTypeCuid: '' }]);
  const [equipmentTypeCuid, setequipmentTypeCuid] = useState();
  
  const [trackingNumber, settrackingNumber] = useState("");
  const [moNumber, setmoNumber] = useState("");
  const [houseBillNumber, sethouseBillNumber] = useState("");
  
  
  const [APIResponse, setAPIResponse] = useState(null);
  //const [accountName, setAccountName] = useState("");
  //const [accountNameSelected, setAccountNameSelected] = useState("");
  


  //const [accountDropDown, setAccountDropDown] = useState(null)
  const [equiptypeDropDown, setEquiptypeDropDown] = useState(null)
  
  
  const [ShipmentRef, setShipmentRef] = useState('');
  const [selectedList, setSelectedList] = useState([]);
  
  const [formValues, setFormValues] = useState([{ loadTypeCuid: "", quantity: "", length: "", width: "", height: "", totalWeight: "", stackable: ""}])

  /*
  useEffect(() => {
    async function fetchEquipTypeDropDown() {
      const response = await fetch('api/dropdowns/getequipmenttype')
      const data = await response.json()
      setEquiptypeDropDown(data)
      setIsLoading(false)
    }
    fetchEquipTypeDropDown()
  }, [])
  */
 
  useEffect(() => {
    
    console.log("shipmentName", shipmentName);
    console.log("accountCuid", accountCuid);
    console.log("equipmentTypeCuid", equipmentTypeCuid);
    console.log("trackingNumber", trackingNumber);
    console.log("moNumber", moNumber);
    console.log("houseBillNumber", houseBillNumber);
    console.log("APIResponse", APIResponse);
    
  }, [
    shipmentName,
    shipmentCuid,
    accountCuid,
    equipmentTypeCuid,
    trackingNumber,
    moNumber,
    houseBillNumber,
    APIResponse,
    ShipmentRef,
    
  ]);

  const seeShipments = async () => {
    try {
      const response = await fetch("/api/shipments", {
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

/*
  const equipmentTypeChecked=(event)=>{
    setequipmentTypeCuid(peopleInfos.map((info)=>{
     return {...info, checked:event.target.checked};
    }));

   // or
   
    // const people = [...peopleInfos];
    // people[index] = {...people[index], checked:event.target.checked};
    // setPeopleInfo([...people]);
  }
*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      shipmentName,
      shipmentCuid,
      accountCuid,
      equipmentTypeCuid,
      trackingNumber,
      moNumber,
      houseBillNumber,
    };
    //console.log(body)

    //const newEQ = JSON.stringify(body.equipmentTypeCuid); 
    //const newbody = JSON.stringify(body); 
    //console.log(newEQ);
    //console.log(newbody);
    try {
      
      const response = await fetch("/api/shipment/createdata3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      

      
      //console.log(body)

      
      
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        //resetForm();
        seeShipments();
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
      
      //check response, if success is false, dont take them to success page
      

    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  const resetForm = () => {
    setshipmentName("");
    setaccountCuid("");
    //setequipmentTypeCuid("");
    settrackingNumber("");
    setmoNumber("");
    sethouseBillNumber("");
  };

  
 /*
  const handleChange = e => {
    let { options } = e.target;
    options = Array.apply(null, options)
    const selectedValues = options.filter(x => x.selected).map(x => x.value);
    setSelectedList(selectedValues);
    setequipmentTypeCuid(selectedValues);
  }
*/

const handleChange = e => { 

    let arrAn = [];  
  
    //var m = $('.myChk'); 
    //let m = e.target.name; 
    let m = document.getElementsByClassName('myeqdd');
    
    /*
    const allWithClass = Array.from(
      document.getElementsByClassName('myeqdd')
    );
    
   
    const alleqdd = document.getElementsByClassName('myeqdd');

    console.log("mykass" + allWithClass);
    console.log("mykass2" + alleqdd);
  */

    //var arrLen = $('.myChk').length; 
    //let arrLen = e.target.length; 
    let arrLen = document.getElementsByClassName('myeqdd').length;
    for ( let i= 0; i < arrLen ; i++){  
        let  w = m[i];                     
         if (w.checked){  
          arrAn.push( { 'equipmentTypeCuid' : w.value } );  

          //console.log(w.value ); 
        }  
      }   
    
    const myJsonString = JSON.stringify(arrAn);  //convert javascript array to JSON string

    //setequipmentTypeCuid2(arrAn)
    setequipmentTypeCuid(myJsonString);

    const newStr = myJsonString.substring(1, myJsonString.length-1);
    //console.log(newStr);
    //setequipmentTypeCuid(newStr);
    //console.log(myJsonString);
    //console.log(arrAn);
    //console.log(newStr);
    //alert(myJsonString);
    //return myJsonString;
  
   }


/*
const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};
*/

if (isLoading && isLoading2) {
  return <h2>Loading...</h2>;
}


  return (



<>



<header className="bg-white shadow">
<div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Shipment</h1>
</div>
</header>
<main>

<div className="accordion" id="accordionExample">
  
  <div className="accordion-item bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingOne">
      <button className="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
        focus:bg-yellow-600
        focus:text-white
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
        aria-controls="collapseOne">
        STEP 1: Create Shipment 
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body py-4 px-5">

        <form action="#" method="POST" onSubmit={handleSubmit}>

          <div className="md:grid md:grid-cols-2 md:gap-6 px-6">
            Shipment Number: {ShipmentRef}
            <input type="hidden" name="shipmentCuid" value={ShipmentRef} />
          </div>

          <div className="col-span-4 sm:col-span-2">
            <button id="dropdownCheckboxButton" data-dropdown-toggle="dropdownDefaultCheckbox" className="text-gray-500 bg-gray-900 hover:bg-gray-900 hover:text-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">Equipment Type<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
            <div id="dropdownDefaultCheckbox" className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
              <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
              {data2?.map((equipmentDD) => (
                <li key={equipmentDD.equipmentTypeCuid}>
                  <div className="flex items-center">
                    <input id="{equipmentDD.equipmentTypeCuid}" type="checkbox" value={equipmentDD.equipmentTypeCuid} name="equipmentTypeCuid" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 myeqdd"
                    //onChange={(e) => setequipmentTypeCuid(e.target.value)}
                    onChange={handleChange}
                    />
                    <label htmlFor="equipmentTypeCuid" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{equipmentDD.equipmentTypeName}</label>
                  </div>
                </li>
              ))}
              </ul>
            </div>
          </div>
      
          <div className="col-span-4 sm:col-span-2">
            Total Weight: 
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
            htmlFor="shipmentName"
            className="block text-sm font-medium text-gray-700"
            >
            Shipment Name
            </label>
            <input
            type="text"
            name="shipmentName"
            id="shipmentName"
            autoComplete="shipmentName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setshipmentName(e.target.value)}
            value={shipmentName}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
            htmlFor="accountCuid"
            className="block text-sm font-medium text-gray-700"
            >
            Customer Account
            </label>

            <select name="accountCuid" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
            value={accountCuid}
            onChange={(e) => {
            setaccountCuid(e.target.value);
            }}
            >
            <option value={''} >Please select customer account</option>
            {data1?.map((accountDD) => (
            <option key={accountDD.accountCuid} value={accountDD.accountCuid}
            >{accountDD.accountName}</option>
            ))}
            </select>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label
            htmlFor="trackingNumber"
            className="block text-sm font-medium text-gray-700"
            >
            Tracking Id
            </label>
            <input
            type="text"
            name="trackingNumber"
            id="trackingNumber"
            autoComplete="trackingNumber"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => settrackingNumber(e.target.value)}
            value={trackingNumber}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label
            htmlFor="moNumber"
            className="block text-sm font-medium text-gray-700"
            >
            MO Number
            </label>
            <input
            type="text"
            name="moNumber"
            id="moNumber"
            autoComplete="moNumber"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setmoNumber(e.target.value)}
            value={moNumber}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
          <label
          htmlFor="houseBillNumber"
          className="block text-sm font-medium text-gray-700"
          >
          House Bill Number
          </label>
          <input
          type="text"
          name="houseBillNumber"
          id="houseBillNumber"
          autoComplete="houseBillNumber"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => sethouseBillNumber(e.target.value)}
          value={houseBillNumber}
          />
          </div>

          <div className="px-4 py-2 text-left sm:px-6">
            <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            Save
            </button>
          </div>
        
        </form>

      </div>
    </div>
  </div>

  <div className="accordion-item bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingTwo">
      <button className="
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
        aria-controls="collapseTwo">
        STEP 2: Add Accessorials
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body py-4 px-5">
        <strong>This is the second item&apos;s accordion body.</strong> It is hidden by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. These classes control the overall appearance, as well as the showing and
        hiding via CSS transitions. You can modify any of this with custom CSS or overriding
        our default variables. It&apos;s also worth noting that just about any HTML can go within
        the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  
  <div className="accordion-item bg-white border border-gray-200">
    <h2 className="accordion-header mb-0" id="headingThree">
      <button className="
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
        aria-controls="collapseThree">
        STEP 3: Add Route
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
    data-bs-parent="#accordionExample">
      <div className="accordion-body py-4 px-5">
        <strong>This is the third item&apos;s accordion body.</strong> It is hidden by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. These classes control the overall appearance, as well as the showing and
        hiding via CSS transitions. You can modify any of this with custom CSS or overriding
        our default variables. It&apos;s also worth noting that just about any HTML can go within
        the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
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
                        Shipment
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Equipment
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Tracking Id
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        MO Number.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {APIResponse?.map((shipmentView) => (
                      <tr className="border-b"  key={shipmentView.shipmentId}> 
                        <td
                          className={
                            "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          }
                        >
                          {shipmentView.shipmentId}
                        </td>
                        <td
                          className={
                            "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          }
                        >
                          {shipmentView.shipmentName} <br />
                          
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {shipmentView.equipmentTypeCuid}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {shipmentView.trackingNumber}   
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {shipmentView.moNumber} 
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


</main>
</>
    
    )}
    
    ShipmentForm.getLayout = function getLayout(page) {
      return (
        <Layout>
          {page}
        </Layout>
      )
    }

    /*
    onChange={(e) => {
setequipmentTypeCuid(e.target.value);


<select name="equipmentTypeCuid" 
value={equipmentTypeCuid}
onChange={handleChange}
multiple="multiple">
<option value="">Please select</option>
{data2?.map((equipmentDD) => (
<option key={equipmentDD.equipmentTypeCuid} value={equipmentDD.equipmentTypeCuid}
>{equipmentDD.equipmentTypeName}</option>
))}
</select>
    


<div className="col-span-4 sm:col-span-2">
<label
htmlFor="equipmentTypeCuid"
className="block text-sm font-medium text-gray-700"
>
Equipment Type
</label>




<select
        multiple
        name="equipmentTypeCuid"
        onChange={handleChange}>
{data2?.map((equipmentDD) => (
<option key={equipmentDD.equipmentTypeCuid} value={equipmentDD.equipmentTypeCuid}
>{equipmentDD.equipmentTypeName}</option>
))}
      </select>

      
      <br /><br />
      <b>Output:</b>
      <pre>{JSON.stringify(selectedList)}</pre>



</div>

<Script src="/assets/scripts/tw-elements-index.min.js" strategy="lazyOnload" /> 

*/