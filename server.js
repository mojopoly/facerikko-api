const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const signUp = require('./controllers/signup');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '$',
    database: 'facerikko',
  },
});

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', signIn.handleSignin(db, bcrypt));

app.post('/signup', signUp.handleSignup(db, bcrypt));

app.get('/profiles/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3001, () => {
  console.log('app is running on port' + process.env.PORT);
});
