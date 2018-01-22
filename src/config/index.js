/**
 * Created by milad on 1/22/18.
 */
require('dotenv').config();

export default {
  database: {
    host : process.env.POSTGRES_HOST_ADDRESS,
    port : process.env.POSTGRES_PORT_NUMBER,
    database : process.env.POSTGRES_DB_NAME,
    username : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    poolSize : process.env.POSTGRES_POOL_SIZE,
  },
  application: {
    port: process.env.PORT,
    applicationDBPrefix : process.env.APPLICATION_DB_PREFIX
  }
}