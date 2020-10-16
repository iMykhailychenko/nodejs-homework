import mongoose from 'mongoose';
import env from '../config/env';

class Connection {
  constructor() {
    this.connection = null;
    this.database = null;
  }

  collection(collection) {
    return this.database.collection(collection);
  }

  async connect() {
    const connectionState = new Promise(resolve => {
      mongoose.connection.on('error', e => {
        console.log(e);
        process.exit(1);
      });
      mongoose.connection.on('open', () => {
        console.log('Database connection successful');
        resolve();
      });
    });

    await mongoose.connect(env.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    return connectionState;
  }

  async close() {
    mongoose.connection.close();
  }
}

export default new Connection();
