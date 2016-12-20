<?php
// В PHP 4.1.0 и более ранних версиях следует использовать $HTTP_POST_FILES
// вместо $_FILES.

$dir = "../img/bg/";
require_once "HashOperation.php";
$hashOperation = new HashOperation();


$files1 = scandir($dir);

$arrPath = array();
$arrDate = array();
$srcPath = array();

foreach($files1 as $path){
    $filename = $dir.$path;

    preg_match('/\d+\./', $path, $matches);

    if(file_exists($filename) && 0<count($matches)){

            array_push($srcPath, $filename);
            array_push($arrPath, $filename);
            array_push($arrDate, filemtime($filename));

        //echo filemtime($filename)."\n";
    }
};



array_multisort($arrDate ,$arrPath);

$replaceImgPath = $arrPath[0];
$k = 0;
while($i<8){
if($srcPath[$k] == $replaceImgPath){
        break;
    }
    $k++;
}



$uploaddir = $dir;
$uploadfile = $uploaddir . basename($_FILES['afile']['name']);
$file_content = file_get_contents($_FILES['afile']['tmp_name']) ;
$hash = $_FILES['afile']['name'];



$res = array(
    "n"=>$k,
    "hash" => $hash,
    "hash-operation"=> $hashOperation->addFile($k, $hash)
);

if (move_uploaded_file($_FILES['afile']['tmp_name'], $replaceImgPath)) {
    echo json_encode($res);
} else {
    echo "Error \n";
}


?>