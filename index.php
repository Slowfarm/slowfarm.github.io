<!doctype html>
<html lang="ru">
	<style>
		#myProgress {
		  position: relative;
		  width: 100%;
		  height: 30px;
		  background-color: #ddd;
		}
		
		#myBar {
		  position: absolute;
		  width: 0%;
		  height: 100%;
		  background-color: #4CAF50;
		}
		
		#label {
		  text-align: center;
		  line-height: 30px;
		  color: white;
		}
	</style>
	<head>
		<title>Посты пользователя vk</title>
		<script src="//vk.com/js/api/openapi.js?117" type="text/javascript"></script>
		<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	</head>
	<body>
		<input type="text" class="form-control" id="inputGroups" placeholder="Введите id сообществ" value="74217493,62269959,90145873">
		<input type="button" value="Найти" onclick="login();">
		<input type="button" value="Войти" onclick="oAuth();">
		<div id="wallInfo"></div>
		<div id="myProgress">
		<div id="myBar">
			<div id="label">0%</div>
			</div>
		</div>
		<div id="wall"></div>
		
		<script type="text/javascript">
			VK.init({
  			apiId: 5322127
			});
			
			var wallInfoStream = document.getElementById('wallInfo');
			var wallStream = document.getElementById('wall');
			var separator = "<hr>";
			var groups;
			var groups_id;
			var index = 0;
			var access = false;
			var groups_count = 0;
			var offset;
			
			function oAuth(){
				document.location.href = "https://oauth.vk.com/authorize?client_id=5322127&display=page&redirect_uri=http://slowfarm.github.io&scope=groups&response_type=code&v=5.50";
			}
			
			function login(){
			var tmp = new Array();
 			var param = new Array();
 			var get = location.search;  // строка GET запроса
 				if(get != '') {
 					tmp = (get.substr(1)).split('&');   // разделяем переменные
 					tmp = tmp[0].split('=');       // массив param будет содержать
 					param[tmp[0]] = tmp[1];       // пары ключ(имя переменной)->значение
 					}
 			if(param["code"])
 				access=true;
			if(access){
				wallInfoStream.innerHTML = "";
				wallStream.innerHTML = "";
				move(0);
				groups = document.getElementById('inputGroups').value;// получение списка сообществ
				groups_id = groups.split(',');
				groups_count = groups_id.length;
				main();
				}
			else {
				alert("Прежде чем использовать модуль нажмите Войти");
			}
			}
			
			function main() { // получаем список id сообществ
				if(index < groups_count) {
					var owner_id = "-"+groups_id[index];
					delay(500);
					index++;
					offset = 0;
					wallSearch(owner_id);
				}
				else {
					index=0;
					//alert("complete");
				}
			}
			
			 
			function wallSearch(group_id) {// записей пользователя по сообществу
				delay(334);
				var code='var posts = API.wall.get({"owner_id": '+group_id+', "v": "5.27", "count": "100", "offset": '+offset+'}).items;'
					+'return posts;'
					
				VK.Api.call('execute', {code: code, v: '5.37'}, function(data){
					  if (data.response) {
					  	var dataCount = data.response.length;
					  	for (var i=0; i<dataCount; i++) {
					  		wallStream.innerHTML+="<b>Идентификатор записи: </b>"+data.response[i].id+"<br>";
					  		wallStream.innerHTML+="<b>Идентификатор сообщества: </b>"+data.response[i].owner_id+"<br>";
					  		if(typeof data.response[i].signer_id !== 'undefined')
					  			wallStream.innerHTML+="<b>Владелец записи: </b>"+data.response[i].signer_id+"<br>";
					  		else
					  			wallStream.innerHTML+="<b>Владелец записи: </b>"+data.response[i].owner_id+"<br>";
					  		wallStream.innerHTML+=""+data.response[i].text.substr(0, 50)+"..."+separator;
					  	}
					  	if(dataCount==100) {
					  		offset+=100;
							wallSearch(group_id);
					  	}
						else {
						move(index/groups_count*100);
					  	main();
						}
					  }
					  else {
					  	alert(data.error.error_msg+ "(Введен неверный идентификатор)");
					  }
				});
			}
			function delay(ms) { // создаем задержку
			      ms = parseInt(ms); 
			      if (ms <= 0) return; 
			      var before = after = new Date(); 
			      before = before.getTime(); 
			      after = after.getTime(); 
			      while (after < before + ms) { 
			            after = new Date(); 
			            after = after.getTime(); 
			      } 
			}
			function move(width) { // функция смещения progress bar
				var elem = document.getElementById("myBar");   
				elem.style.width = width + '%'; 
				document.getElementById("label").innerHTML = Math.round(width) * 1  + '%';
			}
		</script>
	</body>
</html>
