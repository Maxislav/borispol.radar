
define(function (require, exports, module) {

    return function(html){
        $.ajax({
            type: "GET",
            url: 'php/loadUkbbHistory.php',
            success: function(d){
                console.log(d)
              /*  item.find('.progress-bar').css({
                    width: '60%'
                })
                arraySrs = JSON.parse(d);
                setSrc();*/
            },
            error: function(a,b,c){
                console.log(b)
            }

        })
       /* $.ajax({

            url: 'php/forecast.php',
            success: function(xml){
                console.log(xml)
            }
        })*/
    };
});

/*var forecast = {
    init: function(html, success){

    },
    show: function(){
        alert('oo')
    }

}*/
