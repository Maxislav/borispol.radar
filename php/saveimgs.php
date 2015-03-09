<?php
date_default_timezone_set("UTC");

echo (date("Y/m/d-H:i")).'<br/>';
$url = 'http://www.sat24.com/image2.ashx?region=eu&time=201411291945&ir=true';

//$urlBefore = 'http://www.sat24.com/image2.ashx?region=eu&time=';
//$DateOfRequest = $DateOfRequest = date("Y-m-d H:i:s", strtotime($_REQUEST["DateOfRequest"]));


$path ='../img/sat/'. date("YmdH").'00.gif';
file_put_contents($path, file_get_contents($url));

$dir = '../img/sat/';

$f = scandir($dir);
$arrayImgs = array();

foreach ($f as $file){
    if(preg_match('/\.(gif)/', $file)){
        array_push($arrayImgs, $file);
       // echo $file.'<br/>';
    }
}
echo dirname(__FILE__).'/'.'<br/>';
$delSplice = count($arrayImgs)-24;
if(0 < $delSplice){
    array_splice($arrayImgs,$delSplice);

    foreach($arrayImgs as $file){
        $path = dirname(__FILE__).'/'.$dir.$file;
        unlink($path);
        print_r(error_get_last());
        echo $path.'<br/>';
    }

}

