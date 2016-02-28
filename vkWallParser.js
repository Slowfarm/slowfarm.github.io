VK.init({
    apiId: 5322127
});
var id;
newUrl();
query();
function query() {
	VK.Api.call('wall.get', {owner_id: id, v: '5.27', count: 1000}, function(r) {
		if(r.response) {
			$('#resultCount').html(r.response.count);
				$('#profiles').append('');
				for (var i=0; i<r.response.count; i++)
				{
					$('#profiles').append(''
								+ '<li class="c-list user' + r.response.items[i].id + ' pulse animated">'
								+ '<div class="contact-details">'
								+ '<div class="pull-left">'
								+ r.response.items[i].text
								+ '</div>'
								+ '<div class="pull-right">'
								+ '<a href="http://vk.com/wall' + id + '_' + r.response.items[i].id + '" class="btn btn-success btn-xs" target="_blank"></a>'
								+ '</div>'
								+ '<div class="clearfix"></div>'
								+ '</div>'
								+ '</li>');
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
					$('#profiles').html(''
								+ '<li class="c-list user' + r.response[0].id + ' pulse animated">'
								+ '<div class="contact-pic">'
								+ '<a href="#"><img src="' + r.response[0].photo_50 + '" alt="" class="img-responsive"/></a>'
								+ '</div>'
								+ '<div class="contact-details">'
								+ r.response[0].name
								+' CLUB' + r.response[0].id
								+ '<a href="http://vk.com/club' + r.response[0].id + '" class="btn btn-success btn-xs" target="_blank"><span class="glyphicon glyphicon-link"></span></a>'
								+ '<div class="clearfix"></div>'
								+ '</div>'
								+ '</li>');
			}
	});
}
