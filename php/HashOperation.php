<?php
date_default_timezone_set("UTC");
class HashOperation{



    public function getJson(){

        $str = file_get_contents('users.json');
        $json = json_decode($str, true);
        return $json;

    }
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

    public function addFile($numer, $h){
        $json = $this -> getJson();
        for($i = 0; $i<count($json); $i++){
            if($json[$i]['hash'] === $h){
                $imgs = $json[$i]['imgs'];
                if(!$imgs){
                    $imgs = array(
                        0 => array(
                            "n" => $numer,
                            "date" => date("Y/m/d-H:i")
                        )
                    );
                }else{
                    array_push($imgs, array(
                        "n" => $numer,
                        "date" => date("Y/m/d-H:i")
                    ));
                }
                $json[$i]["imgs"] = $imgs;
            }
        }

        $this->saveJson($json);
        return true;

    }

    function saveJson($json){
       $fp = fopen('users.json', 'w');
       fwrite($fp, json_encode($json));
       fclose($fp);
    }

};


?>