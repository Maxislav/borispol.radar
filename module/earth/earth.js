/**
 * Created by Администратор on 11/7/15.
 */
var earth = {
    navTabs: 8,
    angle: 180,
    deg: (function(){

        return 45
    }()),
    cameraPosition:{
        x: 0,
        y: 5,
        z:40
    },
    init: function(html, success){
        var s = this;
        s.el = $(document.createElement('div')).html(html).css({
            opacity: 0,
            overflow: 'hidden',
            position: 'relative'
        });
        $('.content').append(s.el);


        s.el.append('<div style="position: absolute;left: 5px; top: 5px; color: white">В разработке</div>')

        s.render();
        success && success.call(s);
    },
    render: function(){

        var s= this;
        //var mask = app.mask.show(s.el);
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(12 , 960/560 , 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor('#000');
        //   renderer.setSize(735, 420);
        var axes = new THREE.AxisHelper( 20 );
        //todo оси для визуализации при разработке
        // scene.add(axes);

        var light = new THREE.SpotLight( "#fff" );
        light.position.set( 1000, -200, 0 );
        light.intensity = 1.4;
        light.exponent = 1000;
        light.shadowMapWidth= 5;

        //  light.castShadow = true;
        //light.shadowDarkness = 0.1;
        /* light.shadowBias = 1;


         light.shadowCameraNear = 6;
         light.shadowCameraFar = 1000;

         light.shadowMapWidth = 1;
         light.shadowMapHeight = 1;*/





        scene.add(light );



        var sphereGeometry = new THREE.SphereGeometry(4,20,20);



        var sphereMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture( 'img/three/earth.png', {}, render ),
            bumpMap: THREE.ImageUtils.loadTexture('img/three/earth_bump.png', {}, render),
            specularMap : THREE.ImageUtils.loadTexture('img/three/earth-specular.jpg', {}, render),
            emissiveMap : THREE.ImageUtils.loadTexture('img/three/earth_night.jpg', {}, render),
            //  normalMap: THREE.ImageUtils.loadTexture('img/three/earth_night.jpg', {}, render),
            emissive: "#FFF",
            //shading: 10,


            specular    : "#f2e8b9",
            shininess: 50,
            bumpScale:0.1
        } );
//sphereMaterial.map.anisotropy = 10;


        var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
        sphere.position.x = 0;
        sphere.position.y = 0;
        sphere.position.z = 0;
        sphere.rotation.set(0, s.getRotationAngle().degToRad(), 0);

        scene.add(sphere);



        var scale = 2, width = 256, height = 256;
        var canvas = document.createElement('canvas');
        canvas.width = scale*2*width;
        canvas.height = scale*2*height;
        var texturess = new THREE.Texture(canvas);

        var cloudsMaterial = new THREE.MeshPhongMaterial({
            map: texturess,
            /*map: THREE.ImageUtils.loadTexture('php/cloudscreator.php', { }, function(){
                //app.mask.remove(mask);
                scene.add(cloudsMesh);
                render()}),*/
            transparent: true,
            antialias: true,
            opacity: 0.6
        });



        //todo не удалять

       /* new cloudsLoader(canvas, function(){
            cloudsMaterial.map = new THREE.Texture(canvas);
            cloudsMaterial.map.needsUpdate = true;
            scene.add(cloudsMesh);
            //render();
        });*/

        var cloudsGeometry = new THREE.SphereGeometry(4.05,20,20);
        var cloudsMesh = new THREE.Mesh(cloudsGeometry,cloudsMaterial);

        cloudsMesh.rotation.set(0, s.getRotationAngle().degToRad(), 0);




        s.deg = s.getRotationAngle()-230;
        s.setCameraPosition(camera);
        camera.lookAt(sphere.position);


        var container = s.el[0].children[0];



        renderer.setSize( 980, 560 );
        container.appendChild( renderer.domElement );



        function render(){
            renderer.render(scene, camera);
        }

        s.animate(render, sphere, cloudsMesh);
        s.events(render, camera, sphere);

    },
    animate: function(render, sphere, cloudsMesh){
        var s = this;
        function rotate(){
            setTimeout(function(){
                sphere.rotation.set(0, s.getRotationAngle().degToRad(), 0);
                cloudsMesh.rotation.set(0, s.getRotationAngle().degToRad(), 0);
                render();
                rotate()
            },1000)
        }

        rotate();
    },
    getRotationAngle: function(){
        var s = this;
        var d = new Date().toGmt();
        //console.log(d);
        //console.log(d.secondsFromStartDay());

        var secondsFromStartDay = d.secondsFromStartDay();
        var angle = 360*secondsFromStartDay/86400;
        //  console.log(angle);
        return s.angle + angle;
    },
    setCameraPosition: function(camera){

        var s = this;
        var deg = s.deg;
        s.cameraPosition.z = Math.cos(deg.degToRad())*40;
        s.cameraPosition.x = Math.sin(deg.degToRad())*40;

        camera.position.x = s.cameraPosition.x; //red axis
        camera.position.y = s.cameraPosition.y; //green
        camera.position.z = s.cameraPosition.z; //blue axis

    },

    events: function(render, camera, sphere){
        var s = this;
        var dx, px;
        var dDeg;





        function mouseMove(e){

            dx = e.pageX -px;
            dDeg = dx/40;
            s.deg -=dDeg;
            s.setCameraPosition(camera);


            camera.lookAt(sphere.position);
            render()
        }
        s.el
            .on('mousedown', function(e){
                px = e.pageX;
                s.el.on('mousemove', mouseMove)
            });

        $(document.body)
            .on('mouseup', function(e){
                s.el.off('mousemove', mouseMove);
            })

    }
};
earth.__proto__ = ModuleController;
