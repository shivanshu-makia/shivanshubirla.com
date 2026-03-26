import { MongoClient, Db } from 'mongodb'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'shivanshubirla'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(MONGO_URL)
  const db = client.db(DB_NAME)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
