import { css } from '@emotion/react';

const footerStyles = css`
  display: flex;
  justify-content: center;
  padding: 10px 14px;
  color: #333333;
  background-color: #eee;
  margin: 20px;
  border-radius: 5px;
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <div>credits to myself :)</div>
    </footer>
  );
}
