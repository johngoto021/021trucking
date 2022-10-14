import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import Layout from "../../components/layout";

export default function EquipmentForm() {

  const [equipmentTypeId, setEquipmentTypeId] = useState("");
  const [equipmentTypeCuid, setEquipmentTypeCuid] = useState("");
  const [equipmentTypeName, setEquipmentTypeName] = useState("");
  const [equipmentTypeActive, setEquipmentTypeActive] = useState("");
  const [APIResponse, setAPIResponse] = useState(null);

  /*
  useEffect(() =>  [{},
    equipmentTypeId,
    equipmentTypeCuid,
    equipmentTypeName,
    equipmentTypeActive,
    APIResponse,
  ]);
  */
 
  const seeShipments = async () => {
    try {
      const response = await fetch("/api/dropdowns/getequipmenttype", {
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
      equipmentTypeId,
      equipmentTypeCuid,
      equipmentTypeName,
      equipmentTypeActive,
      };
    try {
      const response = await fetch("/api/dropdowns/createequipmenttype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        seeShipments();
        console.log("form submitted successfully !!!");
        console.log(response);
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };
  
  
  const resetForm = () => {
    setEquipmentTypeName("");
    //setEquipmentTypeCuid("");
    //setEquipmentTypeActive("");
    //setEquipmentTypeId("");
  };
   

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Add Equipment
          </h1>
          <p>
            Use this form to equipment for shipment option.
          </p>
        </div>
      </header>


    
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="equipmentTypeName">
        Equipment Type
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="equipmentTypeName" name="equipmentTypeName" type="text" placeholder="Name of Equipment Type" />
      <p className="text-red-500 text-xs italic">Please enter required field.  Field can only store up to 128 characters long including space.</p>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="equipmentTypeActive">
        Status
      </label>
    <select name="equipmentTypeActive"
    className="shadow appearance-none w-full rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-500" id="grid-state">
      <option value="1">Active</option>
      <option value="0">Archive</option>
    </select>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>
      <Link href="equipmenttypes">
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
        view list
      </a>
      </Link>
    </div>
  </form>
  


    </>
  );
}

EquipmentForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
