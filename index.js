const express = require('express');
const helmet = require('helmet');

const studentsRouter = require('./routes/studentsRouter');
const cohortsRouter = require('./routes/cohortsRouter');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/students', studentsRouter);
server.use('/api/cohorts', cohortsRouter);

const port = 5000;

server.listen(port, () => {
    console.log(`\n* Server Running on http://localhost:${port} *\n`);
});