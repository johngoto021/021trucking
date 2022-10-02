import Layout from "../components/layout";
import Script from "next/script";
import { useState, useEffect } from "react";
import useSWR from "swr"

export default function ShipmentForm() {


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

  const fetcher3 = async () => {
    const response = await fetch('api/dropdowns/getloadtype')
    const data = await response.json()
    //setIsLoading(false)
    return data
  }

  const { data: data1, error: error1 } = useSWR('name1', fetcher1)
  const { data: data2, error: error2 } = useSWR('name2', fetcher2)
  const { data: data3, error: error3 } = useSWR('name3', fetcher3)
  
  const [shipmentName, setshipmentName] = useState("");
  const [shipmentCuid, setshipmentCuid] = useState("");
  const [accountCuid, setaccountCuid] = useState("");
  const [equipmentTypeCuid, setequipmentTypeCuid] = useState([]);
  
  const [trackingNumber, settrackingNumber] = useState("");
  const [moNumber, setmoNumber] = useState("");
  const [houseBillNumber, sethouseBillNumber] = useState("");

  const [APIResponse, setAPIResponse] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)

  const [ShipmentRef, setShipmentRef] = useState('');
  const [selectedList, setSelectedList] = useState([]);
 
  const [formValues, setFormValues] = useState([{ loadTypeCuid: '', quantity : 0, length : 0, width : 0, height : 0, totalWeight : 0, stackable : 0 }])

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
        //resetForm();
        console.log("form submitted successfully !!!");
      }
    } catch (error) {
      console.log("there was an error reading from the db", error);
    }
  };



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
      formValues,
    };
    
    console.log(JSON.stringify(formValues))
    //alert(JSON.stringify(formValues));

    try {
      
      const createdshipment = await fetch("/api/shipment/createdata4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //setAPIResponse2(createdshipment.json());
      
      if (createdshipment.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        //resetForm();
    
        //console.log(APIResponse2);
        console.log(createdshipment.json());
        //setAPIResponse2(createdshipment.json());
        //console.log(setAPIResponse2);
        //setShipmentRef(createdshipment.shipmentCuid);
        //setShipmentRef(createdshipment.shipmentCuid);
        //console.log(createdshipment.shipmentCuid);
        seeShipments();
        
        console.log("form submitted successfully !!!");
        //return createdshipment.json();
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

  
 
  const handleChange = e => {
    let { options } = e.target;
    let arrAn = [];  
    options = Array.apply(null, options)
    const selectedValues = options.filter(x => x.selected).map(x => x.value);
    setSelectedList(selectedValues);

    for ( let i= 0; i < selectedValues.length ; i++){  
      arrAn.push( { 'equipmentTypeCuid' : selectedValues[i]} );  
    }   

    const myJsonString = JSON.stringify(arrAn);  //convert javascript array to JSON string

    //setequipmentTypeCuid(arrAn)
    setequipmentTypeCuid(myJsonString);

    console.log(arrAn);

    
    //arrAn.push( { 'equipmentTypeCuid' : w.value } );  
  }


const handleChange2 = e => { 
    let arrAn = [];  
    let m = document.getElementsByClassName('myeqdd');
    let arrLen = document.getElementsByClassName('myeqdd').length;
    for ( let i= 0; i < arrLen ; i++){  
        let  w = m[i];                     
         if (w.checked){  
          arrAn.push( { 'equipmentTypeCuid' : w.value } );  
        }  
      }   
    const myJsonString = JSON.stringify(arrAn);  //convert javascript array to JSON string
    setequipmentTypeCuid(myJsonString);
    console.log(myJsonString);
    console.log(arrAn);
    
    //const newStr = myJsonString.substring(1, myJsonString.length-1);
  
   };

   let handleChange3 = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
 }
    
 const handleChange4 = e => { 
  let arrAn = [];  
  let m = document.getElementsByClassName('myltdd');
  let arrLen = document.getElementsByClassName('myltdd').length;
  for ( let i= 0; i < arrLen ; i++){  
      let  w = m[i];                     
       if (w.checked){  
        arrAn.push( { 'equipmentTypeCuid' : w.value } );  
      }  
    }   
  const myJsonString = JSON.stringify(arrAn);  //convert javascript array to JSON string
  setequipmentTypeCuid(myJsonString);
  console.log(myJsonString);
  console.log(arrAn);
  
  //const newStr = myJsonString.substring(1, myJsonString.length-1);

 };




 let handleChange5 = (i, e) => {
  let newFormValues = [...formValues];
  newFormValues[i][e.target.name] = e.target.value;
  setFormValues(newFormValues);
}




let handleChange6 = (i, e) => {
  let newFormValues = [...formValues];
  newFormValues[i][e.target.name] = e.target.value;
  //window.alert(i);

  if (e.target.checked) {
    newFormValues[i][e.target.name] = 1;
  }
  else{
    newFormValues[i][e.target.name] = 0;
  }

  setFormValues(newFormValues);
}




let handleChange7 = (i, e) => {
  let newFormValues = [...formValues];
  newFormValues[i][e.target.name] = parseFloat(e.target.value);  
  setFormValues(newFormValues);

}

let addFormFields = () => {
    setFormValues([...formValues, { loadTypeCuid: 0, quantity : 0, length : 0, width : 0, height : 0, totalWeight : 0, stackable : 0 }])
 }

let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
}

const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};





  return (

<>

<Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js" strategy="lazyOnload" />

<header className="bg-white shadow">
<div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Shipment</h1>
</div>
</header>
<main>




<div id="accordion-collapse" data-accordion="collapse">
  <h2 id="accordion-collapse-heading-1">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>What is Flowbite?</span>
      <svg data-accordion-icon="" className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-1" className="" aria-labelledby="accordion-collapse-heading-1">
    <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
      <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>







      <form action="#" method="POST" onSubmit={handleSubmit} className="w-full, max-w-full">

<span className="font-medium text-gray-700 mx-2 text-1xl">Equipment Type </span> 

  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4">
  
  {data2?.map((equipmentDD) => (
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600" key={equipmentDD.equipmentTypeCuid}>
      <div className="flex items-center pl-3">
        <input id={equipmentDD.equipmentTypeCuid} type="checkbox" value={equipmentDD.equipmentTypeCuid} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 myeqdd" name="equipmentTypeCuid" onChange={handleChange2} />
        <label htmlFor="equipmentTypeCuid" className="py-3 ml-2 w-full font-medium text-gray-900">{equipmentDD.equipmentTypeName}</label>
      </div>
    </li>
  ))}
  </ul>

  <div className="overflow-hidden shadow sm:rounded-md border-gray-200">
    <div className="bg-white px-4 py-5 sm:p-6">
      <div className="grid grid-cols-12 gap-3">

        <div className="col-span-6 sm:col-span-6 block text-sm font-medium text-gray-700 my-4">
          Shipment Number: {ShipmentRef}
          <input type="hidden" name="shipmentCuid" value={ShipmentRef} />
        </div>

        <div className="col-span6 sm:col-span-6 block text-sm font-medium text-gray-700 my-4">
          Total Weight:
        </div>

        <div className="col-span-6 sm:col-span-6">
          <label
          htmlFor="shipmentName"
          className="block text-sm font-medium text-gray-700"
          >Shipment Name
          </label>
          <input
          type="text"
          name="shipmentName"
          id="shipmentName"
          autoComplete="shipmentName"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => setshipmentName(e.target.value)}
          value={shipmentName}
          required="required"
          />
        </div>

        <div className="col-span-6 sm:col-span-6">
          <label
          htmlFor="accountCuid"
          className="block text-sm font-medium text-gray-700"
          >Customer Account
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

        <div className="col-span-4 sm:col-span-4">
          <label
          htmlFor="trackingNumber"
          className="block text-sm font-medium text-gray-700"
          >Tracking Id
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

        <div className="col-span-4 sm:col-span-4">
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

        <div className="col-span-4 sm:col-span-4">
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

        <div className="col-span-12 sm:col-span-12">
          <span className="font-medium text-gray-700 mx-2 text-2xl">Load </span> 
            <button className="p-0 w-7 h-7 bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none" type="button" onClick={() => addFormFields()}>
                        <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
                          <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                                  C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                                  C15.952,9,16,9.447,16,10z" />
                        </svg>
                        
            </button>
           
        </div>

        <div className="py-2 text-left col-span-12 sm:col-span-12 block">
          <table>
            <thead>
            <tr className="text-sm font-medium text-gray-700">
            <td>Type</td>
            <td>Quantity</td>
            <td>Length</td>
            <td>Width</td>
            <td>Height</td>
            <td>Total Weight</td>
            <td>Stackable?</td>
            </tr>
            </thead>
            <tbody>
          {formValues.map((element, index) => (
      
              <tr key={index}>
                <td>
                  <select name="loadTypeCuid" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 myltdd" 
                      onChange={(e) => {
                      handleChange5(index, e);
                      }}
                      required="required">
                      
                      {data3?.map((loadtypeDD) => (
                      <option key={loadtypeDD.loadTypeCuid} value={loadtypeDD.loadTypeCuid}
                      >{loadtypeDD.loadTypeName}</option>
                      ))}
                      </select>
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={element.quantity || "0"} onChange={e => handleChange7(index, e)}
                    required="required" />
                </td>
                <td>
                  <input type="number" name="length" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={element.length || "0"} onChange={e => handleChange7(index, e)} 
                  required="required"/>
                </td>
                <td>
                  <input type="number" name="width" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={element.width || "0"} onChange={e => handleChange7(index, e)}
                  required="required" />
                </td>
                <td>
                  <input type="number" name="height" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={element.height || "0"} onChange={e => handleChange7(index, e)}
                  required="required" />
                </td>
                <td>
                  <input type="number" name="totalWeight" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={element.totalWeight || "0"} onChange={e => handleChange7(index, e)}
                  required="required" />
                </td>
                <td>
                  <input type="checkbox" name="stackable" 
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  value="1" onChange={e => handleChange6(index, e)} />
                </td>
              
                {
                  index ? 
                    <td><button type="button"  
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-1 px-2 text-sm font-small text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 button remove"
                    onClick={() => removeFormFields(index)}>Remove</button></td>
                  : null
                }
              </tr>
              
            ))}
            </tbody>
          </table>
        </div>

        <div className="py-2 text-left col-span-12 sm:col-span-12">
          <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >Save
          </button>
        </div>
      </div>
    </div>
  </div>
</form>



      
    </div>
  </div>
  <h2 id="accordion-collapse-heading-2">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
      <span>Is there a Figma file available?</span>
      <svg data-accordion-icon="" className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
    <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
      <p className="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
    </div>
  </div>
  <h2 id="accordion-collapse-heading-3">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
      <span>What are the differences between Flowbite and Tailwind UI?</span>
      <svg data-accordion-icon="" className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
    <div className="p-5 font-light border border-t-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
      <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
      <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
      <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
        <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
        <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
      </ul>
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
    
    <select name="equipmentTypeCuid" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" >

{equiptypeDropDown?.map((equipmentDD) => (
<option key={equipmentDD.equipmentTypeCuid} value={equipmentDD.equipmentTypeCuid}
>{equipmentDD.equipmentTypeName}</option>
))}
</select>
    
<select name="equipmentTypeCuid" id="equipmentTypeCuid">
<option value="1">53&apos; / Trailer</option>
<option value="2">Flatbed</option>
<option value="3">Van</option>
<option value="4">Power Only</option>
<option value="5">Straight Truck</option>
                      </select>    


    */