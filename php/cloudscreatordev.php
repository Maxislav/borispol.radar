<?PHP

$images = array();
$scale = 2;
$width = 256; $height = 256;

for($x=0; $x<($scale*2); $x++){
	array_push($images, array());
};

//imagecreatefrompng("http://tessera12.intellicast.com/201212/en-US/0003/0001/3qAKSzPXfr1BCEI7/0805/0/20160930145000/1/2/2/1/layer.png");

function toImg($ss){
    //echo $ss;
    echo "<img src='".$ss."'>";
};

for($y=0; $y<($scale*2); $y++){
	
	for($x=0; $x<($scale*2); $x++){
			//http://undefined.tile.openweathermap.org/map/clouds/4/10/7.png
		//$images[$x][$y]= imagecreatefrompng("http://a.tile.openweathermap.org/map/clouds/".$scale."/".$x."/".$y.".png");
		//$images[$x][$y]= imagecreatefrompng("http://tessera12.intellicast.com/201212/en-US/0003/0001/3qAKSzPXfr1BCEI7/0805/0/20160930145000/1/".$scale."/".$x."/".$y."/layer.png");
		//$images[$x][$y]= imagecreatefrompng("http://tessera12.intellicast.com/201212/en-US/0003/0001/3qAKSzPXfr1BCEI7/0805/0/20160930145000/1/".$scale."/".$x."/".$y."/layer.png");
		$ss = "http://tessera12.intellicast.com/201212/en-US/0003/0001/3qAKSzPXfr1BCEI7/0805/0/20160930145000/1/".$scale."/".$x."/".$y."/layer.png";

		//$images[$x][$y] = imagecreatefrompng($ss) ;
		toImg($ss);
		//toImg("dolosa");
	};
};


?>
