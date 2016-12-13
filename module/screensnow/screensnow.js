/**
 * Created by maxislav on 13.12.16.
 */
define(['threejs', 'jquery', 'module/screensnow/snowflake.js'], function (THREE, $, snowflake) {

  /**
   * Стартовое колво снежинок
   * @type {number}
   */
  const snows = 50;
  const delAreaSize =  50;

  const snowFail = []



  var $container = $('<div></div>');
  $container.css('width',$( window ).width()+'px' )
  $container.css('height',$( window ).height()+'px' )
  $container.css('position','absolute' )
  $container.css('left','0' )
  $container.css('top','0' )
  $container.css('pointer-events','none' );

  $(document.body).append($container);
  const WIDTH = $( window ).width();
  const HEIGHT = $( window ).height();
  const VIEW_ANGLE =45;
  const ASPECT = WIDTH / HEIGHT;
  const NEAR = 0.1;
  const FAR = 10000;
  const container = $container[0]


  const renderer = new THREE.WebGLRenderer({ alpha: true} );
  const camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR
    );

  const scene = new THREE.Scene();

// Add the camera to the scene.
  scene.add(camera);

// Start the renderer.
  renderer.setSize(WIDTH, HEIGHT);
  container.appendChild(renderer.domElement);


  const RADIUS = 50;
  const SEGMENTS = 16;
  const RINGS = 16;




  // create a point light
  const pointLight =  new THREE.PointLight(0xFFFFFF);
  pointLight.position.x = 0;
  pointLight.position.y = 0;
  pointLight.position.z = 0;

  const pointLight2 =  new THREE.PointLight(0xFFFFFF);
  pointLight2.position.x = -100;
  pointLight2.position.y = 100;
  pointLight2.position.z = -500;

 /* setInterval(()=>{
    plane.position.x+=0.1;
    plane.position.y-=0.1;
  }, 20)*/

// add to the scene
  scene.add(pointLight);
  scene.add(pointLight2);

  /*snowflake.position.z = -300;
  snowflake.position.x = 0// -WIDTH/2;
  snowflake.position.y = 0//-HEIGHT/2;*/

  let wind  = 0;

  $(document.body).on('mousemove', (e)=>{

    wind = (e.clientX - WIDTH/2)/(WIDTH/2);

    let i = 0;
    while (i<snowFail.length){
      const snow = snowFail[i]

      const xRange = {
        from: e.clientX -delAreaSize,
        to: e.clientX +delAreaSize,
      }
      const yRange = {
        from: e.clientY - delAreaSize,
        to: e.clientY + delAreaSize
      }


      if(xRange.from<snow._projection.x  && snow._projection.x <xRange.to &&    yRange.from<snow._projection.y  && snow._projection.y <yRange.to ){
        scene.remove(snow);
        snowFail.splice(i,1)
      }else{
        i++
      }



    }

    snowFail.forEach((snow, i)=>{
      const xRange = {
        from: e.clientX -delAreaSize,
        to: e.clientX +delAreaSize,
      }
      const yRange = {
        from: e.clientY - delAreaSize,
        to: e.clientY + delAreaSize
      }


      if(xRange.from<snow._projection.x  && snow._projection.x <xRange.to &&    yRange.from<snow._projection.y  && snow._projection.y <yRange.to ){
        scene.remove(snow)
        //snowFail
      }

    })

    //console.log(wind)

  })



  const snowflakes = [];

  function addSnow(k) {
    for(var i = 0; i< k; i++){
      const sn = snowflake()
      snowflakes.unshift(sn);
      scene.add(sn);
    }
    snowflakes.length = snows
  }

  addSnow(snows);


  

  renderer.render(scene, camera);

  let date = new Date().getTime()

  function update () {
    renderer.render(scene, camera);
    const interval = new Date().getTime() - date;
    date = new Date().getTime();
    let k = 0;

    let i = 0;
    while (i<snowflakes.length){
      const snowflake =  snowflakes[i];

      if(snowflake.position.y<-140){
        k++;
        snowflake._projection = toScreenXY(snowflake.position)
        snowflake.rotation.x = -1;
        if(HEIGHT+20<snowflake._projection.y){
          scene.remove(snowflakes.splice(i, 1)[0])
        }else{
          const fail = snowflakes.splice(i, 1)[0];
          snowFail.push(fail);
        }

       // fail._projection = toScreenXY(fail.position);

      }else{
        snowflake.position.y-=interval*0.05
        snowflake.rotation.z+=interval*0.0001*snowflake._rotationC;
        snowflake.position.x +=interval*0.01*wind;
        i++
      }

    }

    if(k) addSnow(k);

    
    //console.log(snowflake.position.y)
    requestAnimationFrame(update);
  }

// Schedule the first frame.
  requestAnimationFrame(update);


  function getRandom(min, max, int) {
    var rand = min + Math.random() * (max - min);
    if(int){
      rand = Math.round(rand)
    }
    return rand;
  }


  function toScreenXY( position) {
    var pos = position.clone();
    var projScreenMat = new THREE.Matrix4();
    projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
    projScreenMat.multiplyVector3( pos );

    var offset = {
      left: 0,
      top: 0
    };

    return { x: ( pos.x + 1 ) * WIDTH / 2 + offset.left,
      y: ( - pos.y + 1) * HEIGHT / 2 + offset.top };

  }
  function findOffset(element) {
    var pos = new Object();
    pos.left = pos.top = 0;
    if (element.offsetParent)
    {
      do
      {
        pos.left += element.offsetLeft;
        pos.top += element.offsetTop;
      } while (element = element.offsetParent);
    }
    return pos;
  }




  function createVector(sn ) {

    var  width = WIDTH, height = HEIGHT;
    var x = sn.position.x, y =sn.position.y, z = sn.position.z

    var p = new THREE.Vector3(x, y, z);
    var vector = p.project(camera);

    vector.x = (vector.x + 1) / 2 * width;
    vector.y = -(vector.y - 1) / 2 * height;

    return vector;
  }


  return THREE
});