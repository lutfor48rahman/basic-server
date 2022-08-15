const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// use middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u1xdm7k.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    
    try {

        await client.connect();
    
        const positionNameCollection = client.db('basic-test').collection('positionName');
        const infoCollection = client.db('basic-test').collection('info');

        app.get('/name', async (req, res) => {
            const query = {};
            const cursor = positionNameCollection.find(query).project({name:1});
            const names = await cursor.toArray();
            res.send(names);
        });

        app.post('/information',async(req,res)=>{
            const info = req.body;
            const result = await infoCollection.insertOne(info);
            res.send(result);
        });

        app.get('/information', async (req, res) => {
            const query = {};
            const cursor = infoCollection.find(query);
            const info = await cursor.toArray();
            res.send(info);
        });

        // app.get('information/:id',async(req,res)=>{
        //     const id = req.params.id;
        //     const result = infoCollection.findById(id);
        //     res.send(result);
        // });

        app.get('/download',async(req,res)=>{
            const query = {};
            const cursor = infoCollection.find(query);
            const inf = await cursor.toArray();
            res.send(inf);
            // res.download('./xx.png');
        })

    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('About Basic Test for you!!')
})

app.listen(port, (req, res) => {
    console.log('server is running : ', port);
})








