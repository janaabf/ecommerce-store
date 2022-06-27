import { config } from 'dotenv-safe';
import postgres from 'postgres';

// deploying on Heroku
module.exports = function setPostgresDefaultsOnHeroku() {
  if (process.env.DATABASE_URL) {
    const { parse } = require('pg-connection-string');

    // Extract the connection information from the Heroku environment variable
    const { host, database, user, password } = parse(process.env.DATABASE_URL);

    // Set standard environment variables
    process.env.PGHOST = host;
    process.env.PGDATABASE = database;
    process.env.PGUSERNAME = user;
    process.env.PGPASSWORD = password;
  }
};

config(); // to get info from .env for the database

// const sql = postgres(); // to use postgres locally

// Heroku needs SSL connections but has an "unauthorized" certificate
// https://devcenter.heroku.com/changelog-items/852
const sql = postgres({ ssl: { rejectUnauthorized: false } });

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
