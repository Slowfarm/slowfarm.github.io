VK.init({
    apiId: 5322127
});
var membersGroups = []; 
var user_id = "http://vk.com/miet.university";
if (user_id.indexOf("com/") >= 0)
	user_id = user_id.split('com/')[1];

var membersGroups = []; // массив участников группы
getMembers(20629724);

// получаем информацию о группе и её участников
function getMembers(group_id) {
	VK.Api.call('groups.getById', {group_id: group_id, fields: 'photo_50,members_count', v: '5.27'}, function(r) {
			if(r.response) {
				$('.group_info')
				.html('<img src="' + r.response[0].photo_50 + '"/><br/>' 
					+ r.response[0].name
					+ '<br/>Участников: ' + r.response[0].members_count);
				getMembers20k(group_id, r.response[0].members_count); // получем участников группы и пишем в массив membersGroups
			}
	});
}

// получаем участников группы, members_count - количество участников
function getMembers20k(group_id, members_count) {
	var code =  'var members = API.wall.get({"group_id": ' + group_id + ', "v": "5.27", "count": "100", "offset": ' + membersGroups.length + '}).items;' // делаем первый запрос и создаем массив
			+	'var offset = 100;' // это сдвиг по участникам группы
			+	'while (offset < 2500 && (offset + ' + membersGroups.length + ') < ' + members_count + ')' // пока не получили 20000 и не прошлись по всем участникам
			+	'{'
				+	'members = members + "," + API.wall.get({"group_id": ' + group_id + ', "v": "5.27", "count": "100", "offset": (' + membersGroups.length + ' + offset)}).items;' // сдвиг участников на offset + мощность массива
				+	'offset = offset + 100;' // увеличиваем сдвиг на 1000
			+	'};'
			+	'return members;'; // вернуть массив members
	alert("до execute");
	VK.Api.call("execute", {code: code}, function(data) {
		if (data.response) {
			membersGroups = membersGroups.concat(JSON.parse("[" + data.response + "]")); // запишем это в массив
			$('.members_ids').html('');
			$('.member_ids').append('Загрузка: ' + membersGroups.length + '/' + members_count);
			if (members_count >  membersGroups.length) // если еще не всех участников получили
				setTimeout(function() { getMembers20k(group_id, members_count); }, 333); // задержка 0.333 с. после чего запустим еще раз
			else // если конец то
				alert('Ура тест закончен! В массиве membersGroups теперь ' + membersGroups.length + ' элементов.');
		} else {
			alert(data.error.error_msg); // в случае ошибки выведем её
		}
		alert("во время");
	});
}
