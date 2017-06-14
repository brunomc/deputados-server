/**
 * [deputadoController description]
 * Controller da API de persistencia de informações sobre os deputados
 * @namespace deputadoController
 * @name deputadoController
 * @todo
 * PARAMS: fullname:String,
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



var Deputado = require('../models/Deputado');
/**
 * @param  {string} fullname
 * @param  {string} birthday
 * @param  {string} party
 * @param  {string}	state
 * @param  {string}	main
 * @param  {string}	phone
 * @param  {string}	address
 * @param  {string}	img
 * @param  {string}	fax
 * @param  {string}	legislaturas
 * @param  {string}	email
 * @param  {Function} Save
 * @return {json}	Salva os dados do deputado
 * 
 */
exports.save = function(nome,data_nascimento,partido,estado,titular,telefone,endereco,img,fax,legislaturas,email,callback){
	new Deputado({
					"fullname": nome,
					"birthday":data_nascimento,
					"party":partido,
					"state":estado,
					"main":titular,
					"phone":telefone,
					"address": endereco,
					"img":img,
					"fax":fax,
					"legislaturas":legislaturas,
					"email":email
	}).save(function(error,deputado){
		if(error){
			callback({error: 'Não foi possivel salvar'});
			console.log("erro");
		}else{
			console.log("save", deputado);
			callback(JSON.stringify(deputado));
		}
	});

};

exports.delete = function(callback){
   
	Deputado.remove(function(error){
	 	if(!error){
	 		callback([]);
	 		console.log("DB Clean!");
	 	}else{
	 		callback({resposta:"Não foi possivel limpar o DB"});
	 	}
	 });

}
/**
 * @param  {Function} Callback
 * @return {json} Retorna JSON com todos os dados dos deputados
 */
exports.list = function(callback){
	Deputado.find({},function(error,deputados){
		if(error){
			callback({error:'Não foi possivel listar deputados'});
		}else{
			callback(deputados);
		}

	})	
};

