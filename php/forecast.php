<?php
/**
 * Created by PhpStorm.
 * User: Администратор
 * Date: 9/27/15
 * Time: 8:22 PM
 */
$str = file_get_contents('http://api.openweathermap.org/data/2.5/forecast?q=Kiev,ua&units=metric&mode=json');
//$str = file_get_contents('http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json');
$json = json_decode($str, true);
echo $str;
?>