# deputados-server
Crawler+API de busca de deputados do Brasil


===================================================

#Crawler
	
		crawler_deputados.js

#API Server

		app.js
#Database

	MONGODB 3.4

===================================================
#Instructions Local Running

	->Start Database
		mongod
	->Start Server API
		nodemon app.js
	->Run Crawler
		node crawler_deputados.js
	#NOTE: Put crawler_deputados in crontrab (Linux) or task manager (Windows)
