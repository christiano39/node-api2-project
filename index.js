const express = require('express');
const postsRoutes = require('./posts/postsRoutes');
const port = 8000;

const server = express();
server.use(express.json());

server.use('/api/posts', postsRoutes);

server.listen(port, () => console.log('server running...'));