<?php
$sdd_db_host='localhost'; 
$sdd_db_name='mysql'; 
$sdd_db_user='mysql'; 
$sdd_db_pass='';
@mysql_connect($sdd_db_host,$sdd_db_user,$sdd_db_pass); 
@mysql_select_db($sdd_db_name); // выбор бд
$result=mysql_query('SELECT * FROM `myjson`');
$str = "[";
while($row = mysql_fetch_array($result))
$str = $str.'{"author":"'.$row[author].'","label":"'.$row[label].'"},';
$str = substr($str,0,-1);
$str = $str.']';
echo $str;
?>
