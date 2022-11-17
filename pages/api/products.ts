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

   export default async function handler(req: VercelRequest ,res: VercelResponse) {

    if (req.method === 'POST'){

      const { name , image, price } = req.body
 
      const uri = 'mongodb+srv://ecommercetest:ecommercetest@ecommercetest.hlmhtv7.mongodb.net/?retryWrites=true&w=majority';

      const db = await connectToDatabase(uri);
  
      const collection = db.collection('products');
  
      await collection.insertOne( { name: name, image: image, price: price, createdAt: new Date() } )

      return res.status(201).json({name, image, price})
     // return res.status(404).json({message: 'Essa rota nao aceita POST'})
    }


    else if (req.method === 'GET'){
      
      const uri = 'mongodb+srv://ecommercetest:ecommercetest@ecommercetest.hlmhtv7.mongodb.net/?retryWrites=true&w=majority';

      const db = await connectToDatabase(uri);
  
      const collection = db.collection('products');
  
      const list = await collection.find().toArray();
  
      return res.status(201).json(list);
    }

     else {
      
      return res.status(404).json({message: 'Método inválido!'})
    }

  }
