/**
 * [deputado description]
 * Model deputado
 * @namespace deputado
 * @name deputado
 * @todo
 * Model PARAMS: fullname:String,
	birthday:String,
	party:String,
	state:String,
	main:String,
	phone:String,
	address:String,
	img:String,
	fax:String,
    legislaturas:String,
    email:String
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DeputadoSchema = new Schema({

	fullname:String,
	birthday:String,
	party:String,
	state:String,
	main:String,
	phone:String,
	address:String,
	img:String,
	fax:String,
    legislaturas:String,
    email:String

});

module.exports = mongoose.model('Deputado',DeputadoSchema);