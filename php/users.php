<?php
require_once "HashOperation.php";
$hash = $_POST['id'];
if(!$_POST['need']){
    return;
}





if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}


$str = file_get_contents('users.json');
$json = json_decode($str, true);

$resp = '';

foreach( $json as  $item){
     $resp = $resp.$item['hash'];
};


$hashOperation = new HashOperation();




if(!$hash || !$hashOperation->checkExist($hash, $json)){
    //Если не существует


    $hash = $hashOperation->makeid($json);
    $count = count($json);
    array_push($json, array(
        "id"=>$count,
        "hash"=>$hash,
        "ip"=>array(
            0=> $ip
        )
    ));

    $fp = fopen('users.json', 'w');
    fwrite($fp, json_encode($json));
    fclose($fp);
    echo $hash;// json_encode($json);
}else{
    //Если существует
    $needRewrite  = $hashOperation->updateIp($hash, $json, $ip);
    if($needRewrite){
            $json = $needRewrite;
            $fp = fopen('users.json', 'w');
           fwrite($fp, json_encode($json));
           fclose($fp);
    }

    echo null;

}





?>