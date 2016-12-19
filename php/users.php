<?php
$hash = $_POST['id'];



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
        "hash"=>$hash
    ));

    $fp = fopen('users.json', 'w');
    fwrite($fp, json_encode($json, JSON_PRETTY_PRINT));
    fclose($fp);
    echo $hash;// json_encode($json);
}else{
    //Если существует
    echo null;

}





?>