const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

async function main() {
  const uri = process.env.ATLAS_URI; // Full connection string
  const dbName = process.env.DB_NAME || 'malariaYouthDB'; // Use default if not set

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    const collections = await db.collections();

    collections.forEach((collection) =>
      console.log(`📂 ${collection.collectionName}`)
    );
  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

main();
