import { connect, set } from 'mongoose';

const dbConnect = () => {
  if (process.env.DATABASE_URL && process.env.DATABASE_PASSWORD) {
    const mongoURL = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD);

    const seperator = mongoURL.lastIndexOf('/');
    const DB = mongoURL.slice(0, seperator + 1) + process.env.ENV + mongoURL.slice(seperator + 1);

    set('strictQuery', true);
    connect(DB, err => {
      if (err) console.log(err);
      else console.log('DB connection successful!');
    });
  } else {
    console.log('DB connection failed!');
  }
};

export { dbConnect };
