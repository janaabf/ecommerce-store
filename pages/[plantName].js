import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image';
import { plantsDatabase } from '../util/plantdata';

export default function Plant(props) {
  if (!props.plant) {
    return (
      <div>
        <Head>
          <title>Plant not found</title>
          <meta
            name="description"
            content="Unfortunately, we don't have the plant that you're looking for :("
          />
        </Head>

        <h1>Plant not found :(</h1>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Plant</title>
        <meta name="description" content="the plant you were looking for." />
      </Head>
      <main>
        <h1>{props.plant.name}</h1>
        <div>{props.plant.image}</div>
        <div>{props.plant.price} €</div>
        <Link href="/cart">
          <button>Add to Cart</button>
        </Link>
        <Link href="/">
          <button>back to all plants</button>
        </Link>
      </main>
    </div>
  );
}

export function getServerSideProps(context) {
  const foundPlant = plantsDatabase.find((plant) => {
    return plant.name === context.query.plantName;
  });

  if (!foundPlant) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      plant: foundPlant || null,
    },
  };
}
