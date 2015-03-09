function mousEvent(){
    document.onmousemove = function(e){
        var offset = $('.ukbb-content .imgs').offset();
        var relativeX = (e.pageX - offset.left);
        var relativeY = (e.pageY - offset.top);
        //дистанция до киева
        var xKiev=217;
        var yKiev=231;
        var dxKiev=relativeX-xKiev;
        var dyKiev=relativeY-yKiev;

        var distKiev= Math.pow(dxKiev, 2) + Math.pow(dyKiev, 2);
        distKiev=Math.sqrt(distKiev); distKiev=distKiev*0.905405405;
        distKiev=parseInt(distKiev);

        //дистанция до  бузовой
        var xBuzova=185;
        var yBuzova=235;
        var dxBuzova = relativeX-xBuzova;
        var dyBuzova =relativeY-yBuzova;

        var distBuzova= Math.pow(dxBuzova, 2) + Math.pow(dyBuzova, 2);
        distBuzova=Math.sqrt(distBuzova); distBuzova=distBuzova*0.905405405;
        distBuzova=parseInt(distBuzova);



        //дистанция до  Бороянки
        var xBorodanka=174;
        var yBorodanka=206;
        var dxBorodanka = relativeX-xBorodanka;
        var dyBorodanka =relativeY-yBorodanka;


        var distBorodanka= Math.pow(dxBorodanka, 2) + Math.pow(dyBorodanka, 2);
        distBorodanka=Math.sqrt(distBorodanka); distBorodanka=distBorodanka*0.905405405;
        distBorodanka=parseInt(distBorodanka);

        if(relativeX<654 && relativeY<478 && 0<relativeX && 0<relativeY ){
            $("#DistKiev").html(distKiev+'km');
            $("#DistBuzova").html(distBuzova+'km');
            $("#DistBorodanka").html(distBorodanka+'km');
        }

       // $("#txt").css({top: relativeY-15+ "px", left : relativeX+"px"});
     //   $("#txt").css({top: relativeY-15+ "px", left : relativeX+"px"});
       // document.getElementById('txt').style.cursor='crosshair';
    }

	$('.ukbb-content .imgs').css({cursor: 'crosshair'});

    $("#fon_radar").click(function(e) {
        var offset = $(this).offset();
        var relativeX = (e.pageX - offset.left);
        var relativeY = (e.pageY - offset.top);

        alert("X: " + relativeX + "  Y: " + relativeY);
    });

}