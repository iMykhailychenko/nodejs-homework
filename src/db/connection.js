const mongodb = require('mongodb');
const env = require('../config/env');

class Connection {
  constructor() {
    this.connection = null;
    this.database = null;
  }

  collection(collection) {
    return this.database.collection(collection);
  }

  async connect() {
    const { MongoClient } = mongodb;
    this.connection = await MongoClient.connect(env.db.url, {
      useUnifiedTopology: true,
    });
    this.database = this.connection.db(env.db.name);
  }

  async close() {
    this.connect.close();
  }
}

module.exports = new Connection();
