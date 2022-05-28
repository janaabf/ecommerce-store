import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { React, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
// import Image from 'next/image';
import { plantsDatabase } from '../../util/plantdata';

export default function Plant(props) {
  const [cartCount, setCartCount] = useState(0); // access count of plant if there
  // const [plantsInCart, setPlantsInCart] = useState('');

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
        <input
          type="number"
          step={1}
          value={cartCount}
          onChange={(e) =>
            e.currentTarget.value > -1
              ? setCartCount(e.currentTarget.value)
              : setCartCount(0)
          }
        />
        <button
          onClick={() => {
            const currentPlantsInCart = Cookies.get('cart')
              ? getParsedCookie('cart')
              : [];

            if (
              !currentPlantsInCart.find(
                (cookie) => cookie.name === props.plant.name,
              )
            ) {
              const newPlantsInCart = [
                ...currentPlantsInCart,
                { name: props.plant.name, quantity: parseInt(cartCount) },
              ];
              setStringifiedCookie('cart', newPlantsInCart);
              console.log(newPlantsInCart);
            } else {
              const updatedPlant = currentPlantsInCart.find(
                (cookie) => cookie.name === props.plant.name,
              );
              updatedPlant.quantity += parseInt(cartCount); // shouldn't be parsed again???
              setStringifiedCookie('cart', currentPlantsInCart);
              console.log(currentPlantsInCart);
              console.log('plant found');
              console.log(typeof updatedPlant.quantity);
            }
          }}
        >
          Add to Cart
        </button>
        <br />
        <Link href="/">
          <button>back to all plants</button>
        </Link>
      </main>
    </div>
  );
}

export function getServerSideProps(context) {
  const foundPlant = plantsDatabase.find((plant) => {
    return plant.id === context.query.plantId;
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
