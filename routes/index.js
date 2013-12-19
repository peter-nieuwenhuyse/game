
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'zeeslag' });
};
exports.gameroom = function(req, res){
  res.render('gameroom',{title: 'get ready to rumble'});
}

