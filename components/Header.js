import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies.js';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  color: #333333;
  background-color: #eee;
`;

export default function Header() {
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    let totalQuantity = 0;
    for (let i = 0; i < currentCart.length; i++) {
      totalQuantity += currentCart[i].quantity;
    }
    setCartCounter(totalQuantity);
    console.log(currentCart.length);
  }, []);

  return (
    <header css={headerStyles}>
      <Link href="/">🪴</Link>
      <div>
        <Link href="/cart">
          <div>{cartCounter} Cart</div>
        </Link>
      </div>
    </header>
  );
}
