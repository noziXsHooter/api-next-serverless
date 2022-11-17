import { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb';

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

    const uri = 'mongodb+srv://ecommercetest:ecommercetest@ecommercetest.hlmhtv7.mongodb.net/?retryWrites=true&w=majority';

    const db = await connectToDatabase(uri);

    const collection = db.collection('products');

    const list = await collection.find().toArray();

    return res.status(201).json(list);
  }

/* 
// Require and initialize outside of your main handler
const mysql = require('serverless-mysql')({
    config: {
      host     : 'projecttest.shop',
      database : 'u322110491_lojinhatest',
      user     : 'u322110491_lojinhatest',
      password : 'Lojinhatest123'
    }
  })

 
   export default function (req: VercelRequest ,res: VercelResponse) {

    async function connectToDatabse(){

      let results = await mysql.connect()
    
      res.send(results);
      }
     var { name } = req.body;
    res.send({ message: `Este é o produto: ${name}`});
    }
  */