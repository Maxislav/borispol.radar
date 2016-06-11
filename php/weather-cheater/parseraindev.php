<?php
/**
 * логирование в текстовый файл
 */
require_once 'file-write.php';
$fileWriter = new FileWrite(${'_' . $_SERVER['REQUEST_METHOD']});
$fileWriter ->write();

date_default_timezone_set("UTC");

$url = 'http://meteoinfo.by/radar/UKBB/UKBB_latest.png';
$image = file_get_contents($url) or die('Could read create file: ' . $path);
$size = getimagesize($url);
list($width, $height, $type, $attr) = $size;


$im = imagecreatefrompng($url);
//$rgb = imagecolorat($im, 10, 15);


/**
 * Центр  "256, 239"
 * радиус срелки 65
 *
 * уравнение круга
 * (x – a)2 + (y – b)2 = R2 ;
 *
 *
 *
 */

$R = 65;

$a = 0;

$isRainy = false;

$arrDegWind = array();
for ($a = 0; $a < 90; $a++) {
    $y = 239 - ($R * cos(deg2rad($a)));
    $x = 256 + ($R * sin(deg2rad($a)));
    $_a = showDiv($im, $x, $y, $a);
    if ($_a != null) {
        array_push($arrDegWind, $_a);
    }
}

for ($a = 0; $a < 90; $a++) {
    $y = 239 + ($R * sin(deg2rad($a)));
    $x = 256 + ($R * cos(deg2rad($a)));
    $_a = showDiv($im, $x, $y, $a + 90);
    if ($_a != null) {
        array_push($arrDegWind, $_a);
    }
}
for ($a = 0; $a < 90; $a++) {
    $x = 239 - ($R * sin(deg2rad($a)));
    $y = 256 + ($R * cos(deg2rad($a)));
    $_a = showDiv($im, $x, $y, $a + 180);
    if ($_a != null) {
        array_push($arrDegWind, $_a);
    }
}

for ($a = 0; $a < 90; $a++) {
    $y = 239 - ($R * sin(deg2rad($a)));
    $x = 256 - ($R * cos(deg2rad($a)));
    $_a = showDiv($im, $x, $y, $a + 270);
    if ($_a != null) {
        array_push($arrDegWind, $_a);
    }
}
/**
 * Угол ветра
 */
$degWind = null;
if (0 < count($arrDegWind)) {
    $degWind = array_sum($arrDegWind) / count($arrDegWind);
}

//echo json_encode($arrDegWind);

function showDiv($im, $x, $y, $a)
{
    $x = intval($x);
    $y = intval($y);
    $rgb = imagecolorat($im, $x, $y);
    $colors = imagecolorsforindex($im, $rgb);
    $colorHex = "" . toHex($colors["red"]) . toHex($colors["green"]) . toHex($colors["blue"]);
    //todo для разработки = отображение радиуса
    //echo "<div style='background: #".$colorHex."'>".$colorHex.",".$a."</div>";
    if ($colorHex == "000000") {
        return $a;
    } else {
        return null;
    }

}


/*
for($x = 256-$R; $x<=256+$R;$x++){
    $y = sqrt(pow($R,2)- pow(($x-256),2)) + 239;
    $rgb = imagecolorat($im, $x, $y);
    $colors = imagecolorsforindex($im, $rgb);
    $colorHex = "".toHex($colors["red"]).toHex($colors["green"]).toHex($colors["blue"]);
    //echo "<div style='background: #".$colorHex."'>".$colorHex."</div>";
    echo $colors["red"].",".$colors["green"].",".$colors["blue"]."<br>";
}

for($x = 256+$R; 256-$R<$x;$x--){
    $y = -sqrt(pow($R,2)- pow(($x-256),2)) + 239;
    $rgb = imagecolorat($im, $x, $y);
    $colors = imagecolorsforindex($im, $rgb);
    $colorHex = "".toHex($colors["red"]).toHex($colors["green"]).toHex($colors["blue"]);
   // echo "<div style='background: #".$colorHex."'>".$colorHex."</div>";
    echo $colors["red"].",".$colors["green"].",".$colors["blue"]."<br>";
}*/

//echo $y;


/**
 * 2.0512 -> 151   0.013584106
 * 1.22674 -> 146  0.008400479
 *
 * x0: 27.574518998 -
 * y0: 52.395610649
 *
 * x0: (28.42163 - 27.574518998)/ 0.013584106
 * y0: (52.395610649 -50.25774) / 0.008400479
 *
 *
 * L.marker([52.395610649, 27.574518998]).addTo(map)
 * .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
 *  "x"=> 211,
 * "y"=>231
 */

$lat = 50.44701;
$lng = 30.52002;
if ($_GET["lat"]) {
    $lat = $_GET["lat"];
}
if ($_GET["lng"]) {
    $lng = $_GET["lng"];
}

$kiev = array(
    "x" => ($lng - 27.574518998) / 0.013584106, // 216
    // "x"=> (30.52002 - 27.574518998)/ 0.013584106,
    "y" => (52.395610649 - $lat) / 0.008400479 //50.4551 + (231*0.008400479) 52.395610649
    // "y"=>(52.395610649 -50.44701) / 0.008400479
);
$scaleFactor = 400 / 468;

$arrayDist = array();
$arrayDistId = array();

function isRainyFoo($im){
    for ($x = 10; $x < 500; $x++) {
        for ($y = 10; $y < 470; $y++) {
            $rgb = imagecolorat($im, $x, $y);
            $colors = imagecolorsforindex($im, $rgb);
            if ($colors["red"] !== $colors["green"] && $colors["red"] !== $colors["blue"]) {
                return true;
            }

        }
    }
    return false;
}


for ($x = 10; $x < 500; $x++) {
    for ($y = 10; $y < 470; $y++) {
        $rgb = imagecolorat($im, $x, $y);
        $colors = imagecolorsforindex($im, $rgb);
        $colorHex = "" . toHex($colors["red"]) . toHex($colors["green"]) . toHex($colors["blue"]);
        //echo $colorHex."; ";
        if ($colors["red"] !== $colors["green"] && $colors["red"] !== $colors["blue"]) {

            if($degWind!=null){
                $a;
                $degFind = $degWind -180;
                if($degFind<0){
                    $degFind = $degFind+360;
                }

                $dy = abs($y-$kiev["y"]);
                $dx = abs($x-$kiev["x"]);

                if($kiev["x"]<=$x && $y<=$kiev["y"]){
                    $a =  rad2deg(atan($dx/$dy));
                }else if($kiev["x"]<=$x && $kiev["y"]<$y){
                    $a =  rad2deg(atan($dy/$dx))+90;
                }else if($x<$kiev["x"] && $kiev["y"]<$y){
                    $a = rad2deg(atan($dx/$dy))+180;
                }else if($x<$kiev["x"] && $y<=$kiev["y"]){
                    $a =  rad2deg(atan($dy/$dx))+270;
                }


                if($degFind-15<$a && $a<$degFind+15){
                    //echo $a."<br>";
                    $distPx = sqrt(pow($x - $kiev["x"], 2) + pow($y - $kiev["y"], 2));
                    $dist = intval($distPx * $scaleFactor);
                    array_push($arrayDist, array(
                        "color" => (toHex($colors["red"]) . toHex($colors["green"]) . toHex($colors["blue"])),
                        "colorRgb" => $colors["red"] . " " . $colors["green"] . " " . $colors["blue"],
                        "intensity" => getIntensity($colorHex),
                        "dist" => $dist,
                        "xy" => $x . " " . $y
                    ));
                    array_push($arrayDistId, $dist);
                }


            }else{
                $distPx = sqrt(pow($x - $kiev["x"], 2) + pow($y - $kiev["y"], 2));
                $dist = intval($distPx * $scaleFactor);
                array_push($arrayDist, array(
                    "color" => (toHex($colors["red"]) . toHex($colors["green"]) . toHex($colors["blue"])),
                    "colorRgb" => $colors["red"] . " " . $colors["green"] . " " . $colors["blue"],
                    "intensity" => getIntensity($colorHex),
                    "dist" => $dist,
                    "xy" => $x . " " . $y
                ));
                array_push($arrayDistId, $dist);
            }
            /*  $arrayDist[$dist] = array(
                  //"color"=>$colors["red"]." ".$colors["green"]." ".$colors["blue"],
                  "color"=>(toHex($colors["red"]).toHex($colors["green"]).toHex($colors["blue"])),
                  "colorRgb"=>$colors["red"]." ".$colors["green"]." ".$colors["blue"],
                  "intensity"=>getIntensity($colors["red"], $colors["green"], toHex($colors["blue"])),
                  "dist"=>$dist,
                  "xy"=> $x." ".$y
              );*/
            //echo "<div style='background: #$colorHex; width: 100px; margin-bottom:2px'>#$colorHex</div>"."";
        }
    }
}



array_multisort($arrayDistId, $arrayDist);

$sortArr = array();

$type = array();
$arrayResult = array();

foreach ($arrayDist as $key => $val) {
    if ($val[color]) {
        //echo "<div style='background: #$val[color]; width: 100px; margin-bottom:2px'>#$val[color] $val[dist]</div>"."";
        array_push($sortArr, $val);
    }
}

$arrayNull = array();
foreach ($sortArr as $key => $val) {
    //echo "<div style='background: #$val[color]; width: 40px; height: 40px'></div>".'</br>';
    if (!checkExist($type, $val["color"])) {
        array_push($type, $val["color"]);
        if ($val["intensity"] === null) {
            array_push($arrayNull, $val);
        } else if ($val["intensity"] != 0) {
            array_push($arrayResult, $val);
        }
    }

    /* echo "$key = ".$val["color"].";" ;
     if(!$type[$va["color"]]){
         $type[$va["color"]] = $val;
     }*/
}

function getIntensity($color)
{
    switch ($color) {
        case '9CE890':
        case '9BEB8F':
        case '9BEA8F':
        case '293E26':
        case '679C5F':
        case '5D8C56':
        case '91DB85':
            return 2;
        case '334E2F':
            return 4;
        case '9CE1FF':
        case '9BE1FF':
            return 5;
        case '4894F7':
        case '4E77AD':
        case '4793F8':
        case '4289E8':
        case '3885FA':
        case '3976C7':
        case '3D7FD7':
        case '408cf9':
        case '408CF9':
        case "2C57E8":
        case "3066EE":
        case "4155D8":
        case "2E6BF2":
        case "427FF0":
        case "3D89F9":


            return 6;
        case '0D5EFF':
        case '0C59FF':
        case '1B68FD':
        case '206CFD':
        case '052977':
        case '0841BB':
        case '346CB6':
        case '2F62A5':
        case "2A76FC":
        case "3380FA":
        case "226FFC":
        case "1360FE":
        case "317DFB":
        case "1663FE":
        case "1758F7":
        case "2158F0":
        case "3656E0":
        case "3756E0":
        case "0B53EE":
            return 7;
        case '6154BF':
            return 8;

        case "FF524F":
        case "FF6568":
        case "FF6668":
        case "FF7982":
        case "FF828E":
        case "FF4942":
        case "FF8C9B":
        case "EE8391":
        case "DD7986":
            return 9;
        case "FF3F35":
        case "FF5C5B":
        case "E12223":
        case "E82927":
        case "EB2C29":
        case "F0312C":
            return 10;
        case "D1141A":
        case "C20511":
        case "CA0C16":
        case "99251F":
        case "992D2A":
        case "993C3E":
        case "AA2A23":
        case "D6181D":
        case "CC322A":
        case "CC0F17":
        case "D91B1F":
            return 11;

        case '293C44':
        case '132742':
        case '141E22':
        case '72A5BB':
        case '3E5A66':
        case '5d8799':
        case '5D8799':
            return 0;
        default:
            return null;
    }
}

function checkExist($type, $_val)
{
    foreach ($type as $key => $val) {
        if ($_val == $val) {
            return true;
        }
    }
    return false;
}


/**
 * Массив определенных цветов
 */

/*echo json_encode($arrayResult);
echo '</br>';
echo 'ResultOk</br>';*/

$intensity = array();
$unicom = array();

foreach ($arrayResult as $key => $val) {
    //echo "<div style='background: #$val[color]; width: 140px; margin-bottom:2px'>$val[intensity]</div>"."";
    if (!checkIntensity($intensity, $val[intensity])) {
        array_push($unicom, $val);
        array_push($intensity, $val[intensity]);
    }
    //  echo json_encode($val).'<br>';
}

//todo раскоментировать
$result = array(
    "dist" => $unicom,
    "degree" => $degWind,
    "isRainy" => isRainyFoo($im)

);
header('Content-Type: application/json');
echo json_encode($result);

//todo закоментировать
/*foreach($unicom as $key=> $val){
    echo "<div style='background: #$val[color]; width: 140px; margin-bottom:2px'>$val[intensity] $val[dist]</div>"."";
}*/


function checkIntensity($arr, $_val)
{
    foreach ($arr as $key => $val) {
        if ($_val == $val) {
            return true;
        }
    }
    // array_push($arr, $val);
    return false;
}


/**
 * Массив неидетифицированных цветов
 */
/*echo '</br>';
echo 'Null </br>';
foreach($arrayNull as $key=> $val){
    echo "<div style='background: #$val[color]; width: 140px; margin-bottom:2px'>case \"$val[color]\":</div>"."";
   // echo json_encode($val).'<br>';
}*/

//echo json_encode($arrayNull);

function toHex($n)
{
    $n = intval($n);
    if (!$n)
        return '00';

    $n = max(0, min($n, 255)); // make sure the $n is not bigger than 255 and not less than 0
    $index1 = (int)($n - ($n % 16)) / 16;
    $index2 = (int)$n % 16;

    return substr("0123456789ABCDEF", $index1, 1)
    . substr("0123456789ABCDEF", $index2, 1);
}
