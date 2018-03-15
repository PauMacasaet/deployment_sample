// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:1Paulomac@localhost:5432/cjs-web-store'
  },
  test: {
    client: 'pg',
    connection: 'postgres://postgres:1Paulomac@localhost:5432/test-cjs-web-store'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
