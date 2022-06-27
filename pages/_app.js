import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { getParsedCookie } from '../util/cookies';

// color palette:
// red: #f58476
// blue: #8cb9be
// white bg: #f3f2ef

function MyApp({ Component, pageProps }) {
  const [globalCart, setGlobalCart] = useState([]);

  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setGlobalCart(currentCart);
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
          }

          a {
            text-decoration: none;
            color: black;
            font-family: 'Quicksand', sans-serif;
          }

          * {
            box-sizing: border-box;
            font-family: 'Quicksand', sans-serif;
          }

          button {
            border: none;
            border-radius: 3px;
            padding: 5px 10px;
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
