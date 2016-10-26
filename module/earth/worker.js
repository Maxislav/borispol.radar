/**
 * Created by maxislav on 26.10.16.
 */
onmessage = function(e) {

   let data = e.data.data,
    width = e.data.width,
    height = e.data.height;

 let srcColor = [];
 for(let y =0 ; y< height; y++){
   for(let x =0 ; x< width; x++){
     if(y == 0) srcColor[x] = [];
     let d = (y*width*4)+(x*4);
     srcColor[x][y] = {
       r:data[d],
       g:data[d+1],
       b:data[d+2],
       a:data[d+3]
     }
   }
 }

  let distColor = [];

  for(let y =0 ; y< height; y++) {
    for (let x = 0; x < width; x++) {
      if (y == 0) distColor[x] = [];
      distColor[x][y] = {
        r: 0,
        g: 0,
        b: 0,
        a: 0
      }
    }
  }

  let R = width/(2*Math.PI);
  let yStart = height, yEnd =0;

  for(let y = height/2 ; 0<=y; y--) {
    for (let x = 0; x < width; x++) {
      let alfa = (Math.atan(((height/2)-y)/R)*180)/Math.PI;
      let distY = 2*Math.PI*R*(alfa/360);
      distY  = height/2 - distY;
      distY  = parseInt(distY);
      distColor[x][distY] = srcColor[x][y];
      if(distY<yStart){
        yStart = distY
      }
    }
  }

  for(let y = height/2 ; y<height; y++) {
    for (let x = 0; x < width; x++) {
      let alfa = (Math.atan(( y - (height/2))/R)*180)/Math.PI;
      let distY = 2*Math.PI*R*(alfa/360);
      distY  = height/2 + distY;
      distY  = parseInt(distY);
      distColor[x][distY] = srcColor[x][y];
      if(yEnd<distY){
        yEnd = distY
      }
    }
  }

  let distData = [];
  for(let y =0 ; y< height; y++) {
    for (let x = 0; x < width; x++) {
      distData.push(distColor[x][y].r);
      distData.push(distColor[x][y].g);
      distData.push(distColor[x][y].b);
      distData.push(distColor[x][y].a);
    }
  }


 //debugger
  postMessage({
    data:distData,
    width:width,
    height: height,
    yStart,
    yEnd
    
  });
  close();
};