import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import {handleRegister} from "./controllers/register";
import {handleSignin} from './controllers/signin';
import {handleProfileGet} from './controllers/profile';
import {handleImage, handleAPICall } from './controllers/image';

// ===== DATABASE CONNECTION ===== \\
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        host : process.env.DATABASE_HOST,
        port : 5432,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PW,
        database : process.env.DATABASE_DB
    }
});

// ===== SERVER START ===== \\
const app = express();
app.use(bodyParser.json());
app.use(cors())

// ===== HANDLERS ===== \\
app.get('/', (req, res)=> {res.send('success')})
app.post('/signin', handleSignin(db, bcrypt))
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { handleAPICall(req, res) })

// ===== SERVER LISTENER ===== \\
app.listen(3000, () => {
    console.log('app is running on port 3000')
})
