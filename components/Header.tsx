import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

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

const title = css`
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

type Props = {
  globalCart: { id: number; quantity: number }[];
};

export default function Header(props: Props) {
  const totalQuantity = props.globalCart
    .map((array) => array.quantity)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  return (
    <header css={headerStyles}>
      <Link href="/">☁️</Link>
      <span css={title}>.. Cumuli ..</span>
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
