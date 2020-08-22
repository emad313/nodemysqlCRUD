const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/routes');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

route(app);

app.get('/', (req, res) => res.send('Hello new Project'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));