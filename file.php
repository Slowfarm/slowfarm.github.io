$sdd_db_host=''; // ваш хост
$sdd_db_name=''; // ваша бд
$sdd_db_user=''; // пользователь бд
$sdd_db_pass=''; // пароль к бд
@mysql_connect($sdd_db_host,$sdd_db_user,$sdd_db_pass); // коннект с сервером бд
@mysql_select_db($sdd_db_name); // выбор бд
$result=mysql_query('SELECT * FROM `table_name`'); // запрос на выборку
while($row=mysql_fetch_array($result))
{
echo '<p>Запись id='.$row['id'].'. Текст: '.$row['text'].'</p>';// выводим данные
}
