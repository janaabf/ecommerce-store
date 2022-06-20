import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { React } from 'react';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  color: #333333;

  a {
    :hover {
      color: #1a494e;
    }
  }
`;

const cartStyles = css`
  /* margin-top: 10px; */
`;

const cartCountStyle = css`
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 2px 6px;
  background-color: #333333;
  opacity: 80%;
  margin-left: 5px;
`;

export default function Header(props) {
  const totalQuantity = props.globalCart
    .map((arr) => arr.quantity)
    .reduce((a, b) => {
      return parseInt(a) + parseInt(b);
    }, 0);

  return (
    <header css={headerStyles}>
      <Link href="/">☁️</Link>
      <Link href="/">Clouders</Link>
      <span>
        <Link href="/cart">
          <div>
            <Image
              css={cartStyles}
              src="/cart-icon.png"
              width="25"
              height="20"
            />
            <span css={cartCountStyle}>{totalQuantity} </span>
          </div>
        </Link>
      </span>
    </header>
  );
}
