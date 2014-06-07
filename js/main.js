function Main(){
	this.img = null;
	this.nN = null;
	this.eR = null;
	this.arrSrc = null;
	this.count = null;
	this.time = null;
	this.tmp = null;
	this.percent = null;
	this.blockedPlay = null;
	this.blockedScan = false;
	this.arrImgUkbb = [];


	this.update = function(){
		/*
				var scope = this;
				document.getElementById('imgRadar2').src = 'http://meteoinfo.by/radar/UKBB/UKBB_latest.png' + '?' + Math.random();
				setTimeout(function () {
					scope.update()
				}, 60000);
				*/
	};

	this.init = function(){
		var scope = this;
		if(! scope.blockedScan){
			scope.blockedScan = true;
			$('#buttonScan').removeClass("button").addClass("button-blocked");
			scope.blockedPlay = true;
			$('#buttonPlay').removeClass("button").addClass("button-blocked");

			scope.tmp = '';
			this.time = (new Date().getTime() + '').split('');
			for( var i = 0; i < 10; i ++ ){
				scope.tmp = scope.tmp + scope.time[i];
			}
			scope.time = parseFloat(scope.tmp) - 800;
			scope.nN = 0;
			document.getElementById('scan').innerHTML = scope.nN;
			this.img = [];
			this.nN = 0;
			this.eR = 0;
			this.arrSrc = [];
			this.percent = 0;

			this.loadImg();
		}


	};


	this.loadImg = function(){
		var scope = this;
		scope.img[scope.nN] = new Image();
		scope.img[scope.nN].onload = function(){
			scope.arrSrc[scope.nN] = 'http://meteoinfo.by/radar/UKBB/UKBB_' + (scope.time + scope.eR) + '.png';
			scope.arrImgUkbb[scope.nN] = new Image();
			scope.arrImgUkbb[scope.nN].src = scope.arrSrc[scope.nN];
			var el = $('.home .ukbb-content .imgs');
				el.append($(scope.arrImgUkbb[scope.nN]));
				$(scope.arrImgUkbb[scope.nN]).fadeTo(222,1);
			scope.nN ++;
			document.getElementById('scan').innerHTML = scope.nN;
			scope.eR = scope.eR - 550;
			if(scope.nN < 5){
				scope.loadImg();
			}else{
				scope.blockedScan = false;
				$('#buttonScan').removeClass("button-blocked").addClass("button");
				scope.blockedPlay = false;
				$('#buttonPlay').removeClass("button-blocked").addClass("button");
				document.getElementById('scanProcess').innerHTML = 100 + '%';
				scope.initPlay(scope.arrSrc.length - 1);
			}
		};
		scope.img[scope.nN].onerror = function(){
			scope.percent ++;
			//var str = scope.percent/10+'';
			//var arr=str.split('');
			if(! (scope.percent / 10 + '').split('.')[1]){
				document.getElementById('scanProcess').innerHTML = scope.percent / 10 + '.0%';
			}else{
				document.getElementById('scanProcess').innerHTML = scope.percent / 10 + '%';
			}
			if(100<scope.percent/10 && scope.nN==0 ){
				alert('Вероятно радар отключен')
			}else{
				scope.eR --;
				scope.loadImg();
			}
		};
		scope.img[scope.nN].src = 'http://meteoinfo.by/radar/UKBB/UKBB_' + (scope.time + scope.eR) + '.png';
	};
	this.initPlay = function(k){
		var s = this;
		$('#buttonPlay').removeClass("button").addClass("button-blocked");
		var l = s.arrImgUkbb.length;
		var m = 0;
		for(var i = 0; i<l; i++){
			$(s.arrImgUkbb[i]).fadeTo(222,1,function(){
				m++;
				if(m==l){
                    setTimeout(function(){
                        play(l-1);
                    },1000)

				}
			})
		}

		function play(k){
			if(0<=k){
				$(s.arrImgUkbb[k]).fadeTo(222,0,function(){
					setTimeout(function(){
						play(k-1)
					},500)
				})
			}  else{
				s.blockedPlay = false;
				$('#buttonPlay').removeClass("button-blocked").addClass("button");
			}
		}
	};
}
var main = new Main();