import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';

// color palette:
// red: #f58476
// blue: #8cb9be
// white bg: #f3f2ef

function MyApp({ Component, pageProps }) {
  const [globalCart, setGlobalCart] = useState([]);

  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setGlobalCart(currentCart);
    console.log('set initial value');
  }, []);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            background-color: #f3f2ef;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }

          button {
            border: none;
            border-radius: 3px;
            padding: 5px;
            margin: 5px;
            background-color: #8cb9be;
            :hover {
              opacity: 0.5;
            }
          }
          input {
            border: none;
            border-radius: 2px;
            padding: 5px;
            width: 70px;
          }
        `}
      />
      <Component
        globalCart={globalCart}
        setGlobalCart={setGlobalCart}
        {...pageProps}
      />
    </>
  );
}

export default MyApp;
