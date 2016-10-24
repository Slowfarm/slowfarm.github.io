<!doctype html>
<html lang="ru">
	<head>
		<title>Посты пользователя vk</title>
	</head>
	<body>
		<?php
			require 'vkapi.class.php'; // Подключаем класс
			$api_id = '5322127'; // ID приложения
			$vk_id = '182740114'; // ID аккаунта
			$VK = new vkapi($api_id, $vk_id);
			$resp = $VK->api('audio.search', 
				array('q'=>'The Beatles','auto_complete'=>'1','sort'=>'2', 'count'=>'25'));
			echo '<pre>'; 
			print_r($resp);
			echo '</pre>'; 
		?>
	</body>
</html>
