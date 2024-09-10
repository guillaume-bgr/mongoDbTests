
const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.DATABASE)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const { email, password } = req.body
    await client.connect()
    const db = client.db('myfirstbase');
    const users = db.collection('users')
    let user = await users.findOne({"email": email})
    if (!user) {
        return res.status(404).json({message: `User not found`});
    } else {
        bcrypt.compare(password, user.password, function(err, response) {
            if (response) {
                let token = generateJWT({ email: email, id: user.id }, "24h");
                user.password = undefined;
                return res.status(200).json({ message: 'Authenticated', data: { token, user } })
            } else {
                return res.status(500).json({ message: 'Error validating password', error: err})    
            }
        })
    }
}

exports.register = async (req, res) => {
    const { email, firstname, lastname, password } = req.body
    if (!email || !firstname || !lastname || !password) {
        return res.status(400).json({ message: 'Missing data' });
    }
    try {
        await client.connect()
        const db = client.db('myfirstbase');
        const users = db.collection('users');
        let user = await users.findOne({"email": email});
        if (user) {
            return res.status(409).json({message: `User already`});
        } else {
            const hash = await bcrypt.hash(password, 10);
            user = await users.insertOne({firstname: firstname, lastname: lastname, email: email, password: hash});
            return res.status(201).json(user);
        }
    } catch (err) {
        if(err.name == 'SequelizeDatabaseError'){
            return res.status(500).json({ message: 'Database Error', error: err })
        }
        return res.status(500).json({ message: 'Hash Process Error', error: err}) 
    }
}

function generateJWT(payload, expiresIn) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn })
}