export default function ({ dbAddress }, cb) {
    /*
      MONGO
        mongoose.Promise = global.Promise;
        mongoose.connect(dbAddress);
        mongoose.connection.on('error', error => console.log(error));
        mongoose.connection.once('open', () => console.log('Connected to database ' + dbAddress));
        cb();

      REDIS
        const db = redis.createClient();
        db.on('error', error => console.log(error));
        db.on('connect', () => console.log('Connected to database ' + dbAddress))
        cb(db);
     */

  cb();
}
