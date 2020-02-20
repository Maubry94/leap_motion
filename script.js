import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { leap as frame } from './leap.js'

let world;
const dt = 1 / 60

// To be synced
let meshes = [];
let bodies = [];

initCannon()

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () => {
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.set(15, 4, 0); // z , y , x 
camera.quaternion.setFromAxisAngle(
    new THREE.Vector3(0, 1, 0), Math.PI / 2
);

camera.position.z = 0
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
//renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

/**
 * Orbit controls
 */
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.zoomSpeed = 0.3

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)


/**
 * Element
 */

// const tableau = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 32),
//     new THREE.MeshLambertMaterial({ color: 0xffff00 }));
// scene.add(tableau)
// tableau.rotation.x = - Math.PI / 4
// tableau.position.y = 0
// tableau.position.z = -2
// tableau.position.x = 10


//  MAIN MATERIALS
const geometry = new THREE.SphereGeometry(0.1, 32, 32)
const material = new THREE.MeshLambertMaterial({ color: 0xff00000 })
const material2 = new THREE.MeshLambertMaterial({ color: 0x0000ff })

// Tableaux mains

let tips = []
let dips = []
let pips = []
let mcps = []
let carps = []

// 'Points' de la main 1 
for (let i = 0; i < 5; i++) {
    const ball_1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x00ff00 })); tips.push(ball_1)
    const ball_2 = new THREE.Mesh(geometry, material); dips.push(ball_2)
    const ball_3 = new THREE.Mesh(geometry, material); pips.push(ball_3)
    const ball_4 = new THREE.Mesh(geometry, material); mcps.push(ball_4)
    const ball_5 = new THREE.Mesh(geometry, material); carps.push(ball_5)

}

// 'Points' de la main 2
for (let i = 0; i < 5; i++) {
    const ball_1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x00ff00 })); tips.push(ball_1)
    const ball_2 = new THREE.Mesh(geometry, material2); dips.push(ball_2)
    const ball_3 = new THREE.Mesh(geometry, material2); pips.push(ball_3)
    const ball_4 = new THREE.Mesh(geometry, material2); mcps.push(ball_4)
    const ball_5 = new THREE.Mesh(geometry, material2); carps.push(ball_5)

}


// ajouter touts les 'points' à la scene 
for (let i = 0; i < 10; i++) {
    scene.add(tips[i])
    scene.add(dips[i])
    scene.add(pips[i])
    scene.add(mcps[i])
    scene.add(carps[i])
}




// Plane
const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);

const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x777777
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
scene.add(plane);


// Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 20, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
meshes.push(cube);
scene.add(cube);

for (let i = 0; i < 10; i++) {
    const cube_2 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2, 20, 1), new THREE.MeshPhongMaterial({
        color: 0x2DE1FC
    }))
    meshes.push(cube_2);
    scene.add(cube_2);

}



function initCannon() {
    // Setup world
    world = new CANNON.World();

    world.gravity.set(0, -10, 0);
    //world.broadphase = new CANNON.NaiveBroadphase();

    // Create boxes invisible
    let mass = 5
    let radius = 1.3

    const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    const boxBody = new CANNON.Body({
        mass: mass
    });

    boxBody.addShape(boxShape);
    // physique Position cube x,y,z
    boxBody.position.set(0, 10, 0);
    world.add(boxBody);
    bodies.push(boxBody)


    for (let i = 0; i < 10; i++) {
        const boxShape_2 = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        const boxBody_2 = new CANNON.Body({
            mass: 0.1
        });

        boxBody_2.addShape(boxShape_2);

        if (i == 9) boxBody_2.position.set(-5, 16, 0)
        else if (i >= 9) boxBody_2.position.set(-5, 14, 4 + 21 - i * 2.5)
        else if (i >= 7) boxBody_2.position.set(-5, 10, 4 + 15 - i * 2.5)
        else if (i >= 4) boxBody_2.position.set(-5, 6, 4 + 9 - i * 2.5)
        else if (i >= 0) boxBody_2.position.set(-5, 2, 4 - i * 2.5)


        // // physique Position cube x,y,z
        // boxBody_2.position.set(-5, 2, 0);


        world.add(boxBody_2);
        bodies.push(boxBody_2)

    }


    // Create a plane who take a gravity
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({
        mass: 0
    });

    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.add(groundBody);
}
console.log(bodies)

function updatePhysic() {
    world.step(dt)
    for (let i = 0; i !== meshes.length; i++) {
        meshes[i].position.copy(bodies[i].position);
        meshes[i].quaternion.copy(bodies[i].quaternion);


        // meshes[i].scale.x = 2
        // meshes[i].scale.y = 2
        // meshes[i].scale.z = 2
    }
}



/**
 * Loop
 */

let hand1;
let hand2;

//Variables pour éviter bugs sur le grab
let time_grab_hand1 = 1
let time_grab_hand2 = 1


const loop = () => {
    window.requestAnimationFrame(loop)

    // controls.update()

    if (frame && frame.hands && frame.hands.length > 0) {



        // hand 1 = first hands who enter in zone
        hand1 = frame.hands[0];


        // let lol = frame.interactionBox.normalizePoint(hand1.palmPosition, true); // [0.65, 0.17, 0.09]
        // let lil = lol[0] * 2 - 1
        // if (lil == 1) camera.rotation.y += -0.01
        // if (lil == -1) camera.rotation.y += 0.01
        // console.log(camera.rotation.y)
        // if (camera.rotation.y < -1.5707963267948966) camera.rotation.y = -1.5707963267948966

        // PLACER LES POINTS DE LA MAIN 1
        for (let i = 0; i < 5; i++) {

            tips[i].position.z = -hand1.fingers[i].tipPosition[0] / 20
            tips[i].position.y = hand1.fingers[i].tipPosition[1] / 20 - 5
            tips[i].position.x = hand1.fingers[i].tipPosition[2] / 20



            // if (camera.rotation.y > 1.5707963267948966) tips[i].position.x = (hand1.fingers[i].tipPosition[2] / 20) + 1.5707963267948966 * 10 - camera.rotation.y * 10
            // if (camera.rotation.y < 1.5707963267948966) tips[i].position.x = -(hand1.fingers[i].tipPosition[2] / 20) + 1.5707963267948966 * 10 - camera.rotation.y * 10

            // tips[i].position.x = (hand1.fingers[i].tipPosition[2] / 20) + 1.5707963267948966 * 10 - camera.rotation.y * 10

            pips[i].position.z = -hand1.fingers[i].pipPosition[0] / 20
            pips[i].position.y = hand1.fingers[i].pipPosition[1] / 20 - 5
            pips[i].position.x = hand1.fingers[i].pipPosition[2] / 20

            dips[i].position.z = -hand1.fingers[i].dipPosition[0] / 20
            dips[i].position.y = hand1.fingers[i].dipPosition[1] / 20 - 5
            dips[i].position.x = hand1.fingers[i].dipPosition[2] / 20

            mcps[i].position.z = -hand1.fingers[i].mcpPosition[0] / 20
            mcps[i].position.y = hand1.fingers[i].mcpPosition[1] / 20 - 5
            mcps[i].position.x = hand1.fingers[i].mcpPosition[2] / 20

            carps[i].position.z = - hand1.fingers[i].carpPosition[0] / 20
            carps[i].position.y = hand1.fingers[i].carpPosition[1] / 20 - 5
            carps[i].position.x = hand1.fingers[i].carpPosition[2] / 20

            tips[i].position.x = (hand1.fingers[i].tipPosition[2] / 20) + 1.5707963267948966 * 10 - camera.rotation.y * 10
            pips[i].position.x = (hand1.fingers[i].pipPosition[2] / 20) + 1.5707963267948966 * 10 - camera.rotation.y * 10
            dips[i].position.x = (hand1.fingers[i].dipPosition[2] / 20) + 1.5707963267948966 * 10 - camera.rotation.y * 10
            mcps[i].position.x = (hand1.fingers[i].mcpPosition[2] / 20) + 1.5707963267948966 * 10 - camera.rotation.y * 10
            carps[i].position.x = (hand1.fingers[i].carpPosition[2] / 20) + 1.5707963267948966 * 10 - camera.rotation.y * 10

        }

        //Update la variable pour éviter les bugs du grab
        time_grab_hand1 += 1 / 60

        // GRAB MAIN 1
        if (
            (hand1.grabStrength > 0.99)                                                                        // Si la force du grab est supérieur à 0.99
            && (mcps[2].position.z - hand1.palmNormal[0] < bodies[0].position.z + 1)    // Si la POSITION Z du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION Z du cube)
            && (mcps[2].position.z - hand1.palmNormal[0] > bodies[0].position.z - 1)    // Si la POSITION Z du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION Z du cube)
            && (mcps[2].position.y + (hand1.palmNormal[1]) < bodies[0].position.y + 2)  // Si la POSITION Y du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION Y du cube)
            && (mcps[2].position.y + (hand1.palmNormal[1]) > bodies[0].position.y - 2)   // Si la POSITION Y du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION Y du cube)
            && (mcps[2].position.x + 2 < bodies[0].position.x + 1)                                   // Si la POSITION X du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION X du cube)
            && (mcps[2].position.x + 2 > bodies[0].position.x - 1)                                    // Si la POSITION X du métacarp du majeur de la main 1 est dans la zone de collision du cube ( POSITION X du cube)


        ) {
            time_grab_hand1 = 0; // Pour éviter le bug GRAB
        }
        if (time_grab_hand1 < 0.05) {

            // SET les positions du cube dans la main 1
            bodies[0].position.x = mcps[2].position.x + 2
            bodies[0].position.y = mcps[2].position.y + (hand1.palmNormal[1])
            bodies[0].position.z = mcps[2].position.z - hand1.palmNormal[0]


            // Si un mouvement de la main 1 brusque est détecté, ajoute de la vélocité au cube
            if (hand1.palmVelocity[0] < -100) {
                bodies[0].velocity.x = -10
                bodies[0].velocity.y = 5
            }

            // Rotate le cube BIEN au centre de la main peu importe la position de la main 1
            let axis = new CANNON.Vec3(1, 0, 0);
            let angle = 0

            if (hand1.palmNormal[1] < 0) { // Si la main est orienté en haut
                axis = new CANNON.Vec3(1, 0, 0);
                angle = -(Math.PI / 2) * - hand1.palmNormal[0]
            }
            else {  // Si la main est orienté en bas
                axis = new CANNON.Vec3(1, 0, 0);
                angle = (Math.PI / 2) * - hand1.palmNormal[0]
            }
            bodies[0].quaternion.setFromAxisAngle(axis, angle);


        }


        // SI UNE SECONDE MAIN ENTRE DANS LA ZONE DU LEAP
        if (frame && frame.hands && frame.hands.length > 1) {
            // hand 2 = second hand who enter in zone
            hand2 = frame.hands[1];

            // PLACER LES POINTS DE LA MAIN 2
            for (let i = 0; i < 5; i++) {

                tips[i + 5].position.z = -hand2.fingers[i].tipPosition[0] / 20
                tips[i + 5].position.y = hand2.fingers[i].tipPosition[1] / 20 - 5
                tips[i + 5].position.x = hand2.fingers[i].tipPosition[2] / 20

                pips[i + 5].position.z = -hand2.fingers[i].pipPosition[0] / 20
                pips[i + 5].position.y = hand2.fingers[i].pipPosition[1] / 20 - 5
                pips[i + 5].position.x = hand2.fingers[i].pipPosition[2] / 20

                dips[i + 5].position.z = -hand2.fingers[i].dipPosition[0] / 20
                dips[i + 5].position.y = hand2.fingers[i].dipPosition[1] / 20 - 5
                dips[i + 5].position.x = hand2.fingers[i].dipPosition[2] / 20

                mcps[i + 5].position.z = -hand2.fingers[i].mcpPosition[0] / 20
                mcps[i + 5].position.y = hand2.fingers[i].mcpPosition[1] / 20 - 5
                mcps[i + 5].position.x = hand2.fingers[i].mcpPosition[2] / 20

                carps[i + 5].position.z = - hand2.fingers[i].carpPosition[0] / 20
                carps[i + 5].position.y = hand2.fingers[i].carpPosition[1] / 20 - 5
                carps[i + 5].position.x = hand2.fingers[i].carpPosition[2] / 20


            }
            //Update la variable pour éviter les bugs du grab
            time_grab_hand2 += 1 / 60

            // GRAB MAIN 2
            if (
                (hand2.grabStrength > 0.99)                                                                        // Si la force du grab est supérieur à 0.99
                && (mcps[7].position.z - hand2.palmNormal[0] < bodies[0].position.z + 1)   // Si la POSITION Z du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION Z du cube)
                && (mcps[7].position.z - hand2.palmNormal[0] > bodies[0].position.z - 1)   // Si la POSITION Z du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION Z du cube)
                && (mcps[7].position.y + (hand2.palmNormal[1]) < bodies[0].position.y + 2)// Si la POSITION Y du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION Y du cube)
                && (mcps[7].position.y + (hand2.palmNormal[1]) > bodies[0].position.y - 2)// Si la POSITION Y du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION Y du cube)
                && (mcps[7].position.x + 2 < bodies[0].position.x + 1)                                 // Si la POSITION X du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION X du cube)
                && (mcps[7].position.x + 2 > bodies[0].position.x - 1)                                 // Si la POSITION X du métacarp du majeur de la main 2 est dans la zone de collision du cube ( POSITION X du cube)


            ) {
                time_grab_hand2 = 0// Pour éviter le bug GRAB 
            }
            if (time_grab_hand2 < 0.05) {


                // SET les positions du cube dans la main 2
                bodies[0].position.x = mcps[7].position.x + 2
                bodies[0].position.y = mcps[7].position.y + (hand2.palmNormal[1])
                bodies[0].position.z = mcps[7].position.z - hand2.palmNormal[0]

                // Si un mouvement de la main 2 brusque est détecté, ajoute de la vélocité au cube
                if (hand2.palmVelocity[0] < -100) {
                    bodies[0].velocity.x = -10
                    bodies[0].velocity.y = 5
                }

                // Rotate le cube BIEN au centre de la main peu importe la position de la main 2
                let axis = new CANNON.Vec3(1, 0, 0);
                let angle = 0

                if (hand1.palmNormal[1] < 0) {// Si la main est orienté en haut
                    axis = new CANNON.Vec3(1, 0, 0);
                    angle = -(Math.PI / 2) * - hand2.palmNormal[0]
                }
                else {// Si la main est orienté en bas
                    axis = new CANNON.Vec3(1, 0, 0);
                    angle = (Math.PI / 2) * - hand2.palmNormal[0]
                }
                bodies[0].quaternion.setFromAxisAngle(axis, angle);
            }

            // CODE ACTIF POUR LES DEUX MAINS


            // PINCH UPDATE TAILLE
            if (frame.hands.length > 1) {                                                // Si il y a les deux mains
                if ((hand1.pinchStrength > 0.8)                                       // Si le PinchStrength de la main 1 est supérieur à 0.8
                    && (hand2.pinchStrength > 0.8)                                  // Si le PinchStrength de la main 2 est supérieur à 0.8
                    && (tips[1].position.x < bodies[0].position.x + 2)          // Si la POSITION X du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.x > bodies[0].position.x - 2)          // Si la POSITION X du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.y + 1 < bodies[0].position.y + 2)     // Si la POSITION Y du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.y + 1 > bodies[0].position.y - 2)      // Si la POSITION Y du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.z < bodies[0].position.z + 2)          // Si la POSITION Z du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[1].position.z > bodies[0].position.z - 2)          // Si la POSITION Z du bout du doigt de la main 1 est dans la zone de collision du cube
                    && (tips[6].position.x < bodies[0].position.x + 2)          // Si la POSITION X du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.x > bodies[0].position.x - 2)          // Si la POSITION X du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.y + 1 < bodies[0].position.y + 2)     // Si la POSITION Y du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.y + 1 > bodies[0].position.y - 2)      // Si la POSITION Y du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.z < bodies[0].position.z + 2)          // Si la POSITION Z du bout du doigt de la main 2 est dans la zone de collision du cube
                    && (tips[6].position.z > bodies[0].position.z - 2)          // Si la POSITION Z du bout du doigt de la main 2 est dans la zone de collision du cube
                ) {

                    // Scale le mesh du cube
                    meshes[0].scale.x = (tips[1].position.z - tips[6].position.z) - 0.5
                    meshes[0].scale.y = (tips[1].position.z - tips[6].position.z) - 0.5
                    meshes[0].scale.z = (tips[1].position.z - tips[6].position.z) - 0.5

                    // Scale la zone de collision pour la physique du cube
                    bodies[0].shapes[0].halfExtents.x = ((tips[1].position.z - tips[6].position.z) - 0.5) / 2
                    bodies[0].shapes[0].halfExtents.y = ((tips[1].position.z - tips[6].position.z) - 0.5) / 2
                    bodies[0].shapes[0].halfExtents.z = ((tips[1].position.z - tips[6].position.z) - 0.5) / 2
                    // Update la zone de collision pour la physique du cube
                    bodies[0].shapes[0].updateConvexPolyhedronRepresentation()

                }
                ////

            }

            //CODE ACTIF POUR UNE MAIN

            /////


        }


        // CODE ACTIF TOUJOURS 




    }

    /////



    updatePhysic();
    renderer.render(scene, camera);
}

loop()