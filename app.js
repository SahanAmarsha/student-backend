var express = require('express');
const cors = require('cors');

var app = express();

app.use(cors());

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

var Task = require('./api/models/TodoListModel');

var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded ({
        extended: true
    })
);

app.use(bodyParser.json());

var routes = require('./api/routes/TodoListRoutes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found!'});
});

app.listen(port);

console.log('TodList Restful API server started on: '+port);