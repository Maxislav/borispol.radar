<?php
// В PHP 4.1.0 и более ранних версиях следует использовать $HTTP_POST_FILES
// вместо $_FILES.

$dir = "../img/bg/";

$uploaddir = $dir;
$uploadfile = $uploaddir . basename($_FILES['afile']['name']);
$file_content = file_get_contents($_FILES['afile']['tmp_name']) ;

if (move_uploaded_file($_FILES['afile']['tmp_name'], $dir."1.jpg")) {
    echo "Ok \n";
} else {
    echo "Error \n";
}

//echo 'Некоторая отладочная информация:';
//print_r($_FILES);

//print "</pre>";

$files1 = scandir($dir);

foreach($files1 as $path){
    $filename = $dir.$path;
    if(file_exists($filename)){
        echo filemtime($filename)."\n";
    }
};


print_r($files1);

?>