import { useState } from "react";
import Link from 'next/link'
import Layout from "../../components/layout";
import prisma from '../../lib/prisma'

export const getServerSideProps = async ({params}) => {
  const { equipmenttypecuid } = params;
  const equipmentTypeData = await prisma.equipmentType.findUnique({

    select: {
      equipmentTypeId: true,
      equipmentTypeCuid: true,
      equipmentTypeName: true,
      equipmentTypeActive: true,
    },
    where: {
      equipmentTypeCuid: equipmenttypecuid
    }
  });
  console.log(equipmentTypeData);
  return {
    props: {
      equipmentTypeinfo: equipmentTypeData
    }
  }
}

export default function EquipmentForm({ equipmentTypeinfo }) {
  const [equipmentTypeId, setEquipmentTypeId] = useState(equipmentTypeinfo.equipmentTypeId);
  const [equipmentTypeCuid, setEquipmentTypeCuid] = useState(equipmentTypeinfo.equipmentTypeCuid);
  const [equipmentTypeName, setEquipmentTypeName] = useState(equipmentTypeinfo.equipmentTypeName);
  const [equipmentTypeActive, setEquipmentTypeActive] = useState(equipmentTypeinfo.equipmentTypeActive);
  const [submitmessage, setsubmitmessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      equipmentTypeCuid,
      equipmentTypeName,
      equipmentTypeActive
      };
      console.log(body);
    try {
      const response = await fetch("/api/equipmenttypes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        setsubmitmessage('System failed to update your request.  Please try again.');
        console.log("something went wrong with updating record");
        //set an error banner here
      } else {
        const data = await response.json();
        setsubmitmessage('The Equipment Type was updated successfully!');
        console.log("form submitted successfully !!!");
        //resetForm();
        //seeLists();
        //console.log(await response.json());
        return data;
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      setsubmitmessage('System encountered an error. Please try again');
      console.log("there was an error submitting", error);
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Update Equipment
          </h1>
          <p>
            Use this form to update Equipment Type for shipment option.
          </p>
        </div>
      </header>


    
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

    <input type="hidden" name="equipmentTypeCuid" value={equipmentTypeCuid} />
    <input type="hidden" name="equipmentTypeId" value={equipmentTypeId} />
    Equipment Type ID:  {equipmentTypeId}

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="equipmentTypeName">
        Equipment Type
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="equipmentTypeName" name="equipmentTypeName" type="text" placeholder="Name of Equipment Type" 
      onChange={(e)=>setEquipmentTypeName(e.target.value)}
      required="required" value={equipmentTypeName} />
      <p className="text-red-500 text-xs italic">Please enter required field.  Field can only store up to 128 characters long including space.</p>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="equipmentTypeActive">
        Status
      </label>
    <select name="equipmentTypeActive"
    className="shadow appearance-none w-full rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-500" id="grid-state"
    onChange={(e)=>setEquipmentTypeActive(e.target.value)}
    defaultValue={equipmentTypeActive} >
      <option value="1">Active</option>
      <option value="0">Archive</option>
    </select>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>
      <span className="text-red-500 mx-5 text-sm font-medium">{ submitmessage }</span>
      <Link href="/equipmenttypes">
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
