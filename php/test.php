<?php

echo 'Time Limit = ' . ini_get('max_execution_time') ;
$images = array();
$scale = 2;
$width = 256; $height = 256;
/*
for($x=0; $x<($scale*2); $x++){
	array_push($images, array());
};


for($y=0; $y<($scale*2); $y++){
	
	for($x=0; $x<($scale*2); $x++){
			//http://undefined.tile.openweathermap.org/map/clouds/4/10/7.png
		$images[$x][$y]= imagecreatefrompng("http://undefined.tile.openweathermap.org/map/clouds/".$scale."/".$x."/".$y.".png");
	};
};
*/

//header('Content-Type: image/png');
//imagepng($images[0][0]);

?>
