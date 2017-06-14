/**
 * @fileOverview Crawler responsável por extrair as informações dos deputados no site dos (http://www.camara.leg.br/)
 * @author  Bruno Medeiros Costa
 * @version  0.3
 */
 
var request = require('request');
/**
 * [Cheerio description]
 * Responsável por disponibilizar funcionalidades Jquery no lado servidor
 */
var cheerio = require('cheerio');

/**
 * [Options description]
 * Opções de para requisição dos valores contidos na url http://www2.camara.leg.br/deputados/pesquisa
 */
var options = {
    url: 'http://www2.camara.leg.br/deputados/pesquisa',
    headers: {
        'User-Agent': 'Mozilla/5.0'
    }
};
request.delete('http://localhost:3000/api/data/clean', {}, function(error, response, body){
                 
       console.log(body);
});


/**
 * @param  {string} Id_dep Variável contendo o id do deputado.
 * @param  {Function} Function Função de callback.
 * @return {} null
 */
var detalha_deputado = function(id_dep, callback) {
/**
 * [options_detalhes description]
 * Opções de para requisição dos valores contidos na url http://www.camara.leg.br/internet/Deputado/dep_Detalhe.asp?id=id_dep
 * @global
 * @memberOf global
 * 
 */
        var options_detalhes = {
            url: 'http://www.camara.leg.br/internet/Deputado/dep_Detalhe.asp?id=' + id_dep,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0)'
            }
        };




        request(options_detalhes, function(err, res, body) {
            
            if (err) {
                console.log("Erro:  Requisicao 2 =>" + err, id_dep);
                setTimeout(function(){

               		detalha_deputado(id_dep,callback);

             },1000);
            } else {

                var $ = cheerio.load(body);

                /**
                 * Link com a imagem do deputado
                 * 
                 * @var {string} imagem_dep Link com a imagem do deputado
                 */
                
                var imagem_dep = $('#content img.image-left').attr('src');
                 /**
                 * Nome completo do deputado
                 * 
                 * @var {string} nome Nome completo do deputado
                 */
                
                var nome = $('.visualNoMarker li').eq(0).text().split(':')[1].trim();
                 /**
                 * Data de nascimento do deputado
                 * 
                 * @var {string} data_nascimento Data de nascimento do deputado
                 */
                
                var data_nascimento = $('.visualNoMarker li').eq(1).text().split(':')[1].trim();
                 /**
                 * Partido do deputado
                 * 
                 * @var {string} partido Partido do deputado
                 */
                
                var partido = $('.visualNoMarker li').eq(2).text().split(':')[1].trim().split('/')[0].trim();
                 /**
                 * Telefone do deputado
                 * 
                 * @var {string} telefone Telefone do deputado
                 */
               
                var telefone = $('.visualNoMarker li').eq(3).text().split(' - ')[0].split(':')[1].trim();
                 /**
                 * Estado do deputado
                 * 
                 * @var {string} estado Estado do deputado
                 */
                
                var estado = $('.visualNoMarker li').eq(2).text().split(':')[1].trim().split('/')[1].trim();
                 /**
                 * Informa se o deputado é titular da cadeira ou não
                 * 
                 * @var {boolean} titular Informa se o deputado é titular da cadeira ou não
                 */
                
                var titular = $('.visualNoMarker li').eq(2).text().split(':')[1].trim().split('/')[2].trim();
                if(titular =="Titular"){
                	titular = true;
                }else{
                	titular = false;
                }
                /**
                 * Fax do deputado
                 * 
                 * @var {string} fax Fax do deputado
                 */
	            var fax = $('.visualNoMarker li').eq(3).text().split(' - ')[1].split(':')[1].trim();
                 /**
                 * Informa as legislaturas do deputado
                 * 
                 * @var {string} legislaturas Informa as legislaturas do deputado
                 */
                var legislaturas = $('.visualNoMarker li').eq(4).text().split(':')[1].trim();
                 /**
                 * Informa o endereço completo do deputado
                 * 
                 * @var {string} endereco Informa o endereço completo do deputado
                 */
                var endereco = $('.visualNoMarker li').eq(18).text().trim()+" / "+$('.visualNoMarker li').eq(19).text().trim()+" / "+$('.visualNoMarker li').eq(20).text();
                /**
                 * Informa o email do deputado
                 * 
                 * @var {string} email Informa o email do deputado
                 */
                var email = $('.visualNoMarker li').eq(21).text();
                 /**
                 * Objeto contendo todos os dados do deputado.
                 * 
                 * @var {object} jsondeps Objeto contendo todos os dados do deputado.
                 */
                var jsondeps = {
					"fullname": nome,
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

				};

                 /**
                 * Objeto contendo todos os dados do deputado.
                 * 
                 * @var {string} strpdeps Objeto contendo todos os dados do deputado.
                 */
				var strpdeps = JSON.stringify(jsondeps);
               
				request.post('http://localhost:3000/api/data', {json:jsondeps}, function(error, response, body){
				 
				  console.log(body);
				});



				
               	
                callback();
            }

        });
}
/**
 * Função para coleta de ID's dos deputados em uma pilha
 * @function
 */
var captura_id = function(){


request(options, function(err, res, body) {

    if (err) {
        console.log("Erro: Requisicao 1 =>" + err);
    } else {

        var $ = cheerio.load(body);

        var deputados = $('#deputado option').map(function() {
            return $(this).val().split('?')[1]
        }).toArray();
/**
 * Função extinção da pilha de id's evitando timeout do lado servidor
 * @param {string} deputado [ID do deputado]
 * @function
 * @global
 * @memberOf global
 *
 */
        var buscarDetalhes = function(deputado) {
            detalha_deputado(deputado, function(dados) {
                var deputado = deputados.pop();

                if (deputado) {

                    buscarDetalhes(deputado);

                }

            });
        }
        
        buscarDetalhes(deputados.pop());

    }
});
}
captura_id();
