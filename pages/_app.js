import { css, Global } from '@emotion/react';
import Layout from '../components/Layout';

// color palette:
// red: #f58476
// blue: #8cb9be
// white bg: #f3f2ef

function MyApp({ Component, pageProps }) {
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
        `}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div>cookies</div>
    </>
  );
}

export default MyApp;
