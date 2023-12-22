const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// ===== DATABASE CONNECTION ===== \\
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : '1232',
        database : 'smart_brain'
    }
});

// ===== SERVER START ===== \\
const app = express();
app.use(bodyParser.json());
app.use(cors())

// ===== HANDLERS ===== \\
app.get('/', (req, res)=> {res.send('success')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) })

// ===== SERVER LISTENER ===== \\
app.listen(3000, () => {
    console.log('app is running on port 3000')
})
