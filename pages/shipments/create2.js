import { useRef, useState } from "react";
import useSWR from "swr"
import Layout from "../../components/layout";
//import Script from "next/script";
import Link from 'next/link'
import { BiTrashAlt, BiMinusCircle, BiRefresh, BiPlus, BiPlusCircle } from "react-icons/bi";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";



export default function ShipmentForm() {
 
  const fetcher1 = async () => {
    const response = await fetch('/api/accounts/getdataidname')
    const data = await response.json()
    return data
  };
  
  const fetcher2 = async () => {
    const response = await fetch('/api/dropdowns/getequipmenttype')
    const data = await response.json()
    return data
  };
  
  const fetcher3 = async () => {
    const response = await fetch('/api/dropdowns/getloadtype')
    const data = await response.json()
    return data
  };
  
  const fetcher4 = async () => {
    const response = await fetch('/api/dropdowns/getaccessorial')
    const data = await response.json()
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
  const [accessorialCuid, setaccessorialCuid] = useState([]);
  
  const [trackingNumber, settrackingNumber] = useState("");
  const [moNumber, setmoNumber] = useState("");
  const [houseBillNumber, sethouseBillNumber] = useState("");
  const [shipmentNote, setShipmentNote] = useState("");
  const [shipmentStatus, setShipmentStatus] = useState(1);
  const [shipmentTimeZone, setShipmentTimeZone] = useState("");
  
  const [APIResponse, setAPIResponse] = useState(null);
  
  const [submitmessage, setsubmitmessage] = useState("")
  
  const [ShipmentRef, setShipmentRef] = useState('');
  //const [selectedList, setSelectedList] = useState([]);

  const [shipmentTotalWeight, setShipmentTotalWeight] = useState(0);
  const [shipmentTotalDimension, setShipmentTotalDimension] = useState(0);
  const [shipmentCustomerTotalCost, setShipmentCustomerTotalCost] = useState(0);
  
   
  const [formValues, setFormValues] = useState([{ loadTypeCuid: '', quantity : 0, length : 0, width : 0, height : 0, totalWeight : 0, stackable : 0 }])

  const [formLocationValues, setFormLocationValues] = useState([{ locationType: "P", locationName : "", locationFullAddress : "", dateStart : "", dateEnd : "", dateStart2 : "", dateEnd2 : "", locationReference : "", locationContact : "", locationPhone : "", timeStart : "", timeEnd : "" }])

  const inputRef = useRef(null);
  
  const [country, setCountry] = useState("us");
  
  const { ref: shipadd } = usePlacesWidget({
    //apiKey: process.env.REACT_APP_GOOGLE,
    apiKey: 'AIzaSyAYNbaX9jl_sdScfJIdeE6eC9hMl55krLI',
    onPlaceSelected: (address) => console.log(address),
    inputAutocompleteValue: "",
    options: {
      types: ["address"],
      componentRestrictions: { country },
      fields: ["address_components", "geometry", "icon", "name"],
      types: ["address"],
    },
  });


  /* 
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
    accessorialCuid,
    shipmentStatus,
    shipmentTimeZone,
  ]);
  */

  const seeShipments = async () => {
    try {
      const response = await fetch("/api/shipments/getpagingdata", {
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
      shipmentTotalWeight,
      shipmentTotalDimension,
      shipmentCustomerTotalCost,
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

      const createdshipment = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await createdshipment.json();
      
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
        setShipmentRef(data.shipmentCuid);
        //setShipmentRef(createdshipment.shipmentCuid);
        //console.log(createdshipment.shipmentCuid);
        seeShipments();
        setsubmitmessage('Your entries were saved');
        console.log("form submitted successfully !!!");
        console.log(data);
        //return createdshipment.json();
        //set a success banner here
        return data;
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

let totalVal = 0;
let qtyValue = 0;
let LengthValue = 0;
let WidthValue = 0;
let HeightValue = 0;
let totalDimension =0;

let calcValue = () => {
  
  let weightval = document.querySelectorAll('[name^="totalWeight"]');
  let qtyval = document.querySelectorAll('[name^="quantity"]');
  let lengthval = document.querySelectorAll('[name^="length"]');
  let widthval = document.querySelectorAll('[name^="width"]');
  let heightval = document.querySelectorAll('[name^="height"]');

  for (var i = 0; i < weightval.length; i++) {
    //totalVal += parseInt(varval[i].value) *  parseInt(qtyval[i].value);

    totalVal += parseInt(weightval[i].value);
    setShipmentTotalWeight(totalVal);
    console.log("totalVal" + totalVal);
        
    //setShipmentTotalValue(totalVal*100)
    totalDimension += parseFloat(parseInt(qtyval[i].value*parseFloat(lengthval[i].value)*parseFloat(widthval[i].value)*parseFloat(heightval[i].value)));

    setShipmentCustomerTotalCost(totalVal*2+totalDimension*1)

    setShipmentTotalDimension(totalDimension);
    // qtyValue += parseInt(qtyval[i].value);
    //console.log("totalVal" + totalVal);
    //console.log("qtyValue" + qtyValue);
    //console.log("totalDimension" + totalDimension);
    //document.getElementById("shipmentweight").textContent = totalVal;
    //document.getElementById("shipmentdimension").textContent = totalDimension;
  }
  setShipmentTotalWeight(totalVal);
  console.log("totalVal" + totalVal);
  //setShipmentTotalValue(totalVal*100)
}


let handleChange7 = (i, e) => {
  let newFormValues = [...formValues];
  newFormValues[i][e.target.name] = parseFloat(e.target.value);  
  setFormValues(newFormValues);
  calcValue();
  console.log(newFormValues);
}

let addFormFields = () => {
    setFormValues([...formValues, { loadTypeCuid: '', quantity : 0, length : 0, width : 0, height : 0, totalWeight : 0, stackable : 0 }])
    calcValue()
 }

let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    
    setTimeout(function(){
      calcValue();
    },50)

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



  return (



<>


<header className="bg-white shadow">
  <div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shipment <span className="text-sm text-blue-600"><Link href="/shipments/create">[ add new ]</Link></span></h1>
  </div>
  </header>
  <main>
    <section className="bg-white">
    <div className="flex flex-wrap -mx-4">
    <div className="w-full px-4">
    <div className="max-w-full overflow-x-auto">


      <form action="#" method="POST" onSubmit={handleSubmit} className="w-full, max-w-full">
        <input type="hidden" name="shipmentTotalWeight" value={shipmentTotalWeight} />
        <input type="hidden" name="shipmentTotalDimension" value={shipmentTotalDimension} />
        <input type="hidden" name="shipmentTotalDimension" value={shipmentTotalDimension} />
        <fieldset className="py-2 text-left lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-6 border rounded-lg p-5 m-5">
          <legend className="font-medium text-gray-700 mx-2 text-2xl">Equipment Type</legend>
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
        </fieldset>

        <fieldset className="py-2 text-left border rounded-lg p-5 m-5">
          <legend className="font-medium text-gray-700 mx-2 text-2xl">Shipment Info</legend>
        <div className="grid lg:grid-cols-12 sm:grid-cols-8 gap-2 my-4">
          
          <div className="lg:col-span-3 md:col-span-2 sm:col-span-2 block text-lg font-medium text-gray-700 my-4">
            Shipment Number: <span className="font-medium text-lg text-red-500">{ShipmentRef}</span>
          </div>

          <div className="lg:col-span-3 md:col-span-2 sm:col-span-2 block text-lg font-medium text-gray-700 my-4">
            Shipment Cost (USD): <span className="font-medium text-lg text-red-500">{shipmentCustomerTotalCost}</span>
          </div>

          <div className="lg:col-span-3 md:col-span-2 sm:col-span-2 block text-lg font-medium text-gray-700 my-4">
            Total Weight (lbs): <span className="font-medium text-lg text-red-500">{shipmentTotalWeight}</span>
          </div>

          <div className="lg:col-span-3 md:col-span-2 sm:col-span-2 block text-lg font-medium text-gray-700 my-4">
            Total Dimension (cubic sqft): <span className="font-medium text-lg text-red-500">{shipmentTotalDimension}</span>
          </div>

          <div className="lg:col-span-6 md:col-span-4 sm:col-span-6">
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

          <div className="lg:col-span-6 md:col-span-4 sm:col-span-6">
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
        </div>
        </fieldset>

        <fieldset className="py-2 text-left col-span-12 sm:col-span-12 border rounded-lg p-5 m-5">
            <legend className="font-medium text-gray-700 mx-2 text-2xl">Load Detail
            
            <button className="inline-flex justify-center rounded-md border border-transparent bg-green-500  mx-2 px-2 text-xs font-normal text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-1"
              type="button" onClick={() => addFormFields()}>Add Loads</button>
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
                          <option value=""></option>
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm inpqty"
                        value={element.quantity || "0"} onChange={e => handleChange7(index, e)}
                        min="1" max="200" step="1" maxLength={9}
                        required="required" />
                    </td>
                    <td>
                      <input type="number" name="length" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.length || "0"} onChange={e => handleChange7(index, e)} 
                      min="1" max="200" step="1" maxLength={9}
                      required="required" />
                    </td>
                    <td>
                      <input type="number" name="width" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.width || "0"} onChange={e => handleChange7(index, e)}
                      min="1" max="200" step="1" maxLength={9}
                      required="required" />
                    </td>
                    <td>
                      <input type="number" name="height" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={element.height || "0"} onChange={e => handleChange7(index, e)}
                      min="1" max="200" step="1" maxLength={9}
                      required="required" />
                    </td>
                    <td>
                      <input type="number" name="totalWeight" 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm totweight"
                      value={element.totalWeight || "0"} onChange={e => handleChange7(index, e)}
                      min="1" max="9999" step="1" maxLength={11}
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
                        onClick={() => removeFormFields(index)}><BiTrashAlt /></button></td>
                      : null
                    }
                  </tr>
                  
                ))}
                </tbody>
              </table>
            </div>
        </fieldset>

        <fieldset className="py-2 text-left col-span-12 sm:col-span-12 border rounded-lg p-5 m-5">
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

        <fieldset className="py-2 text-left lg:col-span-12 md:col-span-8 sm:col-span-12 border rounded-lg p-5 m-5">
          <legend className="font-medium text-gray-700 mx-2 text-2xl">Route Detail 
            <button className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500  mx-2 px-2 text-xs font-normal text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-1"
            type="button" onClick={() => addFormLocationFields()}>Add Routes</button>
          </legend> 
          <div className="grid lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-6 gap-2">
          <div className="lg:col-span-2 md:col-span-3 sm:col-span-6 gap-2 sm:md:auto-cols-min my-8">
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
          </div>

          {formLocationValues.map((element, index) => (
      
          <div className="grid lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-6 gap-2" key={index}>

            <div className="lg:col-span-2 md:col-span-2  sm:col-span-6">
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

            <div className="lg:col-span-10 md:col-span-6 sm:col-span-6">
              <label
              htmlFor="locationName"
              className="block text-sm font-medium text-gray-700"
              >Location Name
              </label>
              <input type="text" name="locationName" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={element.locationName || ""} onChange={e => handleChange10(index, e)}
                required="required"  maxLength={255} autoComplete="false" />
            </div>

            <div className="lg:col-span-3 md:col-span-2 sm:col-span-3">
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

            <div className="lg:col-span-3 md:col-span-2 sm:col-span-3">
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

            <div className="lg:col-span-3 md:col-span-2 sm:col-span-3">
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

            <div className="lg:col-span-3 md:col-span-2 sm:col-span-3">
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

            <div className="lg:col-span-10 sm:col-span-6">
              <label
              htmlFor="locationFullAddress"
              className="block text-sm font-medium text-gray-700"
              >Address
              </label>
              <input type="text" name="locationFullAddress" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={element.locationFullAddress || ""} onChange={e => handleChange10(index, e)}
                required="required" 
                ref={shipadd} />
            </div>

            <div className="lg:col-span-2 sm:col-span-6">
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

            <div className="lg:col-span-3 sm:col-span-3">
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

            <div className="lg:col-span-3 sm:col-span-3">
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
                onClick={() => removeFormLocationFields(index)}><BiTrashAlt /></button></div>
              : null
            }

            <div className="lg:col-span-12 sm:col-span-12">
              <hr className="border-1 border-gray-700 cursor-pointer hover:border-red-500 duration-500 my-4"/>
            </div>

          </div>
        
          ))}
        </fieldset>

        <div className="col-span-12 p-5">
          <label
          htmlFor="shipmentNote"
          className="block text-sm font-medium text-gray-700"
          >Shipment Notes
          </label>
          <textarea id="shipmentNote" name="shipmentNote" rows="4" cols="50" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => setShipmentNote(e.target.value)} value={shipmentNote}>
          </textarea>
        </div>

        <div className="py-2 text-left col-span-12 sm:col-span-12 m-5">
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
        
      </form>

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
    </div>
    </section>
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

<Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js" strategy="afterInteractive" />

if (error1 || error2 || error3 || error4) return <h2>An error has occurred.</h2>

if (!data1 || !data2 || !data3 || !data4) {
  return 
<h2>Loading...</h2>

 }



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