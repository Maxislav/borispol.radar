var three = {
    navTabs: 8,
    angle: 90,
    init: function(html, success){
        var s = this;
        s.el = $(document.createElement('div')).html(html).css({
            opacity: 0,
            overflow: 'hidden'
        });
        $('.content').append(s.el);
        s.render();
        success && success.call(s);
    },
    render: function(){
        var s= this;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(12 , 960/560 , 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor('#fff');
      //   renderer.setSize(735, 420);
        var axes = new THREE.AxisHelper( 20 );
       //todo оси для визуализации при разработке
        scene.add(axes);

        var light = new THREE.SpotLight( "#fff" );
        light.position.set( 1000, 0, 0 );
        light.intensity = 1.4;

      //  light.castShadow = true;
        //light.shadowDarkness = 0.1;
       /* light.shadowBias = 1;
        light.exponent = 0.01;

        light.shadowCameraNear = 6;
        light.shadowCameraFar = 1000;

        light.shadowMapWidth = 1;
        light.shadowMapHeight = 1;*/


        scene.add(light );

        var sphereGeometry = new THREE.SphereGeometry(4,20,20);

        sphereGeometry

       // sphereGeometry.rotation.y =


        var sphereMaterial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('img/three/earth.jpg', {}, render),
            bumpMap: THREE.ImageUtils.loadTexture('img/three/earth_bump.jpg', {}, render),
            specularMap : THREE.ImageUtils.loadTexture('img/three/earth-specular.gif', {}, render),
            specular    : "#f2e8b9",
            shininess: 50,
            bumpScale:0.1
        } );

       // sphereMaterial.map = THREE.ImageUtils.loadTexture('img/three/earth.jpg', {}, render);
        var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
        sphere.position.x = 0;
        sphere.position.y = 0;
        sphere.position.z = 0;
        setTimeout(function(){
            sphere.rotation.set(0,Math.PI, 0)
            //renderer.render(scene, camera);
            sphere.updateMatrix();
        },5000);
        sphere.rotation.set(0, (s.angle+ s.getRotationAngle()).degToRad(), 0);

        scene.add(sphere);



        camera.position.x = 5; //red axis
        camera.position.y = 5; //green
        camera.position.z = 40; //blue axis
        camera.lookAt(sphere.position);

        //var container = document.getElementById( 'canvas' );
        var container = s.el[0].children[0];
        //document.body.appendChild( container );
        //s.el.append(container)

        //  renderer = new THREE.WebGLRenderer();
        renderer.setSize( 980, 560 );
        container.appendChild( renderer.domElement );

        //$("#WebGL-output").append(renderer.domElement);

       // renderer.render(scene, camera);

        function render(){
            renderer.render(scene, camera);
        }
       // s.animate(render, sphere)
        s.getRotationAngle()

    },
    animate: function(render, sphere){
        var angle = 0;

        function rotate(){
            setTimeout(function(){
                angle+=1;
                sphere.rotation.set(0,angle.degToRad(), 0);
                console.log(angle);
                render();
                rotate()
            },100)
        }

        rotate();
    },
    getRotationAngle: function(){
        var s = this;
        var d = new Date().toGmt();
        console.log(d);
        console.log(d.secondsFromStartDay());

        var secondsFromStartDay = d.secondsFromStartDay();

        var angle = 360*secondsFromStartDay/86400;
        console.log(angle);
        return angle;
    }



};
three.__proto__ = ModuleController;