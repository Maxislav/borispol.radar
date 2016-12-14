/**
 * Created by maxislav on 13.12.16.
 */
define(['threejs', 'module/screensnow/FastBlur.js', 'module/screensnow/getImage.js'], function (THREE, fastBlur, getImage){

  function getRandom(min, max, int) {
    var rand = min + Math.random() * (max - min);
    if(int){
      rand = Math.round(rand)
    }
    return rand;
  }

  const snow = [
    'img/snow1.png',
    'img/snow1.gif',
    'img/snow2.gif'
  ];
  
  return function () {
    const planeGeometry = new THREE.PlaneGeometry( 5, 5, 4 );
    //const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

    const material = new THREE.MeshPhongMaterial({
      transparent: true
    });

    const position = {
      z:getRandom(-600, -200, true)
    };



    getImage(snow[getRandom(0,2,true)])
      .then(image=>{
        const blur = 5*Math.abs(position.z+250)/200;
        var c = document.createElement('canvas');
        c.style.webkitFilter = "blur(20px)";
        c.style.position = 'absolute';
        c.style.top = '0';
        c.style.position = '0';
        c.setAttribute('width', 32+'');
        c.setAttribute('height', 32+'');
        c.style.width = '32px';
        c.style.height = '32px';
        var ctx=c.getContext("2d");


        ctx.drawImage(image,0,0, 32,32);

        fastBlur({w:32, h:32}, ctx, blur, true);
        const texture = new THREE.Texture(c);
        material.map = texture;
        texture.needsUpdate = true;
        material.needsUpdate = true;
      });

    const plane = new THREE.Mesh( planeGeometry, material );
    
    
    
    plane.position.z =  position.z;
    plane.position.x =  getRandom(-500, 500, true);
    plane.position.y = getRandom(200, 400, true);
    plane._rotationC = getRandom(-10, +10);
    return plane
    
  }
  
});