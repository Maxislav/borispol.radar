<?php
ini_set('date.timezone', 'UTC');
date_default_timezone_set("UTC");
sleep(20);

echo (date("Y/m/d-H:i")).'<br/>';

//load_ir('../img/sat/', 'http://www.sat24.com/image2.ashx?region=eu&ir=true');
//load_ir('../img/sat/', 'http://www.sat24.com/image.ashx?country=eu&type=zoom');
//load_ir('../img/sat/', 'http://en.sat24.com/image?type=infraPolair&region=eu');
load_ir('../img/sat/', 'http://www.sat24.com/image2.ashx?region=eu&ir=true');
load_ir('../img/vis/', 'http://en.sat24.com/image?type=visual&region=eu');

function load_ir($dir, $url){

    //$url = 'http://www.sat24.com/image2.ashx?region=eu&time=201411291945&ir=true';
    //$dir = '../img/sat/';
    $path =$dir.date("YmdH").'00.gif';
    $file = fopen($path,'w') or die('Could not create file: ' . $path);
    fclose($file);
    file_put_contents($path, file_get_contents($url));
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
}



