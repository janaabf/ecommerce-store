import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { React, useState } from 'react';
import Layout from '../../components/Layout.js';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { getProductDataId } from '../../util/database';

const mainStyles = css`
  margin: 0 5vw;
  h1 {
    margin: 1px;
  }
  h2 {
    margin-top: 1px;
  }
  a {
    color: #3e9aa5;
    font-weight: bold;
    :hover {
      color: #1a494e;
    }
  }
`;

const contentContainer = css`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`;

const contentStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    background-color: #f3f2ef;
    border: 1px solid black;
  }
`;

const productInfoStyles = css`
  background-color: white;
  padding: 30px 20px;
  border-radius: 3px;
`;

const notFoundLink = css`
  color: #3e9aa5;
  font-weight: bold;
  :hover {
    color: #1a494e;
  }
`;

export default function Product(props) {
  const [cartCount, setCartCount] = useState(1); // access count of product if there

  if (!props.product) {
    return (
      <>
        <Head>
          <title>product not found</title>
          <meta name="description" content="Product not found." />
        </Head>
        <main css={mainStyles}>
          <h1>Cloud not found...</h1>
          <p>Unfortunately, we do not have the cloud you are looking for :(</p>
          <p>
            Try looking
            <Link href="/">
              <a css={notFoundLink}> here! </a>
            </Link>
          </p>
        </main>
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>Product {props.product.name}</title>
        <meta
          name={`Cloud ${props.product.name}.`}
          content={`Product page of Cloud ${props.product.name}.`}
        />
      </Head>

      <Layout globalCart={props.globalCart}>
        <main css={mainStyles}>
          <div css={contentContainer}>
            <Image src={`/${props.product.id}.jpg`} width="600" height="600" />
            <div css={contentStyles}>
              <div>
                <div css={productInfoStyles}>
                  <h1>{props.product.name}</h1>
                  <h2>{props.product.subtitle}</h2>
                  <div>{props.product.description}</div>
                  <br />
                  <div>{props.product.price} €</div>

                  <br />
                  <br />

                  <label>
                    <input
                      type="number"
                      step={1}
                      value={cartCount}
                      onChange={(e) =>
                        e.currentTarget.value > 0
                          ? setCartCount(e.currentTarget.value)
                          : setCartCount(1)
                      }
                    />

                    <button
                      onClick={() => {
                        // alert('added to cart!');
                        const currentProductsInCart = Cookies.get('cart')
                          ? getParsedCookie('cart')
                          : [];

                        if (
                          !currentProductsInCart.find(
                            (cookie) => cookie.id === props.product.id,
                          )
                        ) {
                          // add product if product not yet in cart
                          const newProductsInCart = [
                            ...currentProductsInCart,
                            {
                              id: props.product.id,
                              // name: props.product.name,
                              quantity: parseInt(cartCount),
                              // price: parseInt(props.product.price),
                            },
                          ];
                          setStringifiedCookie('cart', newProductsInCart);
                          props.setGlobalCart(newProductsInCart);
                        } else {
                          // add quantity if product already in cart
                          const updatedProduct = currentProductsInCart.find(
                            (cookie) => cookie.id === props.product.id,
                          );
                          updatedProduct.quantity += parseInt(cartCount);
                          setStringifiedCookie('cart', currentProductsInCart);
                          props.setGlobalCart(currentProductsInCart);
                        }
                      }}
                    >
                      Add to Cart
                    </button>
                  </label>
                  <br />
                </div>
                <br />
              </div>
              <Link href="/">
                <a>{'<'} back to all products</a>
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get right product from database using the url
  const product = await getProductDataId(context.query.productId);

  return {
    props: {
      product: product || null, // in case the url has an id that doesn't exist in the database --> shows "product not found page"
    },
  };
}
