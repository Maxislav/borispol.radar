<?php
$file = $_GET["file"];
$content = "<h2 style='margin: 30px; color: rgb(113, 89, 155);'>".$_GET["file"]."</h2>";
$content = $content.
    "<style>.line{ padding:2px} .line:hover{background: rgba(255,243,194,0.7);;} </style>";


$content = $content."<div style='margin: 30px'>".file_get_contents($file)."</div>";

//$content = preg_replace("!<br />(.*?)<br />!si","<div class='line'>\\1</div>",$content);
echo $content;