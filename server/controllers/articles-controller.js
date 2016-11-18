const mongoose = require('mongoose');
const Article = require('./../models/article.js');

function loadArticlesByGenrePage(req, res) {
  var genre = req.query.genre;
  Article
    .find({ genre: genre })
    .then(articles => {
        res.render('articles/all-articles', { articles: articles })
    })
}

function loadSingleArticlePage(req, res) {
  var title = req.query.title;
  Article
    .findOne({ mainHeader: title })
    .then(article => {
        res.render('articles/single-article', { mainHeader: article.mainHeader, subHeader: article.subHeader, author: article.author, body: article.body })
    })
}

module.exports = {
    loadArticlesByGenrePage,
    loadSingleArticlePage
}