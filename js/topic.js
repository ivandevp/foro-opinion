/**
 * @param String name
 * @return String
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var topicId = getParameterByName("topic_id");

var api = {
	url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topicId
};

superagent
	.get(api.url)
	.end(function (err, res) {
		var tema = res.body;
		document.getElementById("contenido").textContent = tema.content;
		document.getElementById("autor").textContent = tema.author_name;
		document.getElementById("fecha").textContent = tema.created_at;
	});






