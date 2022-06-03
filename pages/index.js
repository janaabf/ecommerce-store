import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header.js';
import { productData } from '../util/database';

const mainStyles = css`
  /* margin: 15px 20px; */
`;

const productCard = css`
  border: 1px solid gray;
  border-radius: 3px;
  margin: 10px 10px;
  padding: 15px 20px;
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
  background-size: 100% auto;
  max-height: 80vh;
  min-width: 100vw;
  overflow: hidden;
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
  flex-wrap: wrap;
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
        <div css={heroStyles}>
          <Header />
          <div css={heroContent}>
            <h1>welcome to heaven</h1>
            <p>...well, almost. We do sell clouds though.</p>
          </div>
        </div>

        <div css={products}>
          {props.products.map((product) => {
            return (
              <div key={`product-${product.id}`} css={productCard}>
                <Link href={`/products/${product.id}`}>
                  <div>
                    <h1>{product.name}</h1>
                    <Image
                      src={`/${product.id}.jpg`}
                      width="100"
                      height="100"
                    />
                    <div>{product.price} €</div>
                    <Link href={`/products/${product.id}`}>
                      <button>view</button>
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
      products: productData,
    },
  };
}
