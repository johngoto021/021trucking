import Autocomplete from "react-google-autocomplete";
import { useState, useEffect } from "react";
import useSWR from "swr"
import Layout from "../../components/layout";
import Script from "next/script";
import Link from 'next/link'
import { BiTrashAlt, BiMinusCircle, BiRefresh, BiPlus, BiPlusCircle } from "react-icons/bi";


export default function ShipmentForm() {
  
return (


<div>
<Autocomplete
  //apiKey={YOUR_GOOGLE_MAPS_API_KEY}
  apiKey='AIzaSyAYNbaX9jl_sdScfJIdeE6eC9hMl55krLI'
  style={{ width: "50%" }}
  onPlaceSelected={(place) => {
    console.log(place);
  }}
  options={{
    //types: ["(regions)"],
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"],
  }}
  defaultValue=""
/>
</div>

)}
    
ShipmentForm.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}