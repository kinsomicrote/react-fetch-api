const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Post } = require('./models/post');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Set headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Accept, Content-Length, Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.removeHeader('Access-Control-Allow-Headers');
  next();
});

app.post('/posts', (req, res) => {
  let post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/posts', (req, res) => {
  Post.find().then(
    posts => {
      res.send({ posts });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.listen(port, () => {
  console.log(`Starting on port ${port}`);
});

module.exports = { app };
