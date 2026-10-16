import dns from "node:dns";

import { MongoClient } from "mongodb";

dns.setServers(["1.1.1.1"]);

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("Please add MONGODB_URI to your .env.local file");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Reuse the connection during Next.js hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  // Create the connection promise in production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
