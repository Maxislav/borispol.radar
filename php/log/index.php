<?php
// Outputs all POST parameters to a text file. The file name is the date_time of the report reception


$arr = glob('*.txt');
$count = count($arr);
if(!empty($count)){
    $content = "<style>body{margin: 0}    .row:hover{background: rgba(255,243,194,0.7);} </style>";
    $script = "<script>function click(a){ console.log(a); }</script>";
    $content = $content.$script;
    for($i = $count-1;  0<=$i ; $i--) {

        $href = "\\'"."$arr[$i]"."\\'";
        $content = $content."<div onclick='window.location.href=\"list.php?file=$arr[$i]\"' class='row' style='border-bottom: 1px solid #ddd; padding: 10px'>"
            ."<a style='padding: 10px' href='list.php?file=$arr[$i]'>".substr($arr[$i], 0, -4)."</a>"
            ."</div>";
        //  $content = $content."<div style = 'margin-bottom: 20px'>".file_get_contents( $arr[$i])."</div>";
    }
    echo $content;
}

?>