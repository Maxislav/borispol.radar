var three = {
    navTabs: 5,
    init: function(html, success){
        var s = this;
        s.el = $(document.createElement('div')).html(html).css({
            opacity: 0,
            overflow: 'hidden'
        })
        $('.content').append(s.el);
        s.render()
        success && success.call(s);
    },
    render: function(){
        var s= this;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45 , window.innerWidth / window.innerHeight , 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xEEEEEE);
      //   renderer.setSize(735, 420);
        var axes = new THREE.AxisHelper( 20 );
        scene.add(axes);
        var light = new THREE.SpotLight( 0xffffff );
        light.position.set( -40, 60, -10 );

        light.shadowDarkness = 0.1;

        light.shadowCameraNear = 6;
        light.shadowCameraFar = 13;

        scene.add(light );
      //  var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
      //  var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
      //  var plane = new THREE.Mesh(planeGeometry,planeMaterial);
       /* plane.rotation.x=-0.5*Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;
        scene.add(plane);*/
      /*  var cubeGeometry = new THREE.CubeGeometry(4,4,4);
        var cubeMaterial = new THREE.MeshBasicMaterial(
            {color: 0xff0000, wireframe: true});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;
        scene.add(cube);*/
        var sphereGeometry = new THREE.SphereGeometry(4,20,20);
        /*var sphereMaterial = new THREE.MeshBasicMaterial({
                color: 0x7777ff, wireframe: true
            });*/

        var sphereMaterial = new THREE.MeshPhongMaterial({
                color: 0x7777ff
                //alphaMap: 000000
            });
        var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
        sphere.position.x = 20;
        sphere.position.y = 4;
        sphere.position.z = 2;
        scene.add(sphere);
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);

        //var container = document.getElementById( 'canvas' );
        var container = s.el[0];
        //document.body.appendChild( container );
        //s.el.append(container)

        //  renderer = new THREE.WebGLRenderer();
        renderer.setSize( 980, 560 );
        container.appendChild( renderer.domElement );

        //$("#WebGL-output").append(renderer.domElement);

        renderer.render(scene, camera);
    }

}
three.__proto__ = ModuleController