import { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient, Db, ObjectId } from 'mongodb';
 

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

    if(req.method === 'GET'){

      var { id } = req.query;
 
      if(id.length === 24){

        const uri = 'mongodb+srv://ecommercetest:ecommercetest@ecommercetest.hlmhtv7.mongodb.net/?retryWrites=true&w=majority';
      
        const db = await connectToDatabase(uri);
      
        const collection = db.collection('products');
      
        const product = await collection.find({"_id" : new ObjectId(`${id}`)}).toArray();

        if(product.length != 0){

          return res.status(201).json(product);

        }else{

          return res.status(201).json( { message: 'Produto não encontrado! '});

        }
      } else {

        return res.status(201).json( { message: 'O id escolhido é inválido! '});

      }
    }
}