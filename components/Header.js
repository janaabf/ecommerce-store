import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  color: #333333;
  background-color: #eee;
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <Link href="/">Home</Link>
      <Link href="/cart">Cart</Link>
    </header>
  );
}
