/**
 * Created with JetBrains WebStorm.
 * User: Администратор
 * Date: 8/1/13
 * Time: 9:44 PM
 * To change this template use File | Settings | File Templates.
 */
function LoadMet(){
    this.lasImg=null;
    this.deltaTime = 0;
    this.countImgs = null;
    this.arrImgsMet = null;
    this.arrSrsMet = null;
    this.countErr = null;
    this.count = null;
    this.loaderTime=null;

    this.lastSrc=function(){
        var scope = this;
        scope.lasImg = new Image();
        scope.lasImg.onload = function(){
            document.getElementById('Met').src = scope.lasImg.src;
        };
        scope.lasImg.onerror = function(){
            scope.deltaTime++;
            scope.lastSrc();
        }
        scope.lasImg.src = 'http://www.metoffice.gov.uk/weather/images/eurir_sat_'+scope.changeTime(scope.deltaTime)+'.jpg'
    };

    this.init = function(){
      //  alert('gjdfg');
        var scope = this;
        document.getElementById('loaderMet').style.opacity = 1;
        scope.loader();

       scope.deltaTime = 0;
        scope.countImgs = 0;
        scope.countErr = 0;
        scope.arrImgsMet = [];
        scope.arrSrsMet = [];
        scope.initSrc();
    };

    this.initSrc=function(){
        var scope = this;
        scope.arrImgsMet[scope.countImgs] = new Image();
        scope.arrImgsMet[scope.countImgs].onload = function(){
            scope.arrSrsMet[scope.countImgs] = 'http://www.metoffice.gov.uk/weather/images/eurir_sat_'+scope.changeTime(scope.countErr)+'.jpg';
            scope.countErr++;
            scope.countImgs++;
            if(scope.countImgs<20){

                scope.initSrc();
            }else{
               // document.getElementById('Met').src =  scope.arrSrsMet[6];

                scope.initPlay(19);
              //  alert('pd');
            }

        };
        scope.arrImgsMet[scope.countImgs].onerror = function(){
            scope.countErr++;
            scope.initSrc();
        }
        scope.arrImgsMet[scope.countImgs].src = 'http://www.metoffice.gov.uk/weather/images/eurir_sat_'+scope.changeTime(scope.countErr)+'.jpg'
    };






    this.changeTime=function(dhh){//принимаем  дельту
        var scope = this;
        var objDate={
            yy: scope.getDate().split('')[0]+scope.getDate().split('')[1]+scope.getDate().split('')[2]+scope.getDate().split('')[3],
            mm: scope.getDate().split('')[4]+scope.getDate().split('')[5],
            dd: scope.getDate().split('')[6]+scope.getDate().split('')[7],
            hh: scope.getDate().split('')[8]+scope.getDate().split('')[9]
        }

        objDate.hh=parseFloat(objDate.hh)-dhh;

        if (objDate.hh<0){
            objDate.dd=scope.check0(parseFloat(objDate.dd)-1);
            objDate.hh=parseFloat(objDate.hh)+24;
            objDate.hh=scope.check0(objDate.hh);
            // alert (objDate.dd+""+objDate.hh);
        }
        objDate.hh=scope.check0(parseFloat(objDate.hh));
        //alert (objDate.hh);
        var tmp = ""+objDate.yy+objDate.mm+objDate.dd+objDate.hh+'00';
        return ""+objDate.yy+objDate.mm+objDate.dd+objDate.hh+'00';
    };


    this.getDate=function(){
        var scope = this;
        var date= new Date();
        var fullDate = date.getFullYear()+scope.check0(date.getMonth()+1)+scope.check0(date.getDate()) + scope.check0(date.getHours())+'00';
        return fullDate;
    };





    this.check0=function(param){
        if(param<10){
            param='0'+param
        };
        return param;
    };

    ///////////////////////////
    this.initPlay = function(k){
        var scope = this;

        clearInterval(scope.loaderTime);
        document.getElementById('loaderMet').style.opacity = 0;

        scope.count = k;
        //alert(scope.count);
        if(2<scope.arrSrsMet.length){
            document.getElementById('Met2').style.opacity = 0;
            document.getElementById('Met2').src = scope.arrSrsMet[scope.count];
            scope.play(0);
        }

    }

    this.play = function(k){
        var scope = this;
        document.getElementById('Met2').style.opacity = k;
        // document.getElementById('imgRadar2').src = scope.arrSrc[1];
        if(k<1){
            setTimeout(function(){
                    scope.play(k+0.02);
                },
                10);
        }else if(1<scope.count){
            scope.changeImg();
            setTimeout(function(){

            },0)

        };

    };

    this.changeImg = function(){
        var scope = this;
        scope.count--;
        document.getElementById('Met').src = scope.arrSrsMet[scope.count];
        document.getElementById('Met2').style.opacity = 0;
        document.getElementById('Met2').src = scope.arrSrsMet[scope.count-1];
        if(0<scope.count){
            scope.play(0);
        }
    };

    this.loader = function(){
        var scope = this;
        scope.loaderTime =  setInterval(function(){
            if(document.getElementById('loaderMet').style.opacity == 1){
                document.getElementById('loaderMet').style.opacity = 0;
            }else{
                document.getElementById('loaderMet').style.opacity = 1;
            }

        },500)
    }

}
var loadMet = new LoadMet();
