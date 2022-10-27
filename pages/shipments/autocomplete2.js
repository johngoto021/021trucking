//import Autocomplete from "react-google-autocomplete";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import {  RefObject, useRef, useState, useEffect } from "react";
import useSWR from "swr"
import Layout from "../../components/layout";
import Script from "next/script";
import Link from 'next/link'
import { BiTrashAlt, BiMinusCircle, BiRefresh, BiPlus, BiPlusCircle } from "react-icons/bi";


export default function ShipmentForm() {
  

  const inputRef = useRef(null);
  
  const [country, setCountry] = useState("us");
  
  const { ref: materialRef } = usePlacesWidget({
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



return (

<>








        

<input ref={materialRef} style={{ width: "90%" }} defaultValue="" />;




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
<textarea ref={materialRef} rows="3"></textarea>

<Autocomplete
          style={{ width: "250px" }}
          ref={inputRef}
          apiKey='AIzaSyAYNbaX9jl_sdScfJIdeE6eC9hMl55krLI'
          onPlaceSelected={(selected, a, c) => {
            console.log(selected);
          }}
          options={{
            types: ["address"],
            componentRestrictions: { country },
            fields: ["address_components", "geometry", "icon", "name"],
            types: ["address"],

          }}
          defaultValue=""
        />
        <select
          onChange={(v) => {
            setCountry(v.target.value);
          }}
          style={{ color: "black", display: "none" }}
        >
          <option key="1" value="us">
            Us
          </option>
          <option key="2" value="ru">
            Ru
          </option>
        </select>


<input ref={materialRef} style={{ width: "90%" }} defaultValue="" />;
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

*/