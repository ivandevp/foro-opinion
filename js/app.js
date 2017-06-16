var api = {
	url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var plantillaTema = "<tr>" +
					"<td><a href='topic.html?topic_id=__id__'>__contenido__</a></td>" +
					"<td>__autor__</td>" +
					"<td>__respuestas__</td>" +
					"</tr>";

var contenedorTemas = document.getElementById("temas");

var arregloTemas = [];

superagent
   .get(api.url)
   .end(function(err, res){
   		var temas = res.body;
   		arregloTemas = temas;
   		temas.forEach(mostrarTema);
   });

var cargarPagina = function () {
	var agregarFormulario = document.getElementById("agregar-formulario");
	var buscarFormulario = document.getElementById("buscar-formulario");
	agregarFormulario.addEventListener("submit", nuevoTema);
	buscarFormulario.addEventListener("submit", filtrarTema);
};

var mostrarTema = function (tema) {
	var temaHTML = plantillaTema.replace("__id__", tema.id)
			.replace("__contenido__", tema.content)
			.replace("__autor__", tema.author_name)
			.replace("__respuestas__", tema.responses_count);
	contenedorTemas.innerHTML = temaHTML + contenedorTemas.innerHTML;
};

var nuevoTema = function (e) {
	e.preventDefault();
	var autor = document.getElementById("autor").value;
	var contenido = document.getElementById("contenido").value;

	var data = $("#agregar-formulario").serialize();
	console.log(data);
	
	superagent.post(api.url)
	    .send({ author_name: autor, content: contenido })
	    .end(function (err, res) {
	    	var tema = res.body;
	    	tema.responses_count = 0;
	    	mostrarTema(tema);
	    	$(".modal").modal("hide");
	    });
};

var filtrarTema = function (e) {
	e.preventDefault();
	var filtro = document.getElementById("busqueda").value.toLowerCase();
	var temasFiltrados = arregloTemas.filter(function (tema) {
		return tema.content.toLowerCase().indexOf(filtro) >= 0;
	});
	contenedorTemas.innerHTML = "";
	temasFiltrados.forEach(mostrarTema);
};

document.addEventListener("DOMContentLoaded", cargarPagina);

















