import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku(); // sets variables for default connection info on Heroku

config(); // to get info from .env for the database

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}
// connects to database: if in production (Heroku) to SSL,
// else (if we're on our machine) less secure connection
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

const sql = connectOneTimeToDatabase();

type Product = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  price: string;
};

// export data from sql database
export async function getProductData() {
  const productData = await sql<Product[]>`
  SELECT * FROM productData
`;
  return productData;
}

// export data from sql database
export async function getProductDataId(id: number | undefined) {
  if (!id) return undefined;
  const [productData] = await sql<[Product | undefined]>`
  SELECT * FROM productData
  WHERE id = ${id}
`;
  return productData;
}
