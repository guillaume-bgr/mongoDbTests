require('dotenv').config()
require('express-group-routes');
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello World!')
})


require('./routes/userRoutes.js')(app);
require('./routes/weatherRoutes.js')(app);

module.exports = app;