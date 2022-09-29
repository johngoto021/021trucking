import Layout from '../components/layout'
import Script from 'next/script'


export default function ShipmentForm() {

  return (

<>
<Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js" strategy="lazyOnload" />

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
      " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
        aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
      data-bs-parent="#accordionExample">
      <div className="accordion-body py-4 px-5">
        <strong>This is the first item&apos;s accordion body.</strong> It is shown by default,
        until the collapse plugin adds the appropriate classes that we use to style each
        element. These classes control the overall appearance, as well as the showing and
        hiding via CSS transitions. You can modify any of this with custom CSS or overriding
        our default variables. It&apos;s also worth noting that just about any HTML can go within
        the <code>.accordion-body</code>, though the transition does limit overflow.
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
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
      data-bs-parent="#accordionExample">
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
        Accordion Item #3
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