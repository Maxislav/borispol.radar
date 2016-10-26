<?php

$z= $_GET["z"];
$x = $_GET["x"];
$y = $_GET["y"];

header('Content-type: image/jpeg');
echo file_get_contents("https://maps.owm.io/current/CLOUDS_STYLE/".$z."/".$x."/".$y."?appid=b1b15e88fa797225412429c1c50c122a1");
//echo "https://maps.owm.io/current/CLOUDS_STYLE/".$z."/".$x."/".$y."?appid=b1b15e88fa797225412429c1c50c122a1";
//echo "https://maps.owm.io/current/CLOUDS_STYLE/".$z."/".$x."/".$y."?appid=b1b15e88fa797225412429c1c50c122a1";
?>