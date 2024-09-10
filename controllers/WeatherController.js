const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.DATABASE)

exports.getData = async (req, res) => {
    try {
        await client.connect();
        const db = client.db('myfirstbase');
        const weathers = await db.collection('weathers').find().toArray();
        return res.status(200).json({ weathers: weathers });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

exports.getDataByStationId = async (req, res) => {
    let stationId = req.params.id;
    try {
        await client.connect();
        const db = client.db('myfirstbase');
        const weathers = await db.collection('weathers').find({"id_station": stationId}).toArray();
        return res.status(200).json({ weathers: weathers });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

exports.getDataByStationId = async (req, res) => {
    let stationId = req.params.id;
    try {
        await client.connect();
        const db = client.db('myfirstbase');
        const weathers = await db.collection('weathers').find({"id_station": stationId}).toArray();
        return res.status(200).json({ weathers: weathers });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

exports.setData = async (req, res) => {
    let data = req.body;
    try {
        await client.connect();
        const db = client.db('myfirstbase');
        const weather = await db.collection('weathers').insertOne(data);
        return res.status(201).json(weather);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}