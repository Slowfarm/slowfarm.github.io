VK.init({
    apiId: 5322127
});
var user_id = "http://vk.com/miet.university";
if (user_id.indexOf("com/") >= 0)
	user_id = user_id.split('com/')[1];
getMembers(20629724);

// получаем информацию о группе и её участников
function getMembers(group_id) {
	VK.Api.call('groups.getById', {group_id: group_id, fields: 'photo_50,members_count', v: '5.27'}, function(r) {
			if(r.response) {
				id = '-' + r.response[0].id;
				$('.group_info')
				.html('<img src="' + r.response[0].photo_50 + '"/><br/>' 
					+ r.response[0].name
					+ '<br/>Участников: ' + r.response[0].members_count);
				getMembers20k();
			}
	});
	alert("it works");
}

// получаем участников группы, members_count - количество участников
function getMembers20k() {
	var code;
	code = 'return {';
	code += 'data: API.wall.get({group_id: -33509, offset: 0, count: 100, filter: all, v: "5.37"})';
	code += '};';
// сам метод execute, выполняет созданный код
	VK.Api.call('execute', {code: code, v: "5.37"}, function(r){
	 if (r.response){
	   if (r.response.data){
	   		$('.member_ids').html('Загрузка: ' + r.response.data);
      			}
  		}
	}
	alert("it works");
}
