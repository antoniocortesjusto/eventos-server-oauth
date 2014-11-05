var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');


var app = express();

// Base URL
app.get('/', function(req, res){
  res.send('<h1> Test API Gestor de Eventos</h1>');
});

//Middleware
// We are going to protect / routes with JWT
app.use('/api', expressJwt({secret: 'tokenSecret'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  console.log('REQUEST - Time:', Date.now(), 'Method:', req.method, 'URL:', req.url, 'username', req.body.username ,'password', req.body.password);
  next();
});
// Enable Cross-Origin-Access
app.use('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
 });


//HTTP
app.post('/authenticate', function(req, res) {
	var username = req.body.username ;
	var password = req.body.password;

	console.log('username:', username, 'password', password);

	//TODO validate req.body.username and req.body.password
  	//if is invalid, return 401
  	if (!(username === 'username' && password === 'password')) {
    	
    	res.status(401).send('Wrong user or password')
    	return;
  	}

	var profile = {
	    first_name: 'John',
	    last_name: 'Doe',
	    email: 'john@doe.com',
	    id: 'SE12345'
	};

  	// We are sending the profile inside the token
  	var token = jwt.sign(profile, 'tokenSecret', { expiresInMinutes: 60*5 });

  	res.json({ token: token });
});

app.get('/api/events', function(req,res){

	var events = { events : [
	    { IdEvento: 1, NombreEvento: 'Evento 1', FxInicio: new Date('01 Jan 2015 10:00') , FxFin: new Date('01 Jan 2015 13:00'), FxCaduca: '01 Feb 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 2, NombreEvento: 'Evento 2', FxInicio: new Date('01 Feb 2015 11:00') , FxFin: new Date('01 Feb 2015 14:00'), FxCaduca: '01 Mar 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 3, NombreEvento: 'Evento 3', FxInicio: new Date('01 Mar 2015 10:00') , FxFin: new Date('01 Mar 2015 13:00'), FxCaduca: '01 Apr 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 4, NombreEvento: 'Evento 4', FxInicio: new Date('01 Apr 2015 10:00') , FxFin: new Date('01 Apr 2015 13:00'), FxCaduca: '01 May 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 5, NombreEvento: 'Evento 5', FxInicio: new Date('01 May 2015 10:00') , FxFin: new Date('01 May 2015 13:00'), FxCaduca: '01 Jun 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 6, NombreEvento: 'Evento 6', FxInicio: new Date('01 Jun 2015 10:00') , FxFin: new Date('01 Jun 2015 13:00'), FxCaduca: '01 Jul 2015 13:00', Imagen: 'URL'},

  	]};

  	res.json(events);

});

app.get('/api/events/:IdEvento', function(req,res){

	var IdEvento = req.params.IdEvento;
	var evento = {};
	var events = { events : [
	    { IdEvento: 1, NombreEvento: 'Evento 1', FxInicio: new Date('01 Jan 2015 10:00') , FxFin: new Date('01 Jan 2015 13:00'), FxCaduca: '01 Feb 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 2, NombreEvento: 'Evento 2', FxInicio: new Date('01 Feb 2015 11:00') , FxFin: new Date('01 Feb 2015 14:00'), FxCaduca: '01 Mar 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 3, NombreEvento: 'Evento 3', FxInicio: new Date('01 Mar 2015 10:00') , FxFin: new Date('01 Mar 2015 13:00'), FxCaduca: '01 Apr 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 4, NombreEvento: 'Evento 4', FxInicio: new Date('01 Apr 2015 10:00') , FxFin: new Date('01 Apr 2015 13:00'), FxCaduca: '01 May 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 5, NombreEvento: 'Evento 5', FxInicio: new Date('01 May 2015 10:00') , FxFin: new Date('01 May 2015 13:00'), FxCaduca: '01 Jun 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 6, NombreEvento: 'Evento 6', FxInicio: new Date('01 Jun 2015 10:00') , FxFin: new Date('01 Jun 2015 13:00'), FxCaduca: '01 Jul 2015 13:00', Imagen: 'URL'},

  	]};

  	for (i = 0; i < events.events.length; i++) { 
    	if (events.events[i].IdEvento == IdEvento){
    		evento = events.events[i];
    	}
	}

  	res.json(evento);

});



app.get('/api/scheduledevents', function(req,res){

	var events = { events : [
	    { IdEvento: 1, NombreEvento: 'Evento 1', FxInicio: new Date('01 Jan 2015 10:00') , FxFin: new Date('01 Jan 2015 13:00'), FxCaduca: '01 Feb 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 2, NombreEvento: 'Evento 2', FxInicio: new Date('01 Feb 2015 11:00') , FxFin: new Date('01 Feb 2015 14:00'), FxCaduca: '01 Mar 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 3, NombreEvento: 'Evento 3', FxInicio: new Date('01 Mar 2015 10:00') , FxFin: new Date('01 Mar 2015 13:00'), FxCaduca: '01 Apr 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 4, NombreEvento: 'Evento 4', FxInicio: new Date('01 Apr 2015 10:00') , FxFin: new Date('01 Apr 2015 13:00'), FxCaduca: '01 May 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 5, NombreEvento: 'Evento 5', FxInicio: new Date('01 May 2015 10:00') , FxFin: new Date('01 May 2015 13:00'), FxCaduca: '01 Jun 2015 13:00', Imagen: 'URL'},
    	{ IdEvento: 6, NombreEvento: 'Evento 6', FxInicio: new Date('01 Jun 2015 10:00') , FxFin: new Date('01 Jun 2015 13:00'), FxCaduca: '01 Jul 2015 13:00', Imagen: 'URL'},

  	]};

  	res.json(events);
	
});

app.get('/api/conferencias/:IdEvento', function(req,res){

	var IdEvento = req.params.IdEvento;
	var conferenciasEvento = [];
	var conferencias = { conferencias : [
	    { IdConferencia: 1, TituloConferencia: 'Conferencia 1', FxInicio: new Date('01 Jan 2015 10:00') , FxFin: new Date('01 Jan 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '1'},
    	{ IdConferencia: 2, TituloConferencia: 'Conferencia 2', FxInicio: new Date('01 Jan 2015 11:00') , FxFin: new Date('01 Jan 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '1'},
    	{ IdConferencia: 3, TituloConferencia: 'Conferencia 3', FxInicio: new Date('01 Jan 2015 12:00') , FxFin: new Date('01 Jan 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '1'},
    	{ IdConferencia: 4, TituloConferencia: 'Conferencia 4', FxInicio: new Date('01 Feb 2015 11:00') , FxFin: new Date('01 Feb 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '2'},
    	{ IdConferencia: 5, TituloConferencia: 'Conferencia 5', FxInicio: new Date('01 Feb 2015 12:00') , FxFin: new Date('01 Feb 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '2'},
    	{ IdConferencia: 6, TituloConferencia: 'Conferencia 6', FxInicio: new Date('01 Feb 2015 13:00') , FxFin: new Date('01 Feb 2015 14:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '2'},
    	{ IdConferencia: 7, TituloConferencia: 'Conferencia 7', FxInicio: new Date('01 Mar 2015 10:00') , FxFin: new Date('01 Mar 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '3'},
    	{ IdConferencia: 8, TituloConferencia: 'Conferencia 8', FxInicio: new Date('01 Mar 2015 11:00') , FxFin: new Date('01 Mar 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '3'},
    	{ IdConferencia: 9, TituloConferencia: 'Conferencia 9', FxInicio: new Date('01 Mar 2015 12:00') , FxFin: new Date('01 Mar 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '3'},
    	{ IdConferencia: 10, TituloConferencia: 'Conferencia 10', FxInicio: new Date('01 Apr 2015 10:00') , FxFin: new Date('01 Apr 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '4'},
    	{ IdConferencia: 11, TituloConferencia: 'Conferencia 11', FxInicio: new Date('01 Apr 2015 11:00') , FxFin: new Date('01 Apr 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '4'},
    	{ IdConferencia: 12, TituloConferencia: 'Conferencia 12', FxInicio: new Date('01 Apr 2015 12:00') , FxFin: new Date('01 Apr 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '4'},
    	{ IdConferencia: 13, TituloConferencia: 'Conferencia 13', FxInicio: new Date('01 May 2015 10:00') , FxFin: new Date('01 May 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '5'},
    	{ IdConferencia: 14, TituloConferencia: 'Conferencia 14', FxInicio: new Date('01 May 2015 11:00') , FxFin: new Date('01 May 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '5'},
    	{ IdConferencia: 15, TituloConferencia: 'Conferencia 15', FxInicio: new Date('01 May 2015 12:00') , FxFin: new Date('01 May 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '5'},
    	{ IdConferencia: 16, TituloConferencia: 'Conferencia 16', FxInicio: new Date('01 Jun 2015 10:00') , FxFin: new Date('01 Jun 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '6'},
    	{ IdConferencia: 17, TituloConferencia: 'Conferencia 17', FxInicio: new Date('01 Jun 2015 11:00') , FxFin: new Date('01 Jun 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '6'},
    	{ IdConferencia: 18, TituloConferencia: 'Conferencia 18', FxInicio: new Date('01 Jun 2015 12:00') , FxFin: new Date('01 Jun 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '6'}
  	]};

  	
	for (var i = 0; i < conferencias.conferencias.length; i++) { 
    	if (conferencias.conferencias[i].IdEvento == IdEvento){
    		conferenciasEvento.push(conferencias.conferencias[i]);
    	}
	}
  	
  	
  	res.json(conferenciasEvento);
	
});

app.get('/api/conferencia/:IdConferencia', function(req,res){

	var IdConferencia = req.params.IdConferencia;
	var conferencia = {};
	var conferencias = { conferencias : [
	    { IdConferencia: 1, TituloConferencia: 'Conferencia 1', FxInicio: new Date('01 Jan 2015 10:00') , FxFin: new Date('01 Jan 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '1'},
    	{ IdConferencia: 2, TituloConferencia: 'Conferencia 2', FxInicio: new Date('01 Jan 2015 11:00') , FxFin: new Date('01 Jan 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '1'},
    	{ IdConferencia: 3, TituloConferencia: 'Conferencia 3', FxInicio: new Date('01 Jan 2015 12:00') , FxFin: new Date('01 Jan 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '1'},
    	{ IdConferencia: 4, TituloConferencia: 'Conferencia 4', FxInicio: new Date('01 Feb 2015 11:00') , FxFin: new Date('01 Feb 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '2'},
    	{ IdConferencia: 5, TituloConferencia: 'Conferencia 5', FxInicio: new Date('01 Feb 2015 12:00') , FxFin: new Date('01 Feb 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '2'},
    	{ IdConferencia: 6, TituloConferencia: 'Conferencia 6', FxInicio: new Date('01 Feb 2015 13:00') , FxFin: new Date('01 Feb 2015 14:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '2'},
    	{ IdConferencia: 7, TituloConferencia: 'Conferencia 7', FxInicio: new Date('01 Mar 2015 10:00') , FxFin: new Date('01 Mar 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '3'},
    	{ IdConferencia: 8, TituloConferencia: 'Conferencia 8', FxInicio: new Date('01 Mar 2015 11:00') , FxFin: new Date('01 Mar 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '3'},
    	{ IdConferencia: 9, TituloConferencia: 'Conferencia 9', FxInicio: new Date('01 Mar 2015 12:00') , FxFin: new Date('01 Mar 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '3'},
    	{ IdConferencia: 10, TituloConferencia: 'Conferencia 10', FxInicio: new Date('01 Apr 2015 10:00') , FxFin: new Date('01 Apr 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '4'},
    	{ IdConferencia: 11, TituloConferencia: 'Conferencia 11', FxInicio: new Date('01 Apr 2015 11:00') , FxFin: new Date('01 Apr 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '4'},
    	{ IdConferencia: 12, TituloConferencia: 'Conferencia 12', FxInicio: new Date('01 Apr 2015 12:00') , FxFin: new Date('01 Apr 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '4'},
    	{ IdConferencia: 13, TituloConferencia: 'Conferencia 13', FxInicio: new Date('01 May 2015 10:00') , FxFin: new Date('01 May 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '5'},
    	{ IdConferencia: 14, TituloConferencia: 'Conferencia 14', FxInicio: new Date('01 May 2015 11:00') , FxFin: new Date('01 May 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '5'},
    	{ IdConferencia: 15, TituloConferencia: 'Conferencia 15', FxInicio: new Date('01 May 2015 12:00') , FxFin: new Date('01 May 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '5'},
    	{ IdConferencia: 16, TituloConferencia: 'Conferencia 16', FxInicio: new Date('01 Jun 2015 10:00') , FxFin: new Date('01 Jun 2015 11:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '6'},
    	{ IdConferencia: 17, TituloConferencia: 'Conferencia 17', FxInicio: new Date('01 Jun 2015 11:00') , FxFin: new Date('01 Jun 2015 12:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '6'},
    	{ IdConferencia: 18, TituloConferencia: 'Conferencia 18', FxInicio: new Date('01 Jun 2015 12:00') , FxFin: new Date('01 Jun 2015 13:00'), Tema: 'Tema', Sala: 'Sala', IdEvento: '6'}
  	]};

  	for (i = 0; i < conferencias.conferencias.length; i++) { 
    	if (conferencias.conferencias[i].IdConferencia == IdConferencia){
    		conferencia = conferencias.conferencias[i];
    	}
	}

  	res.json(conferencia);
	
});

app.listen(3000);