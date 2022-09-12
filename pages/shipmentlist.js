
import Layout from '../components/layout'

 
export default function Home() {

  
  //const [session] = useSession();


  //const mycuid = cuid();
  //console.log( cuid() );
  //console.log(mycuid);

/*
var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://dev-b8c2qsq6.us.auth0.com/api/v2/users',
  params: {q: 'name:"John Wong"', search_engine: 'v3'},
  headers: {authorization: '2363bef524807193387b8b53266ba90c2831f5024999bc2a92685a217cb7cecd'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
*/


//  const {user, error, isloading} = useUser();

 
//  console.log(user);

  /*
  const MainContent = 'is logged in'
  const SomeOtherComponent  = 'test'
  */
  /*
  if(isloading) {
    return (
      <div className="alert alert-warning" role="alert">...Loading</div>
    )
  }


  if(user) {
    return (
      <>
      <h1>Welcome Back!</h1>
      
      <p>You're login as {user.name} with the following email {user.email}</p>

      <Link href="/api/auth/logout">
          <a className='btn btn-primary' role="button">logout</a>
        </Link>
      </>
    )
  }
  */

  return (

<>

<header className="bg-white shadow">
    <div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-4">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
    </div>
  </header>
  <main>
    <div className="mx-auto max-w-8xl py-2 sm:px-6 lg:px-4">
      
      <div className="px-4 py-6 sm:px-0">
        <div className="h-96 rounded-lg border-4 border-dashed border-gray-200">


      
   








        </div>
      </div>
    </div>
  </main>


</>


)}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

/*



     const Index = ({ userList }) => <div style={{ margin: 20 }}>
    <table border="1">
    <thead>
      <tr>
      <th>ID</th>
      <th>shipment</th>
      <th>Tracking</th>
      <th>moNumber</th>
      <th>houseBillNumber</th>
      </tr>
    </thead>
    <tbody>
      {userList.data.map((x, i) => <tr key={i}>
        <td>{x.shipmentName}</td>
        <td>{x. trackingNumber}</td>
        <td>{x.moNumber}</td>
        <td>{x.houseBillNumber}</td></td>
      </tr>)}
    </tbody>
  </table>
</div>


  {session ? (
          <button onClick={signOut}>Log out.</button>
        ) : (
          <button onClick={signIn}>Log in.</button>
        )}

<script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
<link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" />


if(user) (
   
      return {
      <h1>Welcome Back!</h1>
      
      <p>You're login as {user.name} with the following email {user.email}</p>

      <Link href="/api/auth/logout">
          <a className='btn btn-primary' role="button">logout</a>
        </Link>
      }
    )


*/