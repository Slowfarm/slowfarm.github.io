VK.init({
    apiId: 5322127 
});

var membersGroups = [];
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
	var code ='var posts;'
		+'var j=0;'
		+'var i=0;'
		+'var output = null;'
		+'var separator;'
		+'while (j!=2500)'
		+'{'
		+    'posts = API.wall.get({"owner_id": -33509, "v": "5.27", "count": "100", "offset": j}).items;'
		+    'j = j+100;'
		+    'while (i!=100)'
		+    '{'
		+        'output = output+posts[i].text;'
		+        'i=i+1;'
		+    '}'
		+'}'
		+'return output;'; // вернуть массив members
	
	VK.Api.call("execute", {code: code}, function(data) {
		if (data.response) {
			for(var i=0; i< 2500; i++)
			{
				membersGroups[counter+i] = data.response[i].text; 
			$('.member_ids').html('Загрузка: ' + data.response[i].text + '/' + members_count);
			}
			if (members_count >  counter) {
				counter+=2500;
				setTimeout(function() { getMembers20k(group_id, members_count); }, 333); 
			}
			else 
				alert('Ура тест закончен! В массиве membersGroups теперь ' + counter + ' элементов.');
		} else {
			alert(data.error.error_msg); 
		}
	});
}
