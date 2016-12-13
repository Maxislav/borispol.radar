/**
 * Created by maxislav on 13.12.16.
 */
define(['threejs'], function (THREE){


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
  ]
 
  
  return function () {
    const planeGeometry = new THREE.PlaneGeometry( 5, 5, 32 );
    //const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

    const material = new THREE.MeshPhongMaterial({
      transparent: true,
      //map:new THREE.TextureLoader().load('img/snow1.gif', ()=>renderer.render(scene, camera)),
      map:new THREE.TextureLoader().load( snow[getRandom(0,2,true)]),
      opacity: 1,
      //color: "0хFFFFFF",
      side: THREE.DoubleSide
    });


    const plane = new THREE.Mesh( planeGeometry, material );
    
    
    
    plane.position.z =  getRandom(-600, -200, true)
    plane.position.x =  getRandom(-300, 300, true)
    plane.position.y = getRandom(200, 400, true)
    plane._rotationC = getRandom(-10, +10)
    /*snowflake.position.z = -300;
     snowflake.position.x = 0// -WIDTH/2;
     snowflake.position.y = 0//-HEIGHT/2;*/
    return plane
    
  }
  
});