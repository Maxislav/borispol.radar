<?php
/*$connect = array(
    'login' => 'u421137053_root',
    'pass' => 'glider',
    'host' => 'mysql.hostinger.com.ua',
    'table' => 'u421137053_1',
);*/
$connect = array(
    'login' => 'root',
    'pass' => 'astalavista',
    'host' => 'localhost',
    'table' => 'borispol',
);
$db = mysql_connect($connect['host'], $connect['login'], $connect['pass']) //соединение с базой данных
or die('connect to database failed');
$table = $connect['table'];
mysql_select_db($table) or die('db not found');
mysql_query("SET NAMES utf8");

$ip = $_SERVER['REMOTE_ADDR']?:($_SERVER['HTTP_X_FORWARDED_FOR']?:$_SERVER['HTTP_CLIENT_IP']);
date_default_timezone_set("UTC");
$timestamp = ''.date("Y-m-d H:i:s");
$timestamp = trim($timestamp);


$sql = 'INSERT INTO borispol '.
    '(id,value, ip, date) '.
    'VALUES ( "NULL", "1", "'.$ip.'", "'.$timestamp.'" )';
$retval = mysql_query( $sql, $db );
if(! $retval )
{
    die('Could not enter data: ' . mysql_error());
}
echo "Entered data successfully\n";







echo 'OK';