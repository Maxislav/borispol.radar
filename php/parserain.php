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
for($x = 0; $x<500; $x++){
    for($y=0; $y<479; $y++){
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
                "color"=>$colors["red"]." ".$colors["green"]." ".$colors["blue"],
                "dist"=>$dist
            );
        }
    }
}


ksort($arrayDist);
$sortArr = array();

$type = array();

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
    if(!$type[$va["color"]]){
        $type[$va["color"]] = $val;
    }
}

//echo json_encode($sortArr[0]);
echo json_encode($sortArr);