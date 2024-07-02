const mongoose = require('mongoose');
const app = require('./app');
const seed = require('./seed');

const DATABASE_CONNECT = process.env.DATABASE_CONNECT;

mongoose
  .connect(DATABASE_CONNECT)
  .then(() => console.log('Database connected...'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`App is running on PORT ${PORT}...`));
