import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import Layout from '../components/Layout.js';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getProductData } from '../util/database';

const mainStyles = css`
  /* margin: 15px 20px; */
`;

const productCard = css`
  border: 1px solid gray;
  border-radius: 3px;
  margin: 10px 10px;
  padding: 15px 30px;
  opacity: 0.8;
  background-color: rgb(255, 255, 255, 0.5);
  :hover {
    background-color: rgb(255, 255, 255);
  }
`;

const heroStyles = css`
  background-image: url('/hero.jpg');
  background-position: absolute;
  background-repeat: no-repeat;
  min-height: 80%;
  background-size: 100% auto;
  /* min-width: 100%; */
  /* overflow: hidden; */
`;

const heroContent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const products = css`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 70em;
  margin: 0 auto;
`;

export default function Home(props) {
  // const [totalQuantity, setTotalQuantity] = useState(0);

  // useEffect(() => {
  //   const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  //   const total = currentCart
  //     .map((cookie) => cookie.quantity)
  //     .reduce((accumulator, value) => {
  //       return parseInt(accumulator) + parseInt(value);
  //     }, 0);
  //   setTotalQuantity(total);
  //   console.log(total);
  // }, []);

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

      <div css={heroStyles}>
        <Layout globalCart={props.globalCart}>
          <main css={mainStyles}>
            <div css={heroContent}>
              <h1>welcome to heaven</h1>
              <p>...well, almost. We do sell clouds though.</p>
            </div>

            <div css={products}>
              {props.products.map((product) => {
                return (
                  <div key={`product-${product.id}`} css={productCard}>
                    <Link href={`/products/${product.id}`} passHref>
                      <a>
                        <h1>{product.name}</h1>
                        <Image
                          src={`/${product.id}.jpg`}
                          width="100"
                          height="100"
                        />
                        <div>{product.price} €</div>
                        <Link href={`/products/${product.id}`} passHref>
                          <button>view</button>
                        </Link>
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </main>
        </Layout>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const productData = await getProductData();

  return {
    props: {
      products: productData,
    },
  };
}
