<?php
$code =$_GET["code"];

$obj = array(
    "status"=>"OK"
);
$a = array();
if($code == "borispol"){
    //$obj["status"] = "ERR";
    for ($i=0; $i<10; $i++){
        if($i==0){
            $homepage = file_get_contents('http://meteoinfo.by/radar/?q=UKBB');
        }else{
            $homepage = file_get_contents('http://meteoinfo.by/radar/?q=UKBB'.'&t='.$i.'0');
        }
        $homepage = mb_convert_encoding($homepage , 'UTF-8');
        preg_match("/id=\"rdr\"[\s\S]*<\/table>/",$homepage ,$matches);
        preg_match("/UKBB_(.+)\.png/",$matches[0], $matches);
        array_push($a,"http://meteoinfo.by/radar/UKBB/".$matches[0]);
    }
}



$obj["imgUrls"] = $a;

echo json_encode($obj);
