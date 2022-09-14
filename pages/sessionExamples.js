import Head from 'next/head';
import Product from '../components/Product';
import prisma from '../lib/prisma';

export default function Home({ products }) {
/*
const obj = {name: 'John', favnumber: 23, color: 'blue'};
sessionStorage.setItem('occupation', 'Software Engineer');
sessionStorage.setItem('person', JSON.stringify(obj));
sessionStorage.setItem('occupation', 'General Manager');

sessionStorage.remove('person');
sessionStorage.clear();

for (let i=0; 1<sessionStorage.length; i++){
  const key = sessionStorage.key(i);
  console.log('${key}=>${sessionStorage.getItem(key)}');
}
*/
  return (
    <div>
      <Head>
        <title>PlanetScale Next.js Quickstart</title>
        <meta name="description" content="PlanetScale Quickstart for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">
        <h1 className="text-6xl font-bold mb-4 text-center">Next.js Starter</h1>
        <p className="mb-20 text-xl text-center">
          🔥 Shop from the hottest items in the world 🔥
        </p>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center  gap-4">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  //convert decimal value to string to pass through as json
  const products = data.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));
  return {
    props: { products },
  };
}
