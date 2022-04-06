const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const usersRoute = require('./routes/users.js');
const schedulesRoute = require('./routes/schedules.js');

app.use('/api/users', usersRoute);
app.use('/api/schedules', schedulesRoute);

app.listen(8000);