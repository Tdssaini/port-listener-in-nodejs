module.exports = {
  development: {
    client: 'postgresql',  
    connection: {  
     user: 'postgres',  
     password: 'admin',  
     server: 'localhost',  
     database: 'iot_middleware'  
    },
    debug: true
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
