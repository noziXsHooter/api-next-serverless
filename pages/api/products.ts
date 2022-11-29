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

          switch (req.method) {
              case 'GET': {
                  return listProducts(req, res);
              }
            
               case 'POST': {
                  return postProduct(req, res); 
              }
          }                 
    }

    async function listProducts(req: VercelRequest ,res: VercelResponse) 
    {
      try {
        //connect to database
        const uri = 'mongodb+srv://ecommercetest:ecommercetest@ecommercetest.hlmhtv7.mongodb.net/?retryWrites=true&w=majority';
        const db = await connectToDatabase(uri);
        const collection = db.collection('products');
        const list = await collection.find().toArray();

        return res.status(201).json(list)
     /*            .setHeader('Access-Control-Allow-Origin:','*') */;
/*                 .setHeader('Content-Type:','application/json')
                .setHeader('Set-Cookie:', '<JSESSIONID>=<x6Bs790Fd4Fsdg43fdGhx>; Secure'); */

      } catch(e) {
        res.status(500).json({message: e})
      }
    }

    async function postProduct(req: VercelRequest ,res: VercelResponse) 
    {
      const { name , image, price } = req.body;

      try {
        //connect to database
        const uri = 'mongodb+srv://ecommercetest:ecommercetest@ecommercetest.hlmhtv7.mongodb.net/?retryWrites=true&w=majority';

        const db = await connectToDatabase(uri);
    
        const collection = db.collection('products');
  
        await collection.insertOne( { name: name, image: image, price: price, createdAt: new Date() } )

        return res.status(201).json({name, image, price});

      } catch (e) {
        
        return res.status(500).json({message: e})
      }
    }

   /*  if (req.method === 'POST'){

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
    } */
