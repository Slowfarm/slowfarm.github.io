<html>
 <head>
   <title>PHP</title>
 </head>
<body>
 <?php
 $sdd_db_host='178.208.81.185'; // ваш хост
 $sdd_db_name='vova_test'; // ваша бд
 $sdd_db_user='vova_test'; // пользователь бд
 $sdd_db_pass='admin123'; // пароль к бд
 @mysql_connect($sdd_db_host,$sdd_db_user,$sdd_db_pass); // коннект с сервером бд
 @mysql_select_db($sdd_db_name); // выбор бд
 $result=mysql_query('SELECT * FROM `test_table`'); // запрос на выборку
 while($row=mysql_fetch_array($result))
 { 
 echo '<p>Запись id='.$row['id'].'. Текст: '.$row['text'].'</p>';// выводим данные
 }
 ?>
</body>
</html>
