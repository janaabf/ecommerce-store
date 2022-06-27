## Cloud Store

This is an e-commerce store built as a practice project during the upLeveled bootcamp for web development.

## Technologies used

- Next.js
- React.js
- PostgreSQL
- Emotion

Languages

- Javascript
- JSX
- Typescript
- TSX

## Example

(insert pictures)

## Setup

1. Clone the project on your local machine (run each line individually):

```bash
git clone <url>
cd <repo name>
yarn
```

2. Connect to default database as admin:

- On Windows

```bash
psql -U postgres
```

- On macOS

```bash
psql postgres
```

- On Linux

```bash
sudo -u postgres psql
```

3. Set up the database:

```bash
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

4. After queries are successfully ran, quit `psql` and connect to the database

```bash
\q
```

- On Windows & macOS

```bash
psql -U `<user name>` `<database name>
```

- On Linux

```bash
sudo -u <user name> psql -U <user name> <database name>
```

5. In the repository's directory, run migrations using ley:

```bash
yarn migrate up
```

6. Create a .env file:

- Open the project in your code editor
- Copy the content of the .env.example file into the .env file
- Replace XXXXXXXX with the access information
- add .env file to .gitignore

7. (Optional) Start development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment Guide

Heroku was used to deploy this site,

### Setup Heroku

1. Sign up for Heroku: https://signup.heroku.com/
2. Create a new App
3. Choose a name and select the "Europe" Region
4. Click on the button in the middle called "Connect to GitHub"
5. Search for your repository in the search box at the bottom of the page and click on the "Connect" button
6. Click on the button for "Enable Automatic Deploys"
7. Go back to the Overview tab and click on "Configure Add-On"
8. Search for "Postgres" and select "Heroku Postgres" from the results
9. Deploy your app

### Configure Application

### Connect to Heroku PostgreSQL Database via psql

### Enjoy

Now everything should be up and running! Congratulations :)
