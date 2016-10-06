<?php 
// Get Data 
$name = strip_tags($_POST['name']);
$tel = strip_tags($_POST['telephone']);
$text = strip_tags($_POST['text']);
$email = strip_tags($_POST['email']);
// Send Message

	mail( "Olviya15@yandex.ru,bis-idea2015@ya.ru", "Ольвия",
"Имя: $name\nТелефон: $tel\nПочта: $email\nОтправлено из формы: $text",
"From: <olviya@site.ru>" );

// $a = "Имя:$name";
// //$a = $_GET["id"];
// $b = 'http://t89999893162:543185@api.prostor-sms.ru/messages/v2/send/?phone=%2B79999897835&text=';

// //file('http://t89999893162:543185@api.prostor-sms.ru/messages/v2/send/?phone=%2B79999897835&text=Имя:$name\n$tel\nОтправлено из формы:$text'); 
// file($b . $a);   Olviya15@yandex.ru