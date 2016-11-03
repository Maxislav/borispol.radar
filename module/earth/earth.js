/**
 * Created by Администратор on 11/7/15.
 */
var earth = {
  navTabs: 8,
  angle: 180,
  deg: (function () {
    return 45
  }()),
  cameraPosition: {
    x: 0,
    y: 5,
    z: 40
  },
  load: false,
  init: function (html, success) {
    var s = this;
    s.el = $(document.createElement('div')).html(html).css({
      opacity: 0,
      overflow: 'hidden',
      position: 'relative'
    });
    $('.content').append(s.el);
    s.load = true;

  //  s.el.append('<div style="position: absolute;left: 5px; top: 5px; color: white">В разработке</div>');

    //s.render();
    if (window.THREE) {
      s.render(window.THREE);
    }
    success && success.call(s);
  },
  render: function (THREE) {
    var s = this;
    if (!s.el) {
      return;
    }
    //console.log(s.el);

    setTimeout(function () {
      app.mask.show(s.el);
    }, 1);
    //var mask = app.mask.show(s.el);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(12, 960 / 560, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({antialias: true});


    renderer.setClearColor('#000');
    //   renderer.setSize(735, 420);
    var axes = new THREE.AxisHelper(20);
    //todo оси для визуализации при разработке
    // scene.add(axes);

    var light = new THREE.SpotLight("#fff");
    light.position.set(1000, -200, 0);
    light.intensity = 1.8;
    light.exponent = 1000;
    light.shadowMapWidth = 10000;

    var light2 = new THREE.SpotLight("#fff");
    light2.position.set(-1000, 200, 0);
    light2.intensity = 0.4;
    light2.exponent = 1000;

    var textureLoader =  new THREE.TextureLoader();

    //  light.castShadow = true;
    //light.shadowDarkness = 0.1;
    /* light.shadowBias = 1;


     light.shadowCameraNear = 6;
     light.shadowCameraFar = 1000;

     light.shadowMapWidth = 1;
     light.shadowMapHeight = 1;*/


    scene.add(light);
    scene.add(light2);


    var sphereGeometry = new THREE.SphereGeometry(4, 64, 32);
    var sphereMaterial = new THREE.MeshPhongMaterial({
      //map: THREE.ImageUtils.loadTexture('img/three/osm.png', {}, render),
      //map: THREE.ImageUtils.loadTexture('img/three/earth.png', {}, render),
     // map: textureLoader.load('img/three/earth.png', render),
      //bumpMap: textureLoader.load('img/three/earth_bump.png', render),
      needsUpdate: true,
      //specularMap: textureLoader.load('img/three/earth-specular.jpg', render),
      //emissiveMap: textureLoader.load('img/three/earth_night.jpg',  render),
     // emissive: "#FFF",
     // specular: "#f2e8b9",
      dynamic: true,
      shininess: 50
     // bumpScale: 0.1
    });






    /**
     * Планета с текстурами
     * @type {THREE.Mesh}
     */
    var rEarthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    rEarthMesh.position.x = 0;
    rEarthMesh.position.y = 0;
    rEarthMesh.position.z = 0;
    rEarthMesh.rotation.set(0, s.getRotationAngle().degToRad(), 0);
    scene.add(rEarthMesh);

    s.getTexture(3)
      .then(function (image) {
        var texture = new THREE.Texture(image);
        sphereMaterial.map = texture;
        texture.needsUpdate = true;
        sphereMaterial.needsUpdate = true;
        app.mask.hide(s.el);
        console.log('update');
        render()
      });

    /**
     * Облака.
     * @type {THREE.SphereGeometry}
     */
    THREE.TextureLoader.crossOrigin = "Access-Control-Allow-Origin";
    var cloudsGeometry = new THREE.SphereGeometry(4.05, 32, 32);
    var cloudsMesh;
    var cloudsMaterial = new THREE.MeshPhongMaterial({
      transparent: true,
     // map:textureLoader.load('php/SatelliteImages.php', render),
      alphaMap: textureLoader.load('php/SatelliteImages.php', render),
      opacity: 1,
      color: "0хFFFFFF"
    });
    cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);


    let atmosphereMesh = new THREE.Mesh(cloudsGeometry.clone(), cloudsMaterial);
    rEarthMesh.add(atmosphereMesh);







    var customMateriall = new THREE.ShaderMaterial(
      {
        uniforms:
        {
          "c":   { type: "f", value: 0.2 },
          "p":   { type: "f", value: 3 },
          glowColor: { type: "c", value: new THREE.Color(0xd9ddff) },
          viewVector: { type: "v3", value: camera.position }
        },
       // vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
        vertexShader: "uniform vec3 viewVector;         uniform float c;     uniform float p;     varying float intensity;     void main()     {       vec3 vNormal = normalize( normalMatrix * normal );       vec3 vNormel = normalize( normalMatrix * viewVector );       intensity = pow( c - dot(vNormal, vNormel), p );        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );     }",
        //fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        fragmentShader:"uniform vec3 glowColor;         varying float intensity;     void main()     {       vec3 glow = glowColor * intensity;       gl_FragColor = vec4( glow, 1.0 );     }",
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      }   );

    var moonGlow = new THREE.Mesh( cloudsGeometry.clone(), customMateriall );
   // moonGlow.position = moon.position;
    moonGlow.scale.multiplyScalar(1.1);
    scene.add( moonGlow );









    var customMaterialAtmosphere = new THREE.ShaderMaterial(
      {
        uniforms: {
          "c": {type: "f", value: 0.2},
          "p": {type: "f", value: 2}
        },
        //vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
        vertexShader: 'varying vec3 vNormal; void main() { vNormal = normalize( normalMatrix * normal ); gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}',
        //fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent
        fragmentShader: 'uniform float c; uniform float p; varying vec3 vNormal; void main() { float intensity = pow( c - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), p ); gl_FragColor = vec4( 0.7, 0.8, 1.0, 1.0 ) * intensity;}'
      });
    var meshGlow = new THREE.Mesh(cloudsGeometry.clone(), customMateriall);
    meshGlow.scale.x = meshGlow.scale.y = meshGlow.scale.z = 1.08;
    meshGlow.material.side = THREE.BackSide;
    //scene.add(meshGlow);

/*
     var map = THREE.ImageUtils.loadTexture( "module/earth/glow.png" );
     var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
     var sprite = new THREE.Sprite( material );
     scene.add( sprite );*/

    var spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load("module/earth/glow.png"),
        color: new THREE.Color(0x5270FB), transparent: false, blending: THREE.AdditiveBlending
      });

    // var meshGlow = new THREE.Mesh(cloudsGeometry.clone(), customMaterialAtmosphere);

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(7, 7, 1);
    //spriteMesh =

    rEarthMesh.add(sprite); // this centers the glow at the mesh


    s.deg = s.getRotationAngle() - 230;
    s.setCameraPosition(camera);
    camera.lookAt(rEarthMesh.position);


    var container = s.el[0].children[0];


    renderer.setSize(980, 560);
    container.appendChild(renderer.domElement);


    function render() {
      renderer.render(scene, camera);
    }

    s.animate(render, rEarthMesh, cloudsMesh);
    s.events(render, camera, rEarthMesh);

  },
  animate: function (render, sphere, cloudsMesh) {
    var s = this;

    function rotate() {
      setTimeout(function () {
        sphere.rotation.set(0, s.getRotationAngle().degToRad(), 0);
        cloudsMesh.rotation.set(0, s.getRotationAngle().degToRad(), 0);
        render();
        rotate()
      }, 1000)
    }

    rotate();
  },
  getRotationAngle: function () {
    var s = this;
    var d = new Date().toGmt();
    //console.log(d);
    //console.log(d.secondsFromStartDay());

    var secondsFromStartDay = d.secondsFromStartDay();
    var angle = 360 * secondsFromStartDay / 86400;
    //  console.log(angle);
    return s.angle + angle;
  },
  setCameraPosition: function (camera) {

    var s = this;
    var deg = s.deg;
    s.cameraPosition.z = Math.cos(deg.degToRad()) * 40;
    s.cameraPosition.x = Math.sin(deg.degToRad()) * 40;

    camera.position.x = s.cameraPosition.x; //red axis
    camera.position.y = s.cameraPosition.y; //green
    camera.position.z = s.cameraPosition.z; //blue axis

  },
  getTexture: function (zoom) {
    zoom = zoom || 1;
    let arr = [];
    let n = Math.pow(2,zoom);
    var myWorker = new Worker("module/earth/worker.js");
    for(let x =0 ; x<n; x++){
      for (let y = 0; y<n ; y++){
        arr.push(
          new Promise(function (resolve, reject) {
            let data = [zoom, x, y];
            getImg(data, function (err, img) {
              if (err) reject(err);
              resolve({
                data,
                img
              })
            });
          })
        )
      }
    }


    return Promise.all(arr)
      .then(arr=> {
        return new Promise((resolve, reject)=> {
          let elCanvas = document.createElement('canvas');
          elCanvas.setAttribute('width', n*256+'');
          elCanvas.setAttribute('height', n*256+'');
          let context = elCanvas.getContext('2d');
          arr.forEach(item=> {
            context.drawImage(item.img, item.data[1] * 256, item.data[2] * 256);
          });

          let imageData = context.getImageData(0, 0, elCanvas.width, elCanvas.height).data;
          myWorker.postMessage({
            data: imageData,
            width: elCanvas.width,
            height: elCanvas.height
          });
          let distData;
          let yStart = null;
          let yEnd = null;

          myWorker.onmessage = function(e) {
            distData = window.color = e.data.data;
            yStart = e.data.yStart;
            yEnd = e.data.yEnd;
            var c= document.createElement("canvas");
            c.width = elCanvas.width;
            c.height = yEnd - yStart;
            var ctx=c.getContext("2d");
            var imgData =ctx.createImageData(elCanvas.width,elCanvas.height);
            for (var i=0;i<imgData.data.length;i+=4){
              imgData.data[i+0]=distData[i+0];
              imgData.data[i+1]=distData[i+1];
              imgData.data[i+2]=distData[i+2];
              imgData.data[i+3]=distData[i+3];
            }
            ctx.putImageData(imgData,0,(-yStart));
            var url = c.toDataURL();
            let img = new Image();
            img.onload = function () {
              resolve(img);
              //document.body.appendChild(img)
            };
            img.src = url;
          };
        });
      })
  },

  events: function (render, camera, sphere) {
    var s = this;
    var dx, px;
    var dDeg;


    function mouseMove(e) {

      dx = (e.pageX || e.originalEvent.changedTouches[0].clientX) - px;
      dDeg = dx / 100;
      s.deg -= dDeg;
      s.setCameraPosition(camera);


      camera.lookAt(sphere.position);
      render()
    }

    s.el
      .on('mousedown touchstart', function (e) {
        px = e.pageX || e.originalEvent.changedTouches[0].clientX;
        s.el.on('mousemove touchmove', mouseMove)
      });

    $(document.body)
      .on('mouseup touchend', function (e) {
        s.el.off('mousemove touchmove', mouseMove);
      })

  }
};
earth.__proto__ = ModuleController;

define(['threejs'], function (THREE) {
  window.THREE = THREE;
  if (earth.load) {
    earth.render(window.THREE)
  }

});

function template(strings, ...keys) {
  return (function (...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function (key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}


function getImg(args, callback) {

  //var appid = '19e738728f18421f2074f369bdb54e81';

  //var urlTemplate = template`http://c.tile.openstreetmap.org/${0}/${1}/${2}.png`;

  /**
  h = roads only
  m = standard roadmap
  p = terrain
  r = somehow altered roadmap
  s = satellite only
  t = terrain only
  y = hybrid
   */

  var urlTemplate = template`http://mt1.google.com/vt/lyrs=s&x=${1}&y=${2}&z=${0}`;
  //var urlTemplate = template`php/loadtile.php?x=${1}&y=${2}&z=${0}`;
  var url;
  if(Array.isArray(args)){
    url = urlTemplate.apply(null, args);
  }else{
    url = args
  }



  var xhr = createCORSRequest("GET", url);
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onerror = function (e) {
    callback(e);
  };
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
      const imgData = xhr.response;

      const img = new window.Image();

      const blob = new window.Blob([new Uint8Array(imgData)], {type: 'image/png'});

      img.onload = function () {

        (window.URL || window.webkitURL).revokeObjectURL(img.src);
        callback && callback(null, img);
      };

      img.src = (window.URL || window.webkitURL).createObjectURL(blob);


    } else {
      callback(new Error(xhr.statusText));
    }
  };
  xhr.send();
  return xhr;
}
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}