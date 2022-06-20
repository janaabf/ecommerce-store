import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { React } from 'react';
import Layout from '../components/Layout.js';
import { getProductData } from '../util/database';

const mainStyles = css`
  background-image: url('/hero.jpg');
  background-repeat: no-repeat;
  background-size: 100vw;
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

const linkDesign = css`
  color: #3e9aa5;
  font-weight: bold;
  :hover {
    color: #1a494e;
  }
`;

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Store - Home</title>
        <meta
          name="My first E-Commerce store"
          content="Homepage of my first E-Commerce store"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={mainStyles}>
        <Layout globalCart={props.globalCart}>
          <div>
            {/* <Header globalCart={props.globalCart} /> */}
            <div css={heroContent}>
              <h1>welcome to heaven</h1>
              <p>...well, almost. We do sell clouds though.</p>
            </div>

            <div css={products}>
              {props.products.map((product) => {
                return (
                  <div key={`product-${product.id}`} css={productCard}>
                    <h1>{product.name}</h1>
                    <Image
                      src={`/${product.id}.jpg`}
                      width="100"
                      height="100"
                    />
                    <div>{product.price} €</div>
                    <br />
                    <Link href={`/products/${product.id}`} passHref>
                      <a css={linkDesign}>view {'>'}</a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </Layout>
        {/* <Footer /> */}
      </main>
    </>
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
