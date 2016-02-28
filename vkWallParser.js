VK.init({
    apiId: 5322127
});
var id;
newUrl();
query();
alert("кек");
function query() {
	VK.Api.call('wall.get', {owner_id: id, v: '5.27', count: 1000}, function(r) {
		if(r.response) {
			$('.group_text')
			.html(r.response.items[i].id+'<br/>'
			+ r.response.items[i].text+'<br/>'
			+ '<a href="http://vk.com/wall' + id + '_' + r.response.items[i].id + '</a><br/>'
			);
				}
		}
	});
}
function newUrl() {
	var user_id = "http://vk.com/miet.university";
	if (user_id.indexOf("com/") >= 0)
		user_id = user_id.split('com/')[1];
	VK.Api.call('utils.resolveScreenName', {screen_name: user_id, v: '5.27'}, function(r) {
		if(r.response) {
			addGroup(user_id);
		}
	});	
}
function addGroup(user_id) {
	VK.Api.call('groups.getById', {group_id: user_id, fields: 'photo_50', v: '5.27'}, function(r) {
			if(r.response) {
					id = '-' + r.response[0].id;
					$('.group_info')
				.html('<img src="' + r.response[0].photo_50 + '"/><br/>' 
					+ r.response[0].id+'<br/>'+
					+ r.response[0].name+'<br/>'+
					+ 'CLUB' + r.response[0].id+'<br/>');
			}
	});
}
