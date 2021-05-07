const mongoose = require('mongoose');

const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_DATABASE || 'database_local';
const port = process.env.DB_PORT || '27017';

mongoose.connect(`mongodb://${host}:${port}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log('Problem at connect to database');
    process.exit();
  } else {
    // eslint-disable-next-line no-console
    console.log('Database ONLINE');
  }
});
