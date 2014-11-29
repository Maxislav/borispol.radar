<?php

$url = 'http://www.sat24.com/image2.ashx?region=eu&time=201411291945&ir=true';

$urlBefore = 'http://www.sat24.com/image2.ashx?region=eu&time=';
$DateOfRequest = $DateOfRequest = date("Y-m-d H:i:s", strtotime($_REQUEST["DateOfRequest"]));
$path ='../img/sat/'. date("YmdH").'00.gif';
file_put_contents($path, file_get_contents($url));
date_default_timezone_set("UTC");
echo (date("Ymd-H:i"));