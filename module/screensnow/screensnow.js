/**
 * Created by maxislav on 13.12.16.
 */
define(['threejs', 'jquery', 'module/screensnow/snowflake.js'], function (THREE, $, snowflake) {





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

    wind = (e.clientX - WIDTH/2)/(WIDTH/2)
    console.log(wind)

  })



  const snowflakes = [];

  for(var i = 0; i< 50; i++){
    const sn = snowflake()
    snowflakes.push(sn);
    scene.add(sn);
  }

  

  renderer.render(scene, camera);

  let date = new Date().getTime()

  function update () {
    renderer.render(scene, camera);
    const interval = new Date().getTime() - date;
    date = new Date().getTime()
    snowflakes.forEach(snowflake=>{
      snowflake.position.y-=interval*0.01
      snowflake.rotation.z+=interval*0.0001*snowflake._rotationC;
      snowflake.position.x +=interval*0.01*wind;
      if(snowflake.position.y<-100){
        snowflake.position.y = 100
        snowflake.position.x =  getRandom(-300, 300, true)

      }
    });

    
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


  return THREE
});