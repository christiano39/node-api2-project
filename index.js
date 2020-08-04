const express = require('express');
const cors = require('cors');

const postsRoutes = require('./posts/postsRoutes');
const port = 8000;

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRoutes);

server.listen(port, () => console.log('server running...'));