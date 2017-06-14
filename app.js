/**
 * @fileOverview API de requisições de informações sobre os deputados
 * @author  Bruno Medeiros Costa
 * @version  0.3
 * 
 */


var app = require('./config/app_config');
var db = require('./config/db_config');
var deputadoController = require('./controllers/deputadoController');

/**
 * @namespace
 *Rotas da API
 *
 * @todo 
 *
 *  / = > API DEPUTADOS
 *  @todo 
 *  Method:GET => URL: /api/data/deputados => PARAMS:
 *  @todo 
 *  Method:POST => URL: /api/data => PARAMS:  "fullname": nome,
					"birthday":data_nascimento,
					"party":partido,
					"state":estado,
					"main":titular,
					"phone":telefone,
					"address": endereco,
					"img":imagem_dep,
                    "fax":fax,
                    "legislaturas":legislaturas,
                    "email":email
 *  
 *@name Rotas_API
 *
 *  
 */
app.get('/', function(req,res){

	res.end("API DEPUTADOS")
	
});
app.delete('/api/data/clean', function(req,res){

	deputadoController.delete(function(resp){
		res.json(resp);
	})
	
});

app.get('/api/data/deputados',function(req,res){

	deputadoController.list(function(resp){

		res.json(resp);
	});

});


app.post('/api/data', function(req,res){


	var nome = req.body.fullname;
	var data_nascimento = req.body.birthday;
	var partido = req.body.party;
	var estado = req.body.estate;
	var titular = req.body.main;
	var telefone = req.body.phone;
	var endereco = req.body.address;
	var img = req.body.img;
	var fax = req.body.fax;
	var legislaturas = req.body.legislaturas;
	var email = req.body.email;

	deputadoController.save(nome,data_nascimento,partido,estado,titular,telefone,endereco,img,fax,legislaturas,email,function(resp){
		console.log(resp);
		res.end(resp);

	});


});