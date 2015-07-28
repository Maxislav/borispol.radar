<?php
date_default_timezone_set("UTC");

//echo (date("Y/m/d-H:i")).'<br/>';
$url = 'http://meteoinfo.by/radar/UKBB/UKBB_latest.png';
//$content = file_get_contents(urlencode($url));
$image = file_get_contents($url) or die('Could read create file: ' . $path);
$size = getimagesize($url);
list($width, $height, $type, $attr) = $size;



$im = imagecreatefrompng($url);
//$rgb = imagecolorat($im, 10, 15);
$kiev = array(
    "x"=> 211,
    "y"=>231
);
$scaleFactor = 400/468;

$arrayDist = array();
for($x = 10; $x<500; $x++){
    for($y=0; $y<470; $y++){
        $rgb = imagecolorat($im, $x, $y);
        $colors = imagecolorsforindex($im, $rgb);
        if($colors["red"]!=$colors["green"]){
           // echo $colors["red"]." ".$colors["green"]." ".$colors["blue"]." xy: ";
           // echo $x." ".$y."";
           $distPx = sqrt(pow($x - $kiev["x"], 2) + pow($y - $kiev["y"], 2));
           //$distPx = sqrt(pow(10, 2) + pow(10, 2));
            $dist = $distPx*$scaleFactor;
            //echo " distance ".$dist ."</br>";
            /*array_push($arrayDist, array(
                $dist => $colors["red"]." ".$colors["green"]." ".$colors["blue"]
            ));*/
           // array_push($arrayDist, ("a"=>$dist));

            //$arrayDist[$dist] =  $colors["red"]." ".$colors["green"]." ".$colors["blue"];
            $arrayDist[$dist] = array(
                //"color"=>$colors["red"]." ".$colors["green"]." ".$colors["blue"],
                "color"=>(toHex($colors["red"]).toHex($colors["green"]).toHex($colors["blue"])),
                "intensity"=>getIntensity(toHex($colors["red"]).toHex($colors["green"]).toHex($colors["blue"])),
                "dist"=>round($dist, 1, PHP_ROUND_HALF_EVEN),
                "xy"=> $x." ".$y
            );
        }
    }
}


ksort($arrayDist);
$sortArr = array();

$type = array();
$arrayResult = array();

foreach ($arrayDist as $key => $val) {
   // echo "$key = $val</br>";
   // echo "$key = ";

    /*foreach ($val as $k => $v){
        echo "$k = $v ";
    }*/

  // $type[$val["color"]]

    array_push($sortArr,$val );
   // echo "dist = " .$val["dist"]. " color = ". $val["color"];
   // echo "</br>";
}
echo "</br>";

foreach($sortArr as $key=>$val){
    if(!checkExist($type, $val["color"])){
        array_push($type, $val["color"]);
        array_push($arrayResult, $val);
    }

   /* echo "$key = ".$val["color"].";" ;
    if(!$type[$va["color"]]){
        $type[$va["color"]] = $val;
    }*/
}

function getIntensity($color){
    switch($color){
        case '4793F7':
        case '4793F8':
            return 6;
        case '9BE1FF':
            return 5;
        case 'DDA8FF':
            return 15;
        case '9BEA8F':
            return 2;
        default:
            return 0;
    }
}

function checkExist($type, $_val){
    foreach($type as $key=>$val){
        if($_val == $val){
            return true;
        }
    }
    return false;
}
echo json_encode($arrayResult);
//echo json_encode($sortArr[0]);
//echo json_encode($sortArr);

function toHex($n) {
    $n = intval($n);
    if (!$n)
        return '00';

    $n = max(0, min($n, 255)); // make sure the $n is not bigger than 255 and not less than 0
    $index1 = (int) ($n - ($n % 16)) / 16;
    $index2 = (int) $n % 16;

    return substr("0123456789ABCDEF", $index1, 1)
    . substr("0123456789ABCDEF", $index2, 1);
}