import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";

export default function ReferenceTypeForm() {
  const [referenceTypeCuid, setReferenceTypeCuid] = useState('');
  const [referenceTypeId, setReferenceTypeId] = useState('');
  const [referenceTypeName, setReferenceTypeName] = useState('');
  const [referenceTypeActive, setReferenceTypeActive] = useState(1);
  const [APIResponse, setAPIResponse] = useState(null);
  const [createResponse, setCreateResponse] = useState('');


  const seeLists = async () => {
    try {
      const response = await fetch("/api/dropdowns/getreferencetype", {
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
      referenceTypeName,
      referenceTypeActive,
      };
      console.log(body);
    try {
      const response = await fetch("/api/dropdowns/createreferencetype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        seeLists();
        
        console.log(await response.json());
        //setCreateResponse(response);
        //setReferenceTypeId(createResponse.ReferenceTypeId)
        //console.log (createResponse);
        //console.log(createResponse);
        console.log("form submitted successfully !!!");
        //console.log(response);
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };
  

  //console.log({'test is what was created' : createResponse});
  //console.log(createResponse['ReferenceTypeCuid']);
  
  const resetForm = () => {
    setReferenceTypeName('');
    setReferenceTypeActive(1);
    setCreateResponse('');
  };
   

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Add ReferenceType
          </h1>
          <p>
            Use this form to ReferenceType for shipment option.
          </p>
        </div>
      </header>


    
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
    ReferenceType ID:  {referenceTypeId}

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ReferenceTypeName">
        ReferenceType Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ReferenceTypeName" name="ReferenceTypeName" type="text" placeholder="Name of ReferenceType"
      onChange={(e)=>setReferenceTypeName(e.target.value)}
      required="required" value={referenceTypeName}/>
      <p className="text-red-500 text-xs italic">Please enter required field.  Field can only store up to 128 characters long including space.</p>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ReferenceTypeActive">
        Status
      </label>
    <select name="referenceTypeActive"
    className="shadow appearance-none w-full rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-500" id="ReferenceTypeActive"
    onChange={(e)=>setReferenceTypeActive(e.target.value)}>
      <option value="1">Active</option>
      <option value="0">Archive</option>
    </select>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>
      <Link href="referencetypes">
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
        view list
      </a>
      </Link>
    </div>
  </form>
  


    </>
  );
}

ReferenceTypeForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};