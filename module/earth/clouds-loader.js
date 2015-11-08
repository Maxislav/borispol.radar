/**
 * Created by Администратор on 11/8/15.
 */
function cloudsLoader(canvas, callback){
    var _callback = callback;
    var scale = 2, width = 256, height = 256;


    canvas.width = scale*2*width;
    canvas.height = scale*2*height;

    var context = canvas.getContext("2d");

    this.load = function(){

    };

    var images = [];
    var pronises = [];

    var x = 0, y = 0;
    for(x=0;  x<(scale*2); x++){
        images[x] = [];
    };

    function finish(image, resolve, reject, x, y){
        image.onload = function(){
            context.drawImage(images[x][y], x*width, y*height, width, height);
            resolve(images[x][y]);
        };
        image.onerror = function(){
            reject('error')
        };
        image.src = "http://undefined.tile.openweathermap.org/map/clouds/"+scale+"/"+x+"/"+y+".png"
    }


    for(y=0; y<(scale*2); y++){
        for(x=0;  x<(scale*2); x++){
            pronises.push(new Promise(function(resolve, reject){
                images[x][y] =  new Image();
                finish(images[x][y], resolve, reject, x, y);
            }))
        };
    };



    Promise.all(pronises).then(function(values){
        //console.log(images)
        callback(canvas)
    }, function(x, y){
        //console.log(images)
        callback(canvas);
    })


};