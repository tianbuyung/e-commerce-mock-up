require("dotenv").config();

const { USERNAME, PASSWORD } = process.env;

module.exports = {
  development: {
    username: USERNAME || 'postgres',
    password: PASSWORD || 'postgres',
    database: "eCommerceDB",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: USERNAME || 'postgres',
    password: PASSWORD || 'postgres',
    database: "eCommerceDB_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: USERNAME || 'postgres',
    password: PASSWORD || 'postgres',
    database: "eCommerceDB_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
