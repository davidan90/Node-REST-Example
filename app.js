var express = require("express");
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var TVShowController = require('./controllers/tvshows');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

router.get('/', function(req, res){
  res.send("NODE API | URL: /api/tvshows");
});

app.use(router);

//API routes
var tvshows = express.Router();

tvshows.route('/tvshows')
  .get(TVShowController.findAllTVShows)
  .post(TVShowController.addTVShow);

tvshows.route('/tvshows/:id')
  .get(TVShowController.findTVShow)
  .put(TVShowController.updateTVShow)
  .delete(TVShowController.deleteTVShow);

app.use('/api', tvshows);



mongoose.connect('mongodb://localhost/tvshows', function(err, res){
  if(err) {
    console.log(err);
    console.error('ERROR: connecting to database fail');
  }

  app.listen(3000, function() {
    console.log('Node Server running');
  });
});
