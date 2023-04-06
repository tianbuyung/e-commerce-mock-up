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
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
