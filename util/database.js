import { config } from 'dotenv-safe';
import postgres from 'postgres';

config(); // to get info from .env for the database

const sql = postgres(); // to use postgres

// export data from sql database
export async function getProductData() {
  const productData = await sql`
  SELECT * FROM productData
`;
  return productData;
}

// export data from sql database
export async function getProductDataId(id) {
  const [productData] = await sql`
  SELECT * FROM productData
  WHERE id = ${id}
`;
  return productData;
}
