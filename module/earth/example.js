/*
 Three.js "tutorials by example"
 Author: Lee Stemkoski
 Date: July 2013 (three.js v58)
 */


// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init() {
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 150, 400);
    camera.lookAt(scene.position);
    // RENDERER
    if (Detector.webgl)
        renderer = new THREE.WebGLRenderer({antialias: true});
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById('ThreeJS');
    container.appendChild(renderer.domElement);
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });
    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);
    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 250, 0);
    scene.add(light);

    var imagePrefix = "images/nebula-";
    var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".png";
    var skyGeometry = new THREE.CubeGeometry(10000, 10000, 10000);

    var imageURLs = [];
    for (var i = 0; i < 6; i++)
        imageURLs.push(imagePrefix + directions[i] + imageSuffix);
    var textureCube = THREE.ImageUtils.loadTextureCube(imageURLs);
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;
    var skyMaterial = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skyBox);

    ////////////
    // CUSTOM //
    ////////////

    // create custom material from the shader code above
    //   that is within specially labeled script tags

    var customMaterialAtmosphere = new THREE.ShaderMaterial(
        {
            uniforms: {
                "c": { type: "f", value: 0.5 },
                "p": { type: "f", value: 4.0 }
            },
            vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
            fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent
        });

    var sphereGeo = new THREE.SphereGeometry(100, 32, 16);

    var moonTexture = THREE.ImageUtils.loadTexture('images/moon.jpg');
    var moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
    var moon = new THREE.Mesh(sphereGeo, moonMaterial);
    scene.add(moon);

    // create secondary scene to add atmosphere effect

    atmosphereScene = new THREE.Scene();

    camera2 = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera2.position = camera.position;
    camera2.rotation = camera.rotation;
    atmosphereScene.add(camera2);

    var mesh = new THREE.Mesh(sphereGeo.clone(), customMaterialAtmosphere);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.2;
    // atmosphere should provide light from behind the sphere, so only render the back side
    mesh.material.side = THREE.BackSide;
    atmosphereScene.add(mesh);

    // clone earlier sphere geometry to block light correctly
    // and make it a bit smaller so that light blends into surface a bit
    var blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
    var sphere = new THREE.Mesh(sphereGeo.clone(), blackMaterial);
    sphere.scale.x = sphere.scale.y = sphere.scale.z = 1;
    atmosphereScene.add(sphere);

    ////////////////////////////////////////////////////////////////////////
    // final composer will blend composer2.render() results with the scene
    ////////////////////////////////////////////////////////////////////////

    // prepare secondary composer
    var renderTargetParameters =
    { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat, stencilBuffer: false };
    var renderTarget = new THREE.WebGLRenderTarget(SCREEN_WIDTH, SCREEN_HEIGHT, renderTargetParameters);
    composer2 = new THREE.EffectComposer(renderer, renderTarget);

    // prepare the secondary render's passes
    var render2Pass = new THREE.RenderPass(atmosphereScene, camera2);
    composer2.addPass(render2Pass);

    // prepare final composer
    finalComposer = new THREE.EffectComposer(renderer, renderTarget);

    // prepare the final render's passes
    var renderModel = new THREE.RenderPass(scene, camera);
    finalComposer.addPass(renderModel);

    var effectBlend = new THREE.ShaderPass(THREE.AdditiveBlendShader, "tDiffuse1");
    effectBlend.uniforms[ 'tDiffuse2' ].value = composer2.renderTarget2;
    effectBlend.renderToScreen = true;
    finalComposer.addPass(effectBlend);

    /////////
    // GUI //
    /////////

    gui = new dat.GUI();

    parameters = { c: 0.5, p: 4.0 };

    var cGUI = gui.add(parameters, 'c').min(0.0).max(1.0).step(0.01).name("c").listen();
    cGUI.onChange(
        function (value) {
            customMaterialAtmosphere.uniforms[ "c" ].value = parameters.c;
        }
    );

    var pGUI = gui.add(parameters, 'p').min(0.0).max(6.0).step(0.01).name("p").listen();
    pGUI.onChange(
        function (value) {
            customMaterialAtmosphere.uniforms[ "p" ].value = parameters.p;
        }
    );

    renderer.autoClear = false;
    renderer.setClearColorHex(0x000000, 0.0);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    if (keyboard.pressed("z")) {
        // do something
    }

    controls.update();
    stats.update();
}

function render() {
    composer2.render();
    finalComposer.render();
}

