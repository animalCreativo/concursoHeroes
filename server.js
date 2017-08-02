var express = require('express'); // se usa para levantar un server
var app = express();

app.set('view engine','pug');     //maneja las vistas en view

app.use(express.static('public'));  // busca el css y los assests en public
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
// define las rutas de navegacion de la web lado cliente
app.get('/',function(req,res){   // busca index en view (pug)
	res.render('index', {
		title: 'Concurso Home'
	});
})
/*
app.get('/signup',function(req,res){
	res.render('index',{
		title: 'Platzigram-SignUp'
	});
})
app.get('/signin',function(req,res){
	res.render('index',{ 
		title: 'Platzigram-SignIn'
	});
})*/

//levanta el puerto para run server

app.listen(8080, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('Platzigram escuchando en el puerto 8080');
}) 