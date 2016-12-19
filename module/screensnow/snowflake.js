/**
 * Created by maxislav on 13.12.16.
 */
define(['threejs', 'module/screensnow/FastBlur.js', 'getimage'], function (THREE, fastBlur, getImage){

  
  function getRandom(min, max, int) {
    var rand = min + Math.random() * (max - min);
    if(int){
      rand = Math.round(rand)
    }
    return rand;
  }

  function toScreenXY(obj, renderer, camera) {
    var vector = new THREE.Vector3();
    var widthHalf = 0.5*renderer.context.canvas.width;
    var heightHalf = 0.5*renderer.context.canvas.height;
    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
    return {
      x: vector.x,
      y: vector.y
    };
  }

  const snow = [
    'img/snow1.png',
    'img/snow1.gif',
    'img/snow2.png'
  ];
  
  return function sn (renderer, camera) {
    const position = {
      z:getRandom(-600, -200, true)
    };
    const planeGeometry = new THREE.PlaneGeometry( 5, 5, 4 );
    const material = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 1 - 0.6*Math.abs(position.z+200)/400
    });




    getImage(snow[getRandom(0,2,true)], true)
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
      }, (err)=>console.log(err));

    class Plane extends THREE.Mesh{
      constructor(a,b,  renderer, camera){
        super(a,b);
        this.renderer = renderer;
        this.camera = camera;
        this.events = {
          'click' : []
        };
      }
      get projection(){
        return  toScreenXY(this, this.renderer, this.camera)
      }

    }
    let plane = new Plane(planeGeometry, material,  renderer, camera );

    plane.position.z =  position.z;
    plane.position.x =  getRandom(-500, 500, true);
    plane.position.y = getRandom(200, 400, true);
    plane._rotationC = getRandom(-10, +10);
    const posX = plane.projection.x;

    if(posX<0 || renderer.context.canvas.width<posX){
      plane = undefined;
      return sn(renderer, camera)
    }
    return plane
  }
  
});