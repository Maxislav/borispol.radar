
function LoadSat(){
  //  var scope=this;
    var gmt=3;
    this.k=-1;
    this.op=0;
    this.countImg=10;
    this.idEl=null;
    this.loaderTime= null;

    var imgsSat=[];
    var arrSrcSat=[];
    var beginSrc ='http://www.sat24.com/image2.ashx?region=eu&time=';
    var finishSrc='&ir=false';
    var  maskSatt;


    this.init=function(d, idEl){
        var scope = this;
        //maskSatt = new Ext.LoadMask(Ext.getCmp(idEl), {msg:"Loading..."});
       // maskSatt.show();
       // document.getElementById('loaderSat').style.opacity = 1;
        scope.loader();
        scope.k=0;
        scope.op=0;
        scope.countImg=11;
        scope.idEl=idEl;
        scope.getSrc();
    };

    this.lastImgSrc=function(k){
        var scope = this;
        return beginSrc+scope.changeTimeSat(k);

    }

    this.loadSat=function(){

    }

    this.getSrc=function(){
        var scope = this;
        for(var i=0; i<scope.countImg; i++){
            arrSrcSat[i]=beginSrc+scope.changeTimeSat(i)+'&ir=false';
        }
        scope.load();
    };

    this.load = function (){
        var scope = this;
        if(scope.k<scope.countImg){
            scope.k++;
            imgsSat[scope.k]=new Image();
            imgsSat[scope.k].onload = function (){ scope.load()};
            imgsSat[scope.k].src = beginSrc+scope.changeTimeSat(scope.k)+'&ir=false';


        }else{
         //   maskSatt.hide();
            scope.setHtml(scope.idEl);
        }
    };

    this.loadOnly=function(){
        var scope = this;
        var n=0;
        var arrImg=[];
        var foo=function load(){

            if(n<(scope.countImg-1)){
                n++;
                arrImg[n]=document.createElement('img');
                arrImg[n].onload = function () {
                    // вызывается всегда
                    foo();
                };
                arrImg[n].src = beginSrc+scope.changeTimeSat(n)+'&ir=false';


            }else{
                scope.k=(-1);
                //    alert('ds');
                // scope.setHtml(scope.idEl);
            }
        };
        foo();


    }



    this.setHtml=function(idEl){
        var scope = this;

        if(idEl=='bigSatt'){



            Ext.getCmp(idEl).update(
                '<div style="position: relative; width: 336px; height: 220px">'+
                    '<img src="" width="655" height="520" style="z-index:0; position: absolute" id="'+idEl+'0' +'">'+
                    '<img src="" width="655" height="520" style="z-index:1; position: absolute" id="'+idEl+'1' +'">'+
                    '</div>'
            );


        }


        if(idEl=='satt'){

            document.getElementById(idEl).innerHTML = '<div style="position: relative; width: 320px; height: 220px; left: 0; top:0">'+
                '<img src="img/red_dot.png" width="3" height="3" style="position: absolute; left: 270px; top: 92px; z-index: 5" >'+
                '<img src="" width="320" height="220" style="z-index:0; position: absolute; left: 0; top:0" id="'+idEl+'0' +'">'+
                '<img src="" width="320" height="220" style="z-index:1; position: absolute; left: 0; top:0" id="'+idEl+'1' +'">'+
'<div style="z-index:3; position: absolute; right: 5px; top:0; color: red; font-size: 12px; opacity: 0; text-shadow: none" class="loader">Loading</div>'+
                '</div>';
        }

        scope.countImg=9;

       // clearInterval(scope.loaderTime);
      //  document.getElementById('loaderSat').style.opacity = 0;

        ir.blink.hide($('#satt .loader'))
        draw();


        function draw(){
            //alert(arrSrcSat[scope.countImg-1]);
           // var scope = this;
            document.getElementById(scope.idEl+'0').src=arrSrcSat[scope.countImg];
            document.getElementById(scope.idEl+'1').src=arrSrcSat[scope.countImg-1];
            initOp();
            scope.countImg--;


        }


        function initOp(){
            //var scope = this
            scope.op=0;
            opacity();
            function opacity(){
                document.getElementById(scope.idEl+'1').style.opacity=scope.op;
                scope.op=scope.op+0.1;
                if (scope.op<=1){
                    setTimeout(opacity,50);
                }else{
                    if(0<scope.countImg && document.getElementById(scope.idEl+'0')){
                        draw();
                    }
                }
            }
        }
    };

    ///////////////////////
    this.changeTimeSat=function(k){
        var scope = this;
        var kmi=k*15;
        var objDate={
            yy: scope.getDateSat().split('')[0]+scope.getDateSat().split('')[1]+scope.getDateSat().split('')[2]+scope.getDateSat().split('')[3],
            mm: scope.getDateSat().split('')[4]+scope.getDateSat().split('')[5],
            dd: scope.getDateSat().split('')[6]+scope.getDateSat().split('')[7],
            hh: scope.getDateSat().split('')[8]+scope.getDateSat().split('')[9],
            mi: scope.getDateSat().split('')[10]+scope.getDateSat().split('')[11]
        };


        var dhh=Math.floor(kmi/60); //сколько часов отнять
        var dmi=kmi-(dhh*60);

        objDate.mi=parseFloat(objDate.mi)-dmi;

        if (objDate.mi<0){
            objDate.hh=parseFloat(objDate.hh)-1;
            objDate.mi=parseFloat(objDate.mi)+60;
            // objDate.mi=scope.check0(objDate.mi);
        }
        //objDate.mi=scope.check0(objDate.mi);


        objDate.hh=parseFloat(objDate.hh)-gmt-dhh;

        if (objDate.hh<0){
            objDate.dd=scope.check0(parseFloat(objDate.dd)-1);
            objDate.hh=parseFloat(objDate.hh)+24;
            objDate.hh=scope.check0(objDate.hh);
        };




        if(objDate.mi<=15){
            objDate.mi='00';
        }
        if(15<objDate.mi && objDate.mi<=30){
            objDate.mi='15';
        }
        if(30<objDate.mi && objDate.mi<=45){
            objDate.mi='30';
        }
        if(45<objDate.mi && objDate.mi<=60){
            objDate.mi='45';
        }

        objDate.hh=scope.check0(objDate.hh);

        return ""+objDate.yy+objDate.mm+objDate.dd+objDate.hh+objDate.mi;
    };

    this.getDateSat=function(){
        var scope = this;
        var date= new Date();
        var fullDate = date.getFullYear()+scope.check0(date.getMonth()+1)+scope.check0(date.getDate()) + scope.check0(date.getHours())+scope.check0(date.getMinutes());
        return fullDate;
    };

    this.check0=function(param){
        if(param<10){
            param='0'+param
        };
        return param;
    };
    this.loader = function(){
      var scope = this;
        ir.blink.show($('#satt .loader'))
        /*
      scope.loaderTime =  setInterval(function(){
          if(document.getElementById('loaderSat').style.opacity == 1){
              document.getElementById('loaderSat').style.opacity = 0;
          }else{
              document.getElementById('loaderSat').style.opacity = 1;
          }

      },500)
      */
    }


}
var loadSat=new LoadSat();

