<?php
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


class HashOperation{


    public function checkExist($h, $json){
        foreach( $json as  $item){
            if($item['hash'] === $h){
                return true;
            }
        };
        return false;
    }

    public function getArrId($h, $json){
            foreach( $json as  $item){
                if($item['hash'] === $h){
                    return $item;
                }
            };
            return false;

    }

    public function updateIp($h, $json, $ip){
        $item = $this ->  getArrId($h, $json);
        $array =$item["ip"];
        if( in_array($ip, $array) ){
            return false;
        }else{
            array_push($array, $ip);
            $i= 0;
            for($i = 0; $i<count($json); $i++){
                if($json[$i]['hash'] === $h){
                     $json[$i]['ip'] = $array;
                }
            }
            return $json;
        }
    }


    public function makeid($json){
         $possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
         $arr1 = str_split($possible);
         $h = '';

         for($i=0; $i<20; $i++){
            $h=$h.''.$arr1[rand(0, 62)];
         };
         if($this->checkExist($h, $json)){
             return $this->makeid($json);
         }
         return $h;
    }

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