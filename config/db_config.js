var mongoose = require('mongoose');

var urlString = 'mongodb://localhost/API';
mongoose.Promise = global.Promise;
mongoose.connect(urlString,function(err,res){
if(err){
	console.log("Nao foi possivel conectar ", urlString);
}else{
	console.log("Conectado ao mongodb");
}

});