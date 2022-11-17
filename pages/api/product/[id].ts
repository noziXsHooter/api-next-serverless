import { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb';
/* 
let cachedDb: Db;

 async function connectToDatabase(uri: string){

  if(cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri);

  const db = client.db('ecommercetest');

  cachedDb = db;

  return db;
  }

   export default async (req: VercelRequest ,res: VercelResponse) =>{

    const  name  = 'req.body';

     const uri = 'mongodb+srv://ecommercetest:ecommercetest@ecommercetest.hlmhtv7.mongodb.net/?retryWrites=true&w=majority';

    const db = await connectToDatabase(uri);

    const collection = db.collection('products');

    const list = await collection.find().toArray();

    return res.status(201).json({list});
  } */
