// creates product database

exports.up = async function (sql) {
  await sql`
  CREATE TABLE productData (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      name varchar(40) NOT NULL,
      subtitle varchar(40) NOT NULL,
      description varchar(200) NOT NULL,
      price NUMERIC(5,2) --5 digits, rounds up to 2 digits after .
    )`;
};

exports.down = async function (sql) {
  await sql`
  DROP TABLE productData
	`;
};
