<?php

//header('Content-type: image/jpeg');
//echo file_get_contents("http://www.metoffice.gov.uk/public/data/CoreProductCache/SatelliteImages/Item/ProductId/40948938");

//echo "http://www.metoffice.gov.uk/public/data/CoreProductCache/SatelliteImages/ItemList/Composite/World"
//echo "http://www.metoffice.gov.uk/public/data/CoreProductCache/SatelliteImages/ItemList/Composite/World";
///2016-10-28T14:00:00Z
date_default_timezone_set('UTC');
$dateStart = mktime(date("H")-2, 0, 0, date("m")  , date("d"), date("Y"));
$dateEnd = mktime(date("H")-1, 0, 0, date("m")  , date("d"), date("Y"));
$url = "http://www.metoffice.gov.uk/public/data/CoreProductCache/SatelliteImages/ItemList/Composite/World/".date("Y-m-d\TH:i:s", $dateStart)."Z"."/".date("Y-m-d\TH:i:s", $dateEnd)."Z";
$xmlstr = file_get_contents($url);
$ProductList = new SimpleXMLElement($xmlstr);

$urlImg = $ProductList->Product->ProductURI;
header('Content-type: image/jpeg');
echo file_get_contents($urlImg);
?>