VK.init({
    apiId: 5322127
});
var id;
var members_count;
var membersGroups = []; 
var user_id = "http://vk.com/miet.university";
if (user_id.indexOf("com/") >= 0)
	user_id = user_id.split('com/')[1];
addGroup();
function query() {
		var code = 'var members = API.wall.get({"owner_id": '+ id+ ', "v": "5,27", "count": "1000", "offset": ' + membersGroups.length +'}).items;'
		+	'var offset = 1000;'
		+	'while (offset < 25000 && (offset + '+ membersGroup.length+') <' + members_count+ ')'
		+	'{'
		+		'members = members + "," + API.wall.get({"owner_id": ' + id + ', "v": "5.27",  "count": "1000", "offset": (' + membersGroups.length + ' + offset)}).items;'
		+		'offset = offset + 1000;'
		+	'}'
		+	'return members;';
	
	VK.Api.call("execute", {code: code}, function(data) {
		if(data.response) {
			membersGroups = membersGroups.concat(JSON.parse("[" + data.response + "]"));
				$('#result').append('Загрузка: ' + membersGroups.length + '/' + members_count);
				if (members_count >  membersGroups.length)
				setTimeout(function() { query(); }, 333); 
			else
				alert('Ура тест закончен! В массиве membersGroups теперь ' + membersGroups.length + ' элементов.');
		}
	});
	
}
function addGroup() {
	VK.Api.call('groups.getById', {group_id: user_id, fields: 'photo_50', v: '5.27'}, function(r) {
			if(r.response) {
					id = '-' + r.response[0].id;
					members_count = r.response[0].members_count;
					$('#profiles').html(''
								+ '<li class="c-list user' + r.response[0].id + ' pulse animated">'
								+ '<div class="contact-pic">'
								+ '<a href="#"><img src="' + r.response[0].photo_50 + '" alt="" class="img-responsive"/></a>'
								+ '</div>'
								+ r.response[0].name
								+' CLUB' + r.response[0].id
								+ '<a href="http://vk.com/club' + r.response[0].id + '" class="btn btn-success btn-xs" target="_blank"><span class="glyphicon glyphicon-link"></span></a>'
								+ '</li>');
			}
	});
	query();
}
