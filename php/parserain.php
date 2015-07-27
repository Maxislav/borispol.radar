<?php
date_default_timezone_set("UTC");

//echo (date("Y/m/d-H:i")).'<br/>';
$url = 'http://meteoinfo.by/radar/UKBB/UKBB_latest.png';
//$content = file_get_contents(urlencode($url));
$image = file_get_contents($url) or die('Could read create file: ' . $path);
$size = getimagesize($url);
list($width, $height, $type, $attr) = $size;



$im = imagecreatefrompng($url);
$rgb = imagecolorat($im, 10, 15);

$colors = imagecolorsforindex($im, $rgb);

echo $colors["red"];
//var_dump($colors);




if($image) {

    $im = new Imagick();

    $im->readImageBlob($image);
    $size = getimagesize($im);
    echo  $size;


}

$x = 1;
$y = 1;
$pixel = $image->getImagePixelColor($x, $y);

$colors = $pixel->getColor();

echo  $colors;

$path ='../img/sat/'. date("YmdH").'00.gif';

$file = fopen($path,'w') or die('Could not create file: ' . $path);
chmod($fileName, 0777);
fclose($file);

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

