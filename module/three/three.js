var three = {
    navTabs: 8,
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
       // scene.add(axes);

        var light = new THREE.SpotLight( "#fff" );
        light.position.set( -40, 0, 40 );

        light.castShadow = true;
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


        var sphereMaterial = new THREE.MeshPhongMaterial( );

        sphereMaterial.map = THREE.ImageUtils.loadTexture('img/three/earth.jpg', {}, render);
        var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
        sphere.position.x = 0;
        sphere.position.y = 0;
        sphere.position.z = 0;
        setTimeout(function(){
            sphere.rotation.set(0,Math.PI, 0)
            //renderer.render(scene, camera);
            sphere.updateMatrix();
        },5000);

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

        s.rotate(render, sphere)
    },
    rotate: function(render, sphere){
        var angle = 0;

        function rotate(){
            setTimeout(function(){
                angle+=0.001;
                sphere.rotation.set(0,angle, 0)
                render();
                rotate()
            },20)
        }

        rotate();

    }

};
three.__proto__ = ModuleController;