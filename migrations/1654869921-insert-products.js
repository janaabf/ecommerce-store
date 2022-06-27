// inserts product info into database

const productData = [
  {
    name: 'Lia',
    subtitle: 'the classic',
    description:
      'The cloud for all needs and purposes. You will NEVER want to live without it.',
    price: '100',
  },
  {
    name: 'Yoonie',
    subtitle: 'the soft boi',
    description:
      'A good boy that will keep you company during slow mornings and put an end to sleepless nights.',
    price: '300',
  },
  {
    name: 'Frieda',
    subtitle: 'the drama b',
    description: 'She is a statement. No description needed.',
    price: '200',
  },
  {
    name: 'Ola',
    subtitle: 'the certified blanket',
    description:
      'The flat friend of your dreams - literally. We tried having a bad sleep with their company. We did not succeed (and neither will you).',
    price: '150',
  },
  {
    name: 'Mina',
    subtitle: 'the pocket sized one',
    description: 'Need a cloud on the go? We get it, and Mina does too.',
    price: '80',
  },
  {
    name: 'Thea',
    subtitle: 'the I do not wanna talk',
    description:
      'For all our introverts out there who want peace and silence. Surround yourself with just the right .',
    price: '80',
  },
];

exports.up = async function (sql) {
  await sql`
  INSERT INTO
  productData ${sql(productData, 'name', 'subtitle', 'description', 'price')}`;
};

exports.down = async function (sql) {
  for (const product of productData) {
    await sql`
  DELETE FROM
  productData
  WHERE
  name = ${product.name} AND
  subtitle = ${product.subtitle} AND
  description = ${product.description} AND
  price = ${product.price}
	`;
  }
};
