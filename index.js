const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.638jm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('travel_tour');
        const travelsCollection = database.collection('travels');
        const bookingCollection = database.collection('bookingCollection');
        const CustomerInfo = database.collection('CustomerInfo');

        // Get travels API

        app.get('/travels', async (req, res) => {
            console.log(req.body);
            const cursor = travelsCollection.find({});
            const travels = await cursor.toArray();
            res.send(travels);
        })

        // Booking travel............
        app.post('/Addbooking', async (req, res) => {
            console.log(req.body);
            const result = await bookingCollection.insertOne(req.body);
            res.send(result);
        })


        // geting id to show single data form travels database.... 
        app.get('/book/:id', async (req, res) => {
            console.log('Hitedddddd Body.....', req.body);
        })




        app.use('/getBooking', async (req, res) => {
            console.log(req.body);
            const result = await bookingCollection.find({}).toArray();
            console.log(result);
            res.send(result);
        })



        // Customer information insert in database.
        app.post('/customerInfo', async (req, res) => {
            console.log(req.body);
            const result = await CustomerInfo.insertOne(req.body);
            console.log(result)
            res.send(result);
        })

        // customer info getinng from data  
        app.use('/myOrders', async (req, res) => {
            console.log(req.body);
            const result = await CustomerInfo.find({}).toArray();
            console.log(result);
            res.send(result);
        })



        app.delete('/deleteOrdersByUser/:id', async (req, res) => {
            const query = { _id: ObjectId(req.params.id) }
            console.log(query);
            const result = await CustomerInfo.deleteOne(query);
            res.send(result);

        })


        // Add New Services To Database............
        app.post('/addServiceDB', async (req, res) => {
            const result = await travelsCollection.insertOne(req.body);
            res.send(result);
        })




        app.put('/adminPannel/approved/:id', async (req, res) => {
            const query = { _id: ObjectId(req.params.id) }
            const result = await CustomerInfo.updateOne(query, {
                $set: {
                    status: 'Approved'
                }
            });
            console.log(result);
            res.send(result);
        })












        // app.get('/singleBooking/:id', async (req, res) => {
        //     console.log('Hitting Body', req);
        //     const query = { _id: ObjectId(id) }
        //     const result = await travelsCollection.findOne(query).toArray();
        //     console.log(result);
        // })








        // Post API
        // app.get('/book/:id', async (req, res) => {
        // console.log(req.body);
        // const query = { _id: ObjectId(req.params._id) }
        // console.log(query)
        // const result = await bookingCollection.insertOne({ query });
        // console.log(result);
        // res.send(result);
        // })







    }
























    finally {
        //await client.close();
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running the server')
})

app.listen(port, () => {
    console.log('hitting the post', port);
})