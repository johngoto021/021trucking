import { useState, useEffect } from "react";
import useSWR from "swr"
import Layout from "../components/layout";
import Script from "next/script";


export default function ShipmentForm() {

  const fetcher1 = async () => {
    const response = await fetch('api/account/getdataidname')
    const data = await response.json()
    setIsLoading(false)
    return data
  };
  
  const fetcher2 = async () => {
    const response = await fetch('api/dropdowns/getequipmenttype')
    const data = await response.json()
    setIsLoading2(false)
    return data
  };

  const fetcher4 = async () => {
    const response = await fetch('api/dropdowns/getaccessorial')
    const data = await response.json()
    setIsLoading4(false)
    return data
  };
  
  const fetcher3 = async () => {
    const response = await fetch('api/dropdowns/getloadtype')
    const data = await response.json()
    setIsLoading3(false)
    return data
  };
  
  const { data: data1, error: error1 } = useSWR('name1', fetcher1);
  const { data: data2, error: error2 } = useSWR('name2', fetcher2);
  const { data: data3, error: error3 } = useSWR('name3', fetcher3);
  const { data: data4, error: error4 } = useSWR('name4', fetcher4);
  
  const [shipmentName, setshipmentName] = useState("");
  const [shipmentCuid, setshipmentCuid] = useState("");
  const [accountCuid, setaccountCuid] = useState("");
  const [equipmentTypeCuid, setequipmentTypeCuid] = useState([]);
  //const [loadTypeCuid, setLoadTypeCuid] = useState([]);
  const [accessorialCuid, setaccessorialCuid] = useState([]);
  //const [equipmentTypeCuid2, setequipmentTypeCuid2] = useState([]);
  //const [equipmentTypeCuid, setequipmentTypeCuid] = useState([{ equipmentTypeCuid: '' }]);
  //const [equipmentTypeCuid, setequipmentTypeCuid] = useState();
  const [trackingNumber, settrackingNumber] = useState("");
  const [moNumber, setmoNumber] = useState("");
  const [houseBillNumber, sethouseBillNumber] = useState("");
  const [shipmentNote, setShipmentNote] = useState("");
  const [shipmentStatus, setShipmentStatus] = useState(1);
  const [shipmentTimeZone, setShipmentTimeZone] = useState("");
  

  const [APIResponse, setAPIResponse] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [isLoading3, setIsLoading3] = useState(true)
  const [isLoading4, setIsLoading4] = useState(true)
  const [submitmessage, setsubmitmessage] = useState("")
  
  const [ShipmentRef, setShipmentRef] = useState('');
  //const [selectedList, setSelectedList] = useState([]);
  
 
  const [formValues, setFormValues] = useState([{ loadTypeCuid: '', quantity : 0, length : 0, width : 0, height : 0, totalWeight : 0, stackable : 0 }])

  const [formLocationValues, setFormLocationValues] = useState([{ locationType: "P", locationName : "", locationFullAddress : "", dateStart : "", dateEnd : "", dateStart2 : "", dateEnd2 : "", locationReference : "", locationContact : "", locationPhone : "", timeStart : "", timeEnd : "" }])

  useEffect(() => {
 /*   
    console.log("shipmentName", shipmentName);
    console.log("accountCuid", accountCuid);
    console.log("equipmentTypeCuid", equipmentTypeCuid);
    console.log("trackingNumber", trackingNumber);
    console.log("moNumber", moNumber);
    console.log("houseBillNumber", houseBillNumber);
    console.log("APIResponse", APIResponse);
   */ 
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
    accessorialCuid,
    shipmentStatus,
    shipmentTimeZone,
  ]);

  const seeShipments = async () => {
    try {
      const response = await fetch("/api/shipment/getpagingdata", {
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
      accessorialCuid,
      formLocationValues,
      shipmentStatus,
      shipmentNote,
      shipmentTimeZone,
    };
    
    //console.log(JSON.stringify(formValues))
    //alert(JSON.stringify(formValues));

    try {
      

      if (equipmentTypeCuid.length === 0) { 
        console.log("Equipment Type is not checked!");
        window.alert('You must select an Equipment Type!');
        setsubmitmessage('You must select Equipment Type!');
        return true;
        };

      if (accessorialCuid.length === 0) { 
        console.log("Accessorial is not checked!");
        window.alert('You must select an Accessorial Type!');
        setsubmitmessage('You must select Accessorial Type!');
        return true;
        };

      const createdshipment = await fetch("/api/shipment/createdata5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
      //setAPIResponse2(createdshipment.json());
      
      if (createdshipment.status !== 200) {
        setsubmitmessage('Something went wrong, your entries were NOT saved');
        console.log("something went wrong");
        //set an error banner here
      } else {
        //resetForm();
    
        //console.log(APIResponse2);
        
        //console.log(createdshipment.json());

        //setAPIResponse2(createdshipment.json());
        //console.log(setAPIResponse2);
        //setShipmentRef(createdshipment.shipmentCuid);
        //setShipmentRef(createdshipment.shipmentCuid);
        //console.log(createdshipment.shipmentCuid);
        seeShipments();
        setsubmitmessage('Your entries were saved');
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


   const handleChange9 = e => { 
    let arrAn2 = [];  
    let n = document.getElementsByClassName('myaccdd');
    let arrLen2 = document.getElementsByClassName('myaccdd').length;
    for ( let i= 0; i < arrLen2 ; i++){  
        let  z = n[i];                     
         if (z.checked){  
          arrAn2.push( { 'accessorialCuid' : z.value } );  
        }  
      }   
    const myJsonString3 = JSON.stringify(arrAn2);  //convert javascript array to JSON string
    setaccessorialCuid(myJsonString3);
    /*
    if (arrAn2.length === 0) { 
      setaccessorialCuid([]);
    }
    else {
      setaccessorialCuid(myJsonString3);
    }
    */
    //console.log(myJsonString3);
    console.log(arrAn2);
    
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
    setFormValues([...formValues, { loadTypeCuid: '', quantity : 0, length : 0, width : 0, height : 0, totalWeight : 0, stackable : 0 }])
 }

let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
}


let handleChange10 = (i, e) => {
  let newFormLocationValues = [...formLocationValues];
  newFormLocationValues[i][e.target.name] = e.target.value;
  setFormLocationValues(newFormLocationValues);
  console.log(formLocationValues);
}

let handleChange11 = (i, e) => {
  let newFormLocationValues = [...formLocationValues];
  let newFormLocationValues2 = [...formLocationValues];
  //newFormLocationValues[i][e.target.name] = e.target.value;
  newFormLocationValues[i][e.target.name] = e.target.value;
  newFormLocationValues[i][e.target.name+2] = e.target.value+'T00:00:00.000Z';
  //newFormLocationValues[i]['endDate2'] = e.target.value+'T00:00:00.000Z';
  //newFormLocationValues2[i][e.target.name] = e.target.value+'T00:00:00.000Z';
  setFormLocationValues(newFormLocationValues);
  console.log(formLocationValues);
  //console.log(newFormLocationValues2);
}


let addFormLocationFields = () => {
  setFormLocationValues([...formLocationValues, { locationType: "P", locationName : "", locationFullAddress : "", dateStart : "", dateEnd : "", dateStart2 : "", dateEnd2 : "", locationReference : "", locationContact : "", locationPhone : "", timeStart : "", timeEnd : "" }])
}

let removeFormLocationFields = (i) => {
  let newFormLocationValues = [...formLocationValues];
  newFormLocationValues.splice(i, 1);
  setFormLocationValues(newFormLocationValues)
}

let handleQuoteButtonClick = () => {
  setShipmentStatus(2);
}

/*
if (!data1 || !data2 || !data3 || !data4) {
  return <h2>Loading...</h2>;
}
*/

  return (



<>






<header className="bg-white shadow">
<div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Shipment</h1>
</div>
</header>
<main>


<div id="accordion-collapse" data-accordion="collapse">
  <h2 id="accordion-collapse-heading-1">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>Step 1: Create Shipment</span><span className="text-red-500 mx-5 text-sm font-medium">{ submitmessage }</span>
      <svg data-accordion-icon="" className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-1" className="" aria-labelledby="accordion-collapse-heading-1">
    <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
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
                required="required">
                <option value="">Please select customer account</option>
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

              <fieldset className="py-2 text-left col-span-12 sm:col-span-12 border rounded-lg p-5">
                <legend className="font-medium text-gray-700 mx-2 text-2xl">Load 
                
                <button className="inline-flex justify-center rounded-md border border-transparent bg-green-500  mx-2 px-2 text-xs font-normal text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-1"
                  type="button" onClick={() => addFormFields()}>Add Routes</button>
                </legend>

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
                            min="-1" max="200" step="1" maxLength={9}
                            required="required" />
                        </td>
                        <td>
                          <input type="number" name="length" 
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={element.length || "0"} onChange={e => handleChange7(index, e)} 
                          min="-1" max="200" step="1" maxLength={9}
                          required="required" />
                        </td>
                        <td>
                          <input type="number" name="width" 
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={element.width || "0"} onChange={e => handleChange7(index, e)}
                          min="-1" max="200" step="1" maxLength={9}
                          required="required" />
                        </td>
                        <td>
                          <input type="number" name="height" 
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={element.height || "0"} onChange={e => handleChange7(index, e)}
                          min="-1" max="200" step="1" maxLength={9}
                          required="required" />
                        </td>
                        <td>
                          <input type="number" name="totalWeight" 
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={element.totalWeight || "0"} onChange={e => handleChange7(index, e)}
                          min="-1" max="9999" step="1" maxLength={11}
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
              </fieldset>

              <fieldset className="py-2 text-left col-span-12 sm:col-span-12 border rounded-lg p-5">
                <legend className="font-medium text-gray-700 mx-2 text-2xl">Accessorial</legend> 
                <div className="grid grid-cols-4 gap-2">
                  {data4?.map((accDD) => (
                    <div key={accDD.accessorialCuid}>
                      <div className="flex items-center pl-3">
                        <input id={accDD.accessorialCuid} type="checkbox" value={accDD.accessorialCuid} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 myaccdd" name="accessorialCuid" onClick={handleChange9} />
                        <label htmlFor="accessorialCuid" className="py-3 ml-2 w-full font-normal text-xs text-gray-900">{accDD.accessorialName}</label>
                      </div>
                      </div>
                  ))}
                </div>
              </fieldset>

              <fieldset className="py-2 text-left col-span-12 sm:col-span-12 border rounded-lg p-5">
                <legend className="font-medium text-gray-700 mx-2 text-2xl">Route Detail 
                  <button className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500  mx-2 px-2 text-xs font-normal text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-1"
                  type="button" onClick={() => addFormLocationFields()}>Add Routes</button>
                </legend> 

                <div className="grid lg:grid-cols-8 sm:grid-cols-8 gap-2 sm:md:auto-cols-min">
                  <label
                    htmlFor="shipmentTimeZone"
                    className="block text-sm font-medium text-gray-700"
                    >Time Zone
                    </label>
                    <select name="shipmentTimeZone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required="required" 
                    onChange={(e) => setShipmentTimeZone(e.target.value)}
                    ><option value="">Please Select</option>
                      <option value="PDT">PDT</option>
                      <option value="MDT">MDT</option>
                      <option value="CDT">CDT</option>
                      <option value="EDT">EDT</option>
                    </select>
                  
                </div>

                {formLocationValues.map((element, index) => (
            
                <div className="grid lg:grid-cols-8 gap-2 sm:md:auto-cols-min" key={index}>

                  <div className="lg:col-span-2 sm:col-span-6">
                    <label
                    htmlFor="locationType"
                    className="block text-sm font-medium text-gray-700"
                    >Type
                    </label>
                    <select name="locationType" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    required="required"  onChange={(e) => {
                      handleChange10(index, e);
                      }}>
                      <option value="P">Pickup</option>
                      <option value="D">Delivery</option>
                    </select>
                  </div>

                  <div className="lg:col-span-6 sm:col-span-6">
                    <label
                    htmlFor="locationName"
                    className="block text-sm font-medium text-gray-700"
                    >Location Name
                    </label>
                    <input type="text" name="locationName" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.locationName || ""} onChange={e => handleChange10(index, e)}
                      required="required"  maxLength={128}/>
                  </div>

                  <div className="lg:col-span-2 sm:col-span-6">
                    <label
                    htmlFor="dateStart"
                    className="block text-sm font-medium text-gray-700"
                    >Start
                    </label>
                    <input type="date" name="dateStart" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.dateStart || ""} onChange={e => handleChange11(index, e)}
                      required="required" />
                  </div>
                  <div className="lg:col-span-2 sm:col-span-6">
                    <label
                    htmlFor="timeStart"
                    className="block text-sm font-medium text-gray-700"
                    >Start Time
                    </label>
                    <input type="time" name="timeStart" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.timeStart || ""} onChange={e => handleChange10(index, e)}
                      required="required" />
                  </div>
                  <div className="lg:col-span-2 sm:col-span-6">
                    <label
                    htmlFor="dateEnd"
                    className="block text-sm font-medium text-gray-700"
                    >End
                    </label>
                    <input type="date" name="dateEnd" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.dateEnd || ""} onChange={e => handleChange11(index, e)}
                      required="required" />
                  </div>
                  <div className="lg:col-span-2 sm:col-span-6">
                    <label
                    htmlFor="timeEnd"
                    className="block text-sm font-medium text-gray-700"
                    >End
                    </label>
                    <input type="time" name="timeEnd" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.timeEnd || ""} onChange={e => handleChange10(index, e)}
                      required="required" />
                  </div>

                  <div className="lg:col-span-8 sm:col-span-8">
                    <label
                    htmlFor="locationFullAddress"
                    className="block text-sm font-medium text-gray-700"
                    >Address
                    </label>
                    <input type="text" name="locationFullAddress" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.locationFullAddress || ""} onChange={e => handleChange10(index, e)}
                      required="required" />
                  </div>

                  <div className="lg:col-span-2 sm:col-span-2">
                    <label
                    htmlFor="locationReference"
                    className="block text-sm font-medium text-gray-700">
                      Reference Info
                    </label>
                    <input type="text" name="locationReference" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.locationReference || ""} onChange={e => handleChange10(index, e)}
                      />
                  </div>

                  <div className="lg:col-span-4 sm:col-span-12">
                    <label
                    htmlFor="locationContact"
                    className="block text-sm font-medium text-gray-700">
                      Contact
                    </label>
                    <input type="text" name="locationContact" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.locationContact || ""} onChange={e => handleChange10(index, e)}
                      required="required" />
                  </div>
                  <div className="lg:col-span-2 sm:col-span-12">
                    <label
                    htmlFor="locationPhone"
                    className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input type="text" name="locationPhone" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.locationPhone || ""} onChange={e => handleChange10(index, e)}
                      required="required" />
                  </div>




                  



                  
                  {
                        index ? 
                          <div className="col-span-1 sm:col-span-1"><button type="button"  
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 mt-7 py-1 px-2 text-sm font-small text-xs text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 button remove"
                          onClick={() => removeFormLocationFields(index)}>Remove</button></div>
                        : null
                      }
              </div>
              
            ))}
              </fieldset>

              <div className="col-span-12">
                <label
                htmlFor="shipmentNote"
                className="block text-sm font-medium text-gray-700"
                >Shipment Notes
                </label>
                <textarea id="shipmentNote" name="shipmentNote" rows="4" cols="50" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => setShipmentNote(e.target.value)} value={shipmentNote}>
                </textarea>
              </div>

              <div className="py-2 text-left col-span-12 sm:col-span-12">
                <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >Book Shipment
                </button>

                <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-2"
                onClick={handleQuoteButtonClick}>Save Quote
                </button>

                
                <span className="text-red-500 mx-5 text-sm font-medium">{ submitmessage }</span>
                
              </div>
            </div>
          </div>
        </div>
      </form>


    </div>
  </div>
  <h2 id="accordion-collapse-heading-2">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
      <span>Step 2: Review Shipment</span>
      <svg data-accordion-icon="" className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
    <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">This is where you will review your entry</p>


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



    </div>
  </div>
  <h2 id="accordion-collapse-heading-3">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
      <span>Step 3: Review Your Route</span>
      <svg data-accordion-icon="" className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
    <div className="p-5 font-light border border-t-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">This is where your view a map or your routes</p>
      <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
        <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
        <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
      </ul>
    </div>
  </div>
</div>



<Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js" strategy="lazyOnload" />




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

<Script src="https://unpkg.com/flowbite@1.5.3/dist/datepicker.js" strategy="lazyOnload" />

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


<div className="col-span-4 sm:col-span-2">
                  <label
                  htmlFor="equipmentTypeCuid"
                  className="block text-sm font-medium text-gray-700"
                  >Equipment Type
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


<ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4">
        
        {data4?.map((accessorialDD) => (
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600" key={accessorialDD.accessorialId}>
            <div className="flex items-center pl-3">
              <input id={accessorialDD.accessorialCuid} type="checkbox" value={accessorialDD.accessorialCuid} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 myaccdd" name="accessorialCuid" onChange={handleChange9} />
              <label htmlFor="accessorialCuid" className="py-3 ml-2 w-full font-medium text-gray-900">{accessorialDD.accessorialName}</label>
            </div>
          </li>
        ))}
        </ul>


*/