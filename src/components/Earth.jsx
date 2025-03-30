// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import getStarfield from "./Starfield";
// import { getFresnelMat } from "./FresnelMaterial";

// const Earth = ({ position = [0, 0, 0], rotationSpeed = 0.002, textures }) => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const w = window.innerWidth;
//     const h = window.innerHeight;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
//     camera.position.z = 5;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(w, h);

//     if (mountRef.current) {
//       mountRef.current.appendChild(renderer.domElement);
//     }

//     renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

//     const earthGroup = new THREE.Group();
//     earthGroup.position.set(...position);
//     earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
//     scene.add(earthGroup);

//     new OrbitControls(camera, renderer.domElement);

//     const loader = new THREE.TextureLoader();
//     const geometry = new THREE.IcosahedronGeometry(1, 12);
//     const material = new THREE.MeshPhongMaterial({
//       map: loader.load(textures.earth),
//       specularMap: loader.load(textures.specular),
//       bumpMap: loader.load(textures.bump),
//       bumpScale: 0.04,
//     });

//     const earthMesh = new THREE.Mesh(geometry, material);
//     earthGroup.add(earthMesh);

//     const lightsMat = new THREE.MeshBasicMaterial({
//       map: loader.load(textures.lights),
//       blending: THREE.AdditiveBlending,
//     });
//     const lightsMesh = new THREE.Mesh(geometry, lightsMat);
//     earthGroup.add(lightsMesh);

//     const cloudsMat = new THREE.MeshStandardMaterial({
//       map: loader.load(textures.clouds),
//       transparent: true,
//       opacity: 0.8,
//       blending: THREE.AdditiveBlending,
//       alphaMap: loader.load(textures.cloudsAlpha),
//     });
//     const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
//     cloudsMesh.scale.setScalar(1.003);
//     earthGroup.add(cloudsMesh);

//     const fresnelMat = getFresnelMat();
//     const glowMesh = new THREE.Mesh(geometry, fresnelMat);
//     glowMesh.scale.setScalar(1.01);
//     earthGroup.add(glowMesh);

//     const stars = getStarfield({ numStars: 2000 });
//     scene.add(stars);

//     const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
//     sunLight.position.set(-2, 0.5, 1.5);
//     scene.add(sunLight);

//     function animate() {
//       requestAnimationFrame(animate);
//       earthMesh.rotation.y += rotationSpeed;
//       lightsMesh.rotation.y += rotationSpeed;
//       cloudsMesh.rotation.y += rotationSpeed * 1.15;
//       glowMesh.rotation.y += rotationSpeed;
//       stars.rotation.y -= 0.0002;
//       renderer.render(scene, camera);
//     }

//     animate();

//     function handleResize() {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     }

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, [position, rotationSpeed, textures]);

//   return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
// };

// export default Earth;
