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

        s.el.append('<div style="position: absolute;left: 5px; top: 5px; color: white">В разработке</div>')

        //s.render();
        if(window.THREE){
            s.render(window.THREE);
        }
        success && success.call(s);
    },
    render: function (THREE) {

       // return;

        var s = this;
        if(!s.el){
            return;
        }
        //var mask = app.mask.show(s.el);
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(12, 960 / 560, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({ antialias: true });




        renderer.setClearColor('#000');
        //   renderer.setSize(735, 420);
        var axes = new THREE.AxisHelper(20);
        //todo оси для визуализации при разработке
        // scene.add(axes);

        var light = new THREE.SpotLight("#fff");
        light.position.set(1000, -200, 0);
        light.intensity = 1.4;
        light.exponent = 1000;
        light.shadowMapWidth = 5;

        //  light.castShadow = true;
        //light.shadowDarkness = 0.1;
        /* light.shadowBias = 1;


         light.shadowCameraNear = 6;
         light.shadowCameraFar = 1000;

         light.shadowMapWidth = 1;
         light.shadowMapHeight = 1;*/


        scene.add(light);


        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);


        var sphereMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('img/three/earth.png', {}, render),
            bumpMap: THREE.ImageUtils.loadTexture('img/three/earth_bump.png', {}, render),
            specularMap: THREE.ImageUtils.loadTexture('img/three/earth-specular.jpg', {}, render),
            emissiveMap: THREE.ImageUtils.loadTexture('img/three/earth_night.jpg', {}, render),
            emissive: "#FFF",
            specular: "#f2e8b9",
            shininess: 50,
            bumpScale: 0.1
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


        /**
         * Облака.
         * @type {THREE.SphereGeometry}
         */
        THREE.TextureLoader.crossOrigin = "Access-Control-Allow-Origin";
        var cloudsGeometry = new THREE.SphereGeometry(4.05, 32, 32);
        var cloudsMesh;
        var cloudsMaterial = new THREE.MeshPhongMaterial({
            transparent: true,
            antialias: true,
            opacity: 1
        });
        cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
        s.setTexture()
          .then(function (image) {
              var texture = new THREE.Texture(image);
              texture.needsUpdate = true;
              cloudsMaterial.map = texture;
              scene.add(cloudsMesh);
              render()
          });



        /*var url = 'http://borispol.hol.es/img/bg/1.jpg?1476985174500';
        var image = document.createElement('img');
        image.crossOrigin = 'anonymous';
        image.src = url;
        var texture = new THREE.Texture(image);
        texture.needsUpdate = true;
        cloudsMaterial.map = texture;*/







        var customMaterialAtmosphere = new THREE.ShaderMaterial(
            {
                uniforms: {
                    "c": { type: "f", value: 0.2 },
                    "p": { type: "f", value: 2 }
                },
                //vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
                vertexShader: 'varying vec3 vNormal; void main() { vNormal = normalize( normalMatrix * normal ); gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}',
                //fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent
                fragmentShader: 'uniform float c; uniform float p; varying vec3 vNormal; void main() { float intensity = pow( c - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), p ); gl_FragColor = vec4( 0.7, 0.8, 1.0, 1.0 ) * intensity;}'
            });
        var meshGlow = new THREE.Mesh(cloudsGeometry.clone(), customMaterialAtmosphere);
        meshGlow.scale.x = meshGlow.scale.y = meshGlow.scale.z = 1.08;
        meshGlow.material.side = THREE.BackSide;
        scene.add(meshGlow);



       /* var map = THREE.ImageUtils.loadTexture( "sprite.png" );
        var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
        var sprite = new THREE.Sprite( material );
        scene.add( sprite );*/

        var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: new THREE.ImageUtils.loadTexture( 'module/earth/glow.png' ),
                useScreenCoordinates: false,
                color: new THREE.Color( 0x5270FB ), transparent: false, blending: THREE.AdditiveBlending
            });

       // var meshGlow = new THREE.Mesh(cloudsGeometry.clone(), customMaterialAtmosphere);

        var sprite = new THREE.Sprite( spriteMaterial );
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
    setTexture: function (url) {



        //var s = this;
        return new Promise(function (resolve, reject) {
            getImg('http://c.tile.openstreetmap.org/12/2396/1380.png', function (err, img) {
                if(err) reject(err);
                resolve(img)
            });
        })


    },

    events: function (render, camera, sphere) {
        var s = this;
        var dx, px;
        var dDeg;


        function mouseMove(e) {

            dx = e.pageX - px;
            dDeg = dx / 200;
            s.deg -= dDeg;
            s.setCameraPosition(camera);


            camera.lookAt(sphere.position);
            render()
        }

        s.el
            .on('mousedown', function (e) {
                px = e.pageX;
                s.el.on('mousemove', mouseMove)
            });

        $(document.body)
            .on('mouseup', function (e) {
                s.el.off('mousemove', mouseMove);
            })

    }
};
earth.__proto__ = ModuleController;

define(['threejs'], function (THREE) {
    window.THREE = THREE;
    if(earth.load){
        earth.render(window.THREE )
    }

});

function template(strings, ...keys) {
    return (function(...values) {
        var dict = values[values.length - 1] || {};
        var result = [strings[0]];
        keys.forEach(function(key, i) {
            var value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
}


function getImg(_url, callback) {

var appid = '19e738728f18421f2074f369bdb54e81';

    //'http://c.tile.openstreetmap.org/12/2396/1380.png'

    var urlTemplate =  template`http://c.tile.openstreetmap.org/${0}/${1}/${2}.png`;

    var url = urlTemplate(1,0,0);
    //var url = _url;
    var xhr = createCORSRequest("GET",url);
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onerror = function(e) {
        callback(e);
    };
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
            const imgData = xhr.response;

            const img = new window.Image();

            const blob = new window.Blob([new Uint8Array(imgData)], { type: 'image/png' });

            img.onload = function() {

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