const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres.hgqtcznsjgunjbgohmsh:CEssSPdftjbSCnIF@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log("Connected successfully!");
    return client.end();
  })
  .catch((err) => console.error("Connection error:", err));