import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { plantsDatabase } from '../util/plantdata';

const mainStyles = css`
  margin: 15px 20px;
`;

const plantCard = css`
  border: 1px solid gray;
  border-radius: 3px;
  margin: 10px 10px;
  padding: 15px 20px;
  :hover {
    background-color: #eee;
  }
`;

const products = css`
  display: flex;
`;

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Store - Home</title>
        <meta
          name="My first E-Commerce store"
          content="Homepage of my first E-Commerce store"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainStyles}>
        <h1>welcome!</h1>
        <div>Check out our favorite plants:</div>
        <div css={products}>
          {props.plants.map((plant) => {
            return (
              <div key={`plant-${plant.name}`} css={plantCard}>
                <Link href={`/${plant.name}`}>
                  <div>
                    <h3>{plant.name}</h3>
                    <div>{plant.image}</div>
                    <div>{plant.price} €</div>
                    <Link href="/cart">
                      <button>Add to Cart</button>
                    </Link>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export function getServerSideProps() {
  return {
    props: {
      plants: plantsDatabase,
    },
  };
}
