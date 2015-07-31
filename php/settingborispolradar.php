<?php
/**
 * Created by PhpStorm.
 * User: mars
 * Date: 31.07.15
 * Time: 14:48
 */
$setting = array(
    'title1' => "Borispol",
    'title2' => "Infrared",
    'title3' => "Visible",
    'url1' => "http://meteoinfo.by/radar/UKBB/UKBB_latest.png",
    'url2' => "http://www.sat24.com/image2.ashx?region=eu&ir=true",
    'url3' => "http://www.sat24.com/image2.ashx?region=eu"
);

echo json_encode($setting);