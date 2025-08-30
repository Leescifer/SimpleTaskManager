const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');

const app = express();

connectDB();

app.use(cors(
    {
        origin: "http://localhost:3000", 
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/task.route'));


app.get('/', (req, res) => {
    res.send('Hello dsada')
});

module.exports = app;