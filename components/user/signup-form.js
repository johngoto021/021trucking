import { Fragment, useRef } from "react";
import styles from '../../styles/Home.module.css';
//import { useLayoutEffect, useState } from "react";
//import { useEffect, useState } from "react";

function SignupForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function handleFormSubmission(event) {
    event.preventDefault();
    //window.alert('you clicked on submit');
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const reqBody = { email, password };
    
    //fetch('http://localhost:3000/api/auth/signup', {
    fetch('../api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
      
  }

  return (
<Fragment>

<div className="w-full max-w-xs">
  <form className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmission}>
    <div className="mb-4">
      <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="email">
      Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" ref={emailInputRef} />
    </div>
    <div className="mb-6">
      <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" ref={passwordInputRef} />
    </div>
    <div className="flex items-center justify-between">
      <input type="submit" value="Sign Up" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
</div>

</Fragment>
  );
}
export default SignupForm;


/*
<h1>Create New Account</h1>

<input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" ref={passwordInputRef} />
<p class="text-red-500 text-xs italic">Please choose a password.</p>
<p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign Up
      </button>



<div className="w-full max-w-xs">
  <form className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmission}>
    <div className="mb-4">
      <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="email">
      Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" ref={emailInputRef} />
    </div>
    <div className="mb-6">
      <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" ref={passwordInputRef} />
    </div>
    <div className="flex items-center justify-between">
      <input type="submit" value="Sign Up" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
</div>


<form onSubmit={handleFormSubmission}>
        <div className="row">
          <div className="col-label">
            <label htmlFor="email">Email </label>
          </div>
          <div className="col-input">
            <input type="email" id="email" ref={emailInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="password">Password </label>
          </div>
          <div className="col-input">
            <input type="password" id="password" ref={passwordInputRef} />
          </div>
        </div>
        <input type="submit" value="Sign Up" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      </form>



<form onSubmit={handleFormSubmission}>
        <div className="row">
          <div className="col-label">
            <label htmlFor="email">Email </label>
          </div>
          <div className="col-input">
            <input type="email" id="email" ref={emailInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="password">Password </label>
          </div>
          <div className="col-input">
            <input type="password" id="password" ref={passwordInputRef} />
          </div>
        </div>
        <input type="submit" value="Sign Up" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      </form>


*/