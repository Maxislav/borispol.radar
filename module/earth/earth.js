define(['threejs', 'module/earth/get-tile.js', 'js/moduleController.js', 'getimage'], function (THREE, getTile, prototype, getImg) {
  
  
  
  var _earth = {
    navTabs: 8,
    angle: 180,
    deg: {
      y: 45
    },
    cameraPosition: {
      x: 0,
      y: 10,
      z: 40
    },
    load: false,
    setTree: function (val) {
      this.THREE = val
    },
    init: function (html, success) {
      var s = this;
      s.el = $(document.createElement('div')).html(html).css({
        opacity: 0,
        overflow: 'hidden',
        position: 'relative'
      });
      $('.content').append(s.el);
      s.load = true;
      s.render(this.THREE);
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

      var textureLoader = new THREE.TextureLoader();

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
        // dynamic: true,
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
      //rEarthMesh.rotation.set(0, s.getRotationAngle().degToRad(), 0);
      scene.add(rEarthMesh);

      s.getTexture(2)
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

      var cloudsMaterial = new THREE.MeshPhongMaterial({
        transparent: true,
         //map:textureLoader.load('php/SatelliteImages.php', render),
        //alphaMap: textureLoader.load('php/SatelliteImages.php', render),
        //bumpMap: textureLoader.load('php/SatelliteImages.php', render),
        bumpScale: 0.01,
        opacity: 1.4,
        emissive: '0xffffff',
        //side: THREE.DoubleSide,
        color: "#FFFFFF"
      });

      getImg('php/SatelliteImages.php', true)
        .then(function (_img) {
          var img = _img.toCanvas(2048, 1024, 2048, 924, 0,50 );
          var texture = new THREE.Texture(img);
          texture.needsUpdate = true;
          cloudsMaterial.alphaMap = texture;
          cloudsMaterial.bumpMap = texture;

          cloudsMaterial.needsUpdate = true;
          render()
        })



      var cloudsMesh;
      cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);


      //let atmosphereMesh = new THREE.Mesh(cloudsGeometry.clone(), cloudsMaterial);
      rEarthMesh.add(cloudsMesh);


      var customMaterial = new THREE.ShaderMaterial(
        {
          uniforms: {
            "c": {type: "f", value: 0.1},
            "p": {type: "f", value: 2},
            glowColor: {type: "c", value: new THREE.Color(0x7e8ec0)},
            viewVector: {type: "v3", value: camera.position}
          },
          vertexShader: `
              uniform vec3 viewVector;
              uniform float c;
              uniform float p;
              varying float intensity;
              void main()
              {
                  vec3 vNormal = normalize(normalMatrix * normal);
                  vec3 vNormel = normalize(normalMatrix * viewVector);
                  intensity = pow(c - dot(vNormal, vNormel), (p));
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
              `
          ,
          fragmentShader: `
            uniform vec3 glowColor;
            varying float intensity;
            void main()
            {
                vec3 glow = glowColor * intensity;
                gl_FragColor = vec4(glow, 1.0);
            }`
          ,
          //side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true
        });

      var moonGlow = new THREE.Mesh(cloudsGeometry.clone(), customMaterial);
      // moonGlow.position = moon.position;
      moonGlow.scale.multiplyScalar(1.2);
     /// scene.add(moonGlow);


      var customMaterialAtmosphere = new THREE.ShaderMaterial(
        {
          uniforms: {
            "c": {type: "f", value: 0.1},
            "p": {type: "f", value: 2.5}
          },
          //vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
          vertexShader: 'varying vec3 vNormal; void main() { vNormal = normalize( normalMatrix * normal ); gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}',
          //fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent
          fragmentShader: 'uniform float c; uniform float p; varying vec3 vNormal; void main() { float intensity = pow( c - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), p ); gl_FragColor = vec4( 0.7, 0.8, 1.0, 1.0 ) * intensity;}'
        });
      var meshGlow = new THREE.Mesh(cloudsGeometry.clone(), customMaterialAtmosphere);
      meshGlow.scale.x = meshGlow.scale.y = meshGlow.scale.z = 1.2;
      meshGlow.material.side = THREE.BackSide;
      cloudsMesh.add(meshGlow);

      /*
       var map = THREE.ImageUtils.loadTexture( "module/earth/glow.png" );
       var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
       var sprite = new THREE.Sprite( material );
       scene.add( sprite );*/

      /*var spriteMaterial = new THREE.SpriteMaterial({
       map: new THREE.TextureLoader().load("module/earth/glow.png"),
       color: new THREE.Color(0x5270FB), transparent: false, blending: THREE.AdditiveBlending
       });*/

      // var meshGlow = new THREE.Mesh(cloudsGeometry.clone(), customMaterialAtmosphere);

      //var sprite = new THREE.Sprite(spriteMaterial);
      //sprite.scale.set(7, 7, 1);
      //spriteMesh =

      //rEarthMesh.add(sprite); // this centers the glow at the mesh


      s.deg.y = s.getRotationAngle() - 230;
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
         // cloudsMesh.rotation.set(0, s.getRotationAngle().degToRad(), 0);
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
      var deg = s.deg.y;
      s.cameraPosition.z = Math.cos(deg.degToRad()) * 40;
      s.cameraPosition.x = Math.sin(deg.degToRad()) * 40;

      camera.position.x = s.cameraPosition.x; //red axis
      camera.position.y = s.cameraPosition.y; //green
      camera.position.z = s.cameraPosition.z; //blue axis


    },
    getTexture: function (zoom) {
      zoom = zoom || 1;
      let arr = [];
      let n = Math.pow(2, zoom);
      var myWorker = new Worker("module/earth/worker.js");
      for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
          arr.push(
            getTile( [zoom, x, y] )
              .then(img=>{
                return {
                  data: [zoom, x, y],
                  img
                }
              })
          )
        }
      }
      return Promise.all(arr)
        .then(arr=> {
          return new Promise((resolve, reject)=> {
            let elCanvas = document.createElement('canvas');
            elCanvas.setAttribute('width', n * 256 + '');
            elCanvas.setAttribute('height', n * 256 + '');
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

            myWorker.onmessage = function (e) {
              distData = e.data.data;
              yStart = e.data.yStart;
              yEnd = e.data.yEnd;
              var c = document.createElement("canvas");
              c.width = elCanvas.width;
              c.height = yEnd - yStart;
              var ctx = c.getContext("2d");
              var imgData = ctx.createImageData(elCanvas.width, elCanvas.height);
              let k = 0;
              imgData.data.set(distData);
              ctx.putImageData(imgData, 0, (-yStart));
              resolve(resize(c));
            };

            function resize(canvas) {
              var c = document.createElement("canvas");
              c.width = 2048;
              c.height = 1024;
              var ctx = c.getContext("2d");
              ctx.drawImage(canvas, 0, 0, 2048, 1024);
              return c
            }

          });
        })
    },

    events: function (render, camera, sphere) {
      var s = this;
      var dx = 0, px=0;
      var dDeg, sDeg;


      function mouseMove(e) {
        dx = (e.pageX || e.originalEvent.changedTouches[0].clientX) - px;
        dDeg = dx / 5;
        s.deg.y = sDeg - dDeg;
        s.setCameraPosition(camera);
        camera.lookAt(sphere.position);
        render()
      }

      s.el
        .on('mousedown touchstart', function (e) {
          sDeg = s.deg.y;
          px = e.pageX || e.originalEvent.changedTouches[0].clientX;
          s.el.on('mousemove touchmove', mouseMove)
        });

      $(document.body)
        .on('mouseup touchend', function (e) {
          s.el.off('mousemove touchmove', mouseMove);
        })

    }
  };
  Earth.prototype = prototype;
  function Earth() {
    for(var opt in _earth){
      this[opt] = _earth[opt]
    }
  }

  var earth = new Earth();
  earth.setTree(THREE);
  return earth
});
