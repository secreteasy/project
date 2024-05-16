export default () => ({
  port: process.env._PORT,
  db_port: process.env._DB_PORT,
  db_host: process.env._DB_POSTGRES_HOST,
  db_user: process.env._DB_USER,
  db_password: process.env._DB_PASSWORD,
  db_name: process.env._DB_NAME,
});
