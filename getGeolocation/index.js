(async () => {
  // Imports
  const MongoClient = require('mongodb');
  const Geolocation = require('../geolocation');
  
  // Mongo config
  const dbName = 'weather';
  const mongoUrl = 'mongodb://localhost:27017';

  try {
    const client = await MongoClient.connect(mongoUrl);
    const locations = await client.db(dbName).collection('locations').find().toArray();
    const geolocations = await Promise.all(locations.map(async ({ address }) => {
      const geolocation = await Geolocation({ address });
      return({ address, ...geolocation });
    }));
    client.close()
    return geolocations;
  } catch(e) {
    throw new Error(e);
  }
})();