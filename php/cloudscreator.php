<?php

$images = array();
$scale = 2;
$width = 256; $height = 256;

for($x=0; $x<($scale*2); $x++){
	array_push($images, array());
};


for($y=0; $y<($scale*2); $y++){
	
	for($x=0; $x<($scale*2); $x++){
			//http://undefined.tile.openweathermap.org/map/clouds/4/10/7.png
		$images[$x][$y]= imagecreatefrompng("http://undefined.tile.openweathermap.org/map/clouds/".$scale."/".$x."/".$y.".png");
	};
};


 //$image1 = imagecreatefrompng("http://undefined.tile.openweathermap.org/map/precipitation/2/0/0.png"); //create images



$dst = imagecreate($scale*2*$width, $scale*2*$height);


for($y=0; $y<($scale*2); $y++){
	
	for($x=0; $x<($scale*2); $x++){
		imagecopyresampled($dst, $images[$x][$y], $x*$width,$y*$height,0,0,256,256,256,256);
		imagedestroy($images[$x][$y]);
	};
};


//imagecopyresampled($dst, $image1, 0,0,0,0,256,256,256,256);
//imagecopyresampled($dst, $image2, 256,0,0,0,256,256,256,256);

header('Content-Type: image/jpeg');
imagepng($dst);
imagedestroy($dst);
/*
$bool = imagecopymerge(
"clouds.png",
"http://undefined.tile.openweathermap.org/map/precipitation/2/0/0.png",

);
*/

/*imagecopymerge ( 
resource $dst_im , 
resource $src_im , 
int $dst_x , 
int $dst_y , 
int $src_x , 
int $src_y , 
int $src_w , 
int $src_h , 
int $pct )*/

//header('Content-Type: image/jpeg');
//echo "ololo";
?>
