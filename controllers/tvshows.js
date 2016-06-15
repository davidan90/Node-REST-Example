//API FUNCTIONS GET, POST, PUT, DELETE
var mongoose = require('mongoose');
var TVShow = require('../models/tvshow');

mongoose.model('TVShow', TVShow);

//GET - Return all tvshows in DB
exports.findAllTVShows = function(req, res){
  console.log('GET: all');

  TVShow.find(function(err, tvshows){
    if(err){
      console.error(err.message);
      res.send(500, err.message);
    }

    console.log('GET /tvshows');
    res.status(200).jsonp(tvshows);

  });
};

//GET - Return one tvshow of the DB
exports.findTVShow = function(req, res){
  console.log('GET: ' + req.params);

  TVShow.findById(req.params.id, function(err, tvshow){
    if(err){
      console.error(err.message);
      res.send(500, err.message);
    }

    console.log('GET /tvshow/'+req.params.id);
    res.status(200).jsonp(tvshow);
  });
};

//POST - Insert a new tvshow in DB
exports.addTVShow = function(req, res){
  console.log('POST: ' + req.body);

  var tvshow = new TVShow({
    title: req.body.title,
    year: req.body.year,
    country: req.body.country,
    poster: req.body.poster,
    seasons: req.body.seasons,
    genre: req.body.genre,
    summary: req.body.summary
  });

  tvshow.save(function(err, tvshow){
    if(err){
      console.error(err.message);
      return res.status(500).send(err.message);
    }

    res.status(200).jsonp(tvshow);
  });
};

//PUT - Update a register already exists in DB
exports.updateTVShow = function(req, res){
  console.log('PUT: ' + req.body);

  TVShow.findById(req.params.id, function(err, tvshow){
    tvshow.title = req.body.petId;
    tvshow.year = req.body.year;
    tvshow.country = req.body.country;
    tvshow.poster = req.body.poster;
    tvshow.seasons = req.body.seasons;
    tvshow.genre = req.body.genre;
    tvshow.summary = req.body.summary;

    tvshow.save(function(err){
      if(err){
        console.error(err.message);
        return res.status(500).send(err.message);
      }

      res.status(200).jsonp(tvshow);
    });
  });
};

//DELETE - Delete a tvshow with specified id
exports.deleteTVShow = function(req, res){
  console.log('DELETE: ' + req.body);

  TVShow.findById(req.params.id, function(err, tvshow){
    tvshow.remove(function(err){
      if(err){
        console.error(err.message);
        return res.status(500).send(err.message);
      }
      res.status(200).send();
    });
  });
};
