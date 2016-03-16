VK.init({
    apiId: 5322127 
});

var membersGroups = [];
var counter =0;
getMembers(20629724);


function getMembers(group_id) {
	VK.Api.call('groups.getById', {group_id: group_id, fields: 'photo_50,members_count', v: '5.27'}, function(r) {
			if(r.response) {
				$('.group_info')
				.html('<img src="' + r.response[0].photo_50 + '"/><br/>' 
					+ r.response[0].name
					+ '<br/>Участников: ' + r.response[0].members_count);
				getMembers20k(group_id, r.response[0].members_count); 
			}
	});
}

function getMembers20k(group_id, members_count) {
	var code =  'var members = API.wall.get({"owner_id": -' + group_id + ', "v": "5.27", "count": "1000", "offset": ' + counter + '}).items;' 
			+	'var offset = 100;' // это сдвиг по участникам группы
			+	'while (offset < 2500 && (offset + ' + counter + ') < ' + members_count + ')' 
			+	'{'
				+	'members = members + "," + API.wall.get({"owner_id": -' + group_id + ', "v": "5.27", "count": "100", "offset": (' + counter + ' + offset)}).items;' 
				+	'offset = offset + 100;' 
			+	'};'
			+	'return members;'; // вернуть массив members
	
	VK.Api.call("execute", {code: code}, function(data) {
		if (data.response) {
			for(var i=0; i< 2500; i++)
				membersGroups = membersGroups + data.response[i].text; 
			$('.member_ids').html('Загрузка: ' + counter + '/' + members_count);
			if (members_count >  counter) 
				counter+=100;
				setTimeout(function() { getMembers20k(group_id, members_count); }, 333); 
			else 
				alert('Ура тест закончен! В массиве membersGroups теперь ' + counter + ' элементов.');
		} else {
			alert(data.error.error_msg); 
		}
	});
}
