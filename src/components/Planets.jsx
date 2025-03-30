import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import getStarfield from "./Starfield";

const Planets = () => {
  const mountRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [focusedObject, setFocusedObject] = useState(null);
  const [isTraveling, setIsTraveling] = useState(false);
  const [objectData, setObjectData] = useState({});
  const composer = useRef(null);
  const outlinePass = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(null);
  const controls = useRef(null);
  const objects = useRef({
    spaceship: null,
    blackhole: null,
    moon: null,
    saturn: null,
    mars: null,
    earth: null
  });
  const infoPanelRef = useRef(null);

  const handleObjectClick = (objectKey) => {
    if (isTraveling || focusedObject) return;
    
    setIsTraveling(true);
    setFocusedObject(objectKey);
    
    // Store original positions and rotations
    Object.entries(objects.current).forEach(([key, obj]) => {
      if (obj) {
        obj.userData.originalPosition = obj.position.clone();
        obj.userData.originalRotation = obj.rotation.clone();
        obj.userData.originalVisibility = obj.visible;
        obj.userData.originalScale = obj.scale.clone();
        
        // Immediately hide other objects
        if (key !== objectKey) {
          obj.visible = false;
        }
      }
    });
  };

  const handleBackClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    // Raycaster setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (camera.current && scene.current) {
        raycaster.setFromCamera(mouse, camera.current);
        
        const objectsToCheck = [];
        for (const key in objects.current) {
          if (objects.current[key] && key !== "earth" && !focusedObject) {
            objectsToCheck.push(objects.current[key]);
          }
        }
        
        const intersects = raycaster.intersectObjects(objectsToCheck, true);
        
        if (intersects.length > 0) {
          let ancestorObj = intersects[0].object;
          while (ancestorObj.parent && ancestorObj.parent !== scene.current) {
            ancestorObj = ancestorObj.parent;
          }
          
          if (outlinePass.current) {
            outlinePass.current.selectedObjects = [ancestorObj];
          }
          
          let hoveredType = null;
          for (const [key, value] of Object.entries(objects.current)) {
            if (value === ancestorObj) {
              hoveredType = key;
              break;
            }
          }
          
          setHovered(hoveredType);
        } else {
          if (outlinePass.current) {
            outlinePass.current.selectedObjects = [];
          }
          setHovered(null);
        }
      }
    }
    
    function onClick(event) {
      if (focusedObject || isTraveling) return;
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      if (camera.current && scene.current) {
        raycaster.setFromCamera(mouse, camera.current);
        
        const objectsToCheck = [];
        for (const key in objects.current) {
          if (objects.current[key] && key !== "earth") {
            objectsToCheck.push(objects.current[key]);
          }
        }
        
        const intersects = raycaster.intersectObjects(objectsToCheck, true);
        
        if (intersects.length > 0) {
          event.stopPropagation();
          
          let ancestorObj = intersects[0].object;
          while (ancestorObj.parent && ancestorObj.parent !== scene.current) {
            ancestorObj = ancestorObj.parent;
          }
          
          for (const [key, value] of Object.entries(objects.current)) {
            if (value === ancestorObj) {
              handleObjectClick(key);
              break;
            }
          }
        }
      }
    }
    
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    // Scene setup
    const w = window.innerWidth;
    const h = window.innerHeight;
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.current.position.set(0, -20, 35);
    camera.current.lookAt(new THREE.Vector3(0, 0, -40));

    renderer.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.current.setSize(w, h);
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.current.outputColorSpace = THREE.LinearSRGBColorSpace;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.current.domElement);
    }

    // Post-processing
    composer.current = new EffectComposer(renderer.current);
    const renderPass = new RenderPass(scene.current, camera.current);
    composer.current.addPass(renderPass);

    outlinePass.current = new OutlinePass(
      new THREE.Vector2(w, h),
      scene.current,
      camera.current
    );
    outlinePass.current.edgeStrength = 3;
    outlinePass.current.edgeGlow = 1;
    outlinePass.current.edgeThickness = 2;
    outlinePass.current.pulsePeriod = 2;
    outlinePass.current.visibleEdgeColor.set("#00ffff");
    outlinePass.current.hiddenEdgeColor.set("#00aaff");
    composer.current.addPass(outlinePass.current);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      0.8,
      0.3,
      0.9
    );
    composer.current.addPass(bloomPass);

    controls.current = new OrbitControls(camera.current, renderer.current.domElement);
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.05;
    controls.current.enabled = !focusedObject;
    controls.current.maxDistance = 80;
    controls.current.minDistance = 20;

    // Starfield
    const stars = getStarfield({ numStars: 4000 });
    scene.current.add(stars);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 5);
    sunLight.position.set(-5, 5, 5);
    scene.current.add(sunLight);

    scene.current.add(new THREE.AmbientLight(0xffffff, 2.5));
    
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 50, 50);
    scene.current.add(spotLight);

    const scannerLight = new THREE.PointLight(0x00ffff, 2, 100);
    scannerLight.position.set(0, 10, 0);
    scene.current.add(scannerLight);

    // Earth
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load("/textures/earth.jpg");

    const bigPlanet = new THREE.Mesh(
      new THREE.SphereGeometry(40, 64, 64),
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        bumpMap: loader.load("/textures/01_earthbump1k.jpg"),
        bumpScale: 0.04,
        roughness: 0.4,
        metalness: 0.2,
        emissive: new THREE.Color(0x222222),
        emissiveIntensity: 0.7,
      })
    );
    bigPlanet.position.set(0, -50, 0);
    scene.current.add(bigPlanet);
    objects.current.earth = bigPlanet;

    // Object data
    setObjectData({
      spaceship: {
        name: "TECH FEST CONTROL CENTER",
        events: [
          { 
            name: "HACKATHON", 
            time: "10:00 - 18:00", 
            location: "MAIN HALL",
            color: "#00ff44"
          },
          { 
            name: "WORKSHOPS", 
            time: "11:00 - 15:00", 
            location: "ROOM A & B",
            color: "#00aaff"
          },
          { 
            name: "GUEST TALK", 
            time: "14:00 - 15:30", 
            location: "AUDITORIUM",
            color: "#ffaa00"
          },
          { 
            name: "EXHIBITION", 
            time: "09:00 - 17:00", 
            location: "EXHIBITION HALL",
            color: "#ff00aa"
          },
          { 
            name: "PRIZE CEREMONY", 
            time: "18:30 - 19:30", 
            location: "MAIN STAGE",
            color: "#aa00ff"
          }
        ],
        description: "Central control hub for all Tech Fest activities and events. Monitor schedules, locations, and participant data."
      },
      blackhole: {
        name: "ANOMALY XJ-112",
        stats: [
          { label: "Gravitational Force", value: "EXTREME", color: "#ff0044" },
          { label: "Event Horizon", value: "UNSTABLE", color: "#ff00aa" },
          { label: "Hawking Radiation", value: "7.2 PHz", color: "#aa00ff" },
          { label: "Temporal Distortion", value: "HIGH", color: "#ff44ff" },
          { label: "Approach Warning", value: "DANGER", color: "#ff0000" }
        ],
        description: "Classified as a Kerr-type singularity, this black hole exhibits unusual quantum fluctuations at its event horizon."
      },
      moon: {
        name: "LUNA PRIME",
        stats: [
          { label: "Surface Temp", value: "-23°C", color: "#44aaff" },
          { label: "Gravity", value: "1.62 m/s²", color: "#aaccff" },
          { label: "Atmosphere", value: "MINIMAL", color: "#ffffff" },
          { label: "Colony Status", value: "ACTIVE", color: "#00ff44" },
          { label: "Resources", value: "ABUNDANT", color: "#44ffaa" }
        ],
        description: "Earth's largest moon, now home to several research colonies and mining operations extracting rare lunar minerals."
      },
      saturn: {
        name: "RINGED GIANT",
        stats: [
          { label: "Ring Composition", value: "ICE/ROCK", color: "#aaffff" },
          { label: "Atmosphere", value: "H₂/He", color: "#ffffaa" },
          { label: "Wind Speed", value: "1,800 KM/H", color: "#ffaaaa" },
          { label: "Core Temp", value: "11,700°C", color: "#ffaa00" },
          { label: "Moons Detected", value: "83", color: "#ffffff" }
        ],
        description: "The gas giant Saturn, known for its spectacular ring system composed of ice and rock particles."
      },
      mars: {
        name: "RED FRONTIER",
        stats: [
          { label: "Colony Status", value: "EXPANDING", color: "#00ff44" },
          { label: "Atmosphere", value: "TERRAFORMING", color: "#aaddff" },
          { label: "Surface Temp", value: "-60°C", color: "#ff8888" },
          { label: "Resources", value: "MINING ACTIVE", color: "#ffaa00" },
          { label: "Water Reserves", value: "INCREASING", color: "#00aaff" }
        ],
        description: "Humanity's first extraterrestrial colony, currently undergoing terraforming to create a habitable environment."
      }
    });

    // Spaceship
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/models/spaceship.glb", (gltf) => {
      const spaceship = gltf.scene;
      spaceship.scale.set(0.05, 0.05, 0.05);
      spaceship.position.set(-80, 30, -58);
      spaceship.rotation.set(-1.57, 1.55, 2.54);
      
      spaceship.userData.clickable = true;
      
      spaceship.traverse((child) => {
        if (child.isMesh) {
          const originalMaterial = child.material;
          child.material = new THREE.MeshStandardMaterial({
            map: originalMaterial.map,
            normalMap: originalMaterial.normalMap,
            roughness: 0.3,
            metalness: 0.8,
            emissive: new THREE.Color(0x00ffff),
            emissiveIntensity: 0.2
          });
          
          if (child.name.includes("engine") || child.name.includes("thruster")) {
            child.material.emissive = new THREE.Color(0x00aaff);
            child.material.emissiveIntensity = 2;
          }
        }
      });
      
      scene.current.add(spaceship);
      objects.current.spaceship = spaceship;
    });

    // Black Hole
    gltfLoader.load("/models/blackhole1.glb", (gltf) => {
      const blackhole = gltf.scene;
      blackhole.scale.set(10, 10, 10);
      blackhole.position.set(160, 110, -58);
      
      blackhole.userData.clickable = true;
      
      const coreGeometry = new THREE.SphereGeometry(3, 32, 32);
      const coreMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000,
        transparent: true,
        opacity: 0.9
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      blackhole.add(core);
      
      const glowGeometry = new THREE.SphereGeometry(3.5, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x00ffff) }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          uniform vec3 color;
          
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            float pulse = 0.8 + 0.2 * sin(time * 3.0);
            gl_FragColor = vec4(color, intensity * pulse);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      blackhole.add(glow);
      
      scene.current.add(blackhole);
      objects.current.blackhole = blackhole;
    });

    // Moon
    const moonTexture = loader.load("/textures/moonbg.jpeg");
    gltfLoader.load("/models/moon.glb", (gltf) => {
      const moon = gltf.scene;
      moon.scale.set(5, 5, 5);
      moon.position.set(-160, 100, -35);
      
      moon.userData.clickable = true;

      moon.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ 
            map: moonTexture,
            emissive: new THREE.Color(0x555555),
            emissiveIntensity: 0.2,
            roughness: 0.8
          });
        }
      });

      scene.current.add(moon);
      objects.current.moon = moon;
    });

    // Saturn
    const saturnTexture = loader.load("/textures/saturnbg.jpeg");
    gltfLoader.load("/models/saturn.glb", (gltf) => {
      const saturn = gltf.scene;
      saturn.scale.set(0.1, 0.1, 0.1);
      saturn.position.set(50, 50, -60);
      saturn.rotation.set(-1.57, 1.55, 2.54);
      
      saturn.userData.clickable = true;

      saturn.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ 
            map: saturnTexture,
            emissive: new THREE.Color(0x886644),
            emissiveIntensity: 0.3
          });
          
          if (child.name.includes("ring") || child.geometry.type === "RingGeometry") {
            child.material.emissive = new THREE.Color(0xffaa00);
            child.material.emissiveIntensity = 0.5;
          }
        }
      });

      scene.current.add(saturn);
      objects.current.saturn = saturn;
    });

    // Mars
    const marsTexture = loader.load("/textures/marsbg.jpeg");
    gltfLoader.load("/models/mars.glb", (gltf) => {
      const mars = gltf.scene;
      mars.scale.set(0.1, 0.1, 0.1);
      mars.position.set(160, 35, -65);
      
      mars.userData.clickable = true;

      mars.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ 
            map: marsTexture,
            emissive: new THREE.Color(0xff4400),
            emissiveIntensity: 0.3,
            roughness: 0.7
          });
        }
      });

      scene.current.add(mars);
      objects.current.mars = mars;
    });

    // Animation loop
    let time = 0;
    let animationFrameId = null;
    let cameraTargetPosition = new THREE.Vector3(10, 5, 30);
    let objectTargetPosition = new THREE.Vector3(-20, 0, 0);
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;
      
      // Handle travel animation
      if (isTraveling && focusedObject) {
        const targetObject = objects.current[focusedObject];
        
        if (!targetObject.userData.animationProgress) {
          targetObject.userData.animationProgress = 0;
          
          // Set target scale based on object type
          if (focusedObject === 'spaceship') {
            targetObject.userData.targetScale = new THREE.Vector3(0.03, 0.03, 0.03);
          } else if (focusedObject === 'blackhole') {
            targetObject.userData.targetScale = new THREE.Vector3(7, 7, 7);
          } else if (focusedObject === 'moon') {
            targetObject.userData.targetScale = new THREE.Vector3(3, 3, 3);
          } else if (focusedObject === 'saturn' || focusedObject === 'mars') {
            targetObject.userData.targetScale = new THREE.Vector3(0.07, 0.07, 0.07);
          }
        }
        
        targetObject.userData.animationProgress += 0.01;
        const progress = Math.min(targetObject.userData.animationProgress, 1);
        
        // Animate camera to target position
        camera.current.position.lerp(cameraTargetPosition, 0.05);
        camera.current.lookAt(objectTargetPosition);
        
        // Animate object to target position
        targetObject.position.lerp(objectTargetPosition, 0.05);
        
        // Animate scale if target scale exists
        if (targetObject.userData.targetScale) {
          targetObject.scale.lerp(targetObject.userData.targetScale, 0.05);
        }
        
        // Hide other objects
        Object.entries(objects.current).forEach(([key, obj]) => {
          if (key !== focusedObject && obj) {
            obj.visible = false;
          }
        });
        
        // Hide earth
        if (objects.current.earth) {
          objects.current.earth.visible = false;
        }
        
        // End animation when complete
        if (progress >= 1) {
          setIsTraveling(false);
          // Lock camera position after animation
          camera.current.position.copy(cameraTargetPosition);
          camera.current.lookAt(objectTargetPosition);
        }
      }
      
      // If we're focused but not traveling (animation complete)
      if (focusedObject && !isTraveling) {
        const targetObject = objects.current[focusedObject];
        
        // Keep camera locked in position
        camera.current.position.copy(cameraTargetPosition);
        camera.current.lookAt(objectTargetPosition);
        
        // Keep object in position
        targetObject.position.copy(objectTargetPosition);
        
        // Keep other objects hidden
        Object.entries(objects.current).forEach(([key, obj]) => {
          if (key !== focusedObject && obj) {
            obj.visible = false;
          }
        });
        
        if (objects.current.earth) {
          objects.current.earth.visible = false;
        }
      }
      
      // Update shader uniforms
      scene.current.traverse((object) => {
        if (object.material && object.material.uniforms && object.material.uniforms.time) {
          object.material.uniforms.time.value = time;
        }
      });

      // Rotate planets
      if (objects.current.earth && !focusedObject) {
        objects.current.earth.rotation.y += 0.0004;
      }
      
      // Rotate starfield
      const stars = scene.current.children.find(c => c.name === "starfield");
      if (stars) {
        stars.rotation.y -= 0.0002;
      }

      // Update object rotations
      scene.current.traverse((obj) => {
        if (obj.userData.rotationSpeed) {
          obj.rotation.y += obj.userData.rotationSpeed;
        }
      });

      if (controls.current) {
        controls.current.update();
      }
      composer.current.render();
    };

    animate();

    // Handle window resize
    function onWindowResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      camera.current.aspect = w / h;
      camera.current.updateProjectionMatrix();
      
      renderer.current.setSize(w, h);
      composer.current.setSize(w, h);
    }
    
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onWindowResize);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (mountRef.current && renderer.current.domElement) {
        mountRef.current.removeChild(renderer.current.domElement);
      }
      
      renderer.current.dispose();
      scene.current.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [focusedObject, isTraveling]);

  return (
    <div ref={mountRef} style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Main Interface */}
      {!focusedObject && (
        <div style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <img 
            src="/images/logo.png" 
            alt="Mission Logo" 
            style={{ height: "80px", objectFit: "contain" }} 
          />
          <div style={{
            color: "#00ffff",
            fontFamily: "monospace",
            background: "rgba(0,10,20,0.7)",
            border: "1px solid #00aaff",
            borderRadius: "4px",
            padding: "5px 10px",
            marginTop: "5px",
            textAlign: "center",
            fontSize: "12px",
            backdropFilter: "blur(4px)",
            boxShadow: "0 0 10px rgba(0,170,255,0.5)"
          }}>
            STELLAR CARTOGRAPHY · ACTIVE SCAN · SECTOR 7G
          </div>
        </div>
      )}
      
      {/* Corners */}
      {!focusedObject && (
        <>
          <div className="corner top-left" style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "#00ffff",
            fontFamily: "monospace",
            zIndex: 10
          }}>
            <div style={{
              border: "1px solid #00aaff",
              borderRadius: "4px",
              padding: "10px",
              background: "rgba(0,10,20,0.7)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 0 10px rgba(0,170,255,0.3)"
            }}>
              <div style={{ fontSize: "14px", marginBottom: "8px", color: "#00ffff" }}>MISSION TIME</div>
              <Clock />
            </div>
          </div>
          
          <div className="corner top-right" style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "#00ffff",
            fontFamily: "monospace",
            zIndex: 10
          }}>
            <div style={{
              border: "1px solid #00aaff",
              borderRadius: "4px",
              padding: "10px",
              background: "rgba(0,10,20,0.7)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 0 10px rgba(0,170,255,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "5px"
            }}>
              <div style={{ fontSize: "14px", color: "#00ffff" }}>SYSTEM STATUS</div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <span>Navigation</span>
                <span style={{ color: "#00ff44" }}>ONLINE</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <span>Comms</span>
                <span style={{ color: "#00ff44" }}>ONLINE</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <span>Shields</span>
                <span style={{ color: "#ffaa00" }}>85%</span>
              </div>
            </div>
          </div>
          
          <div className="corner bottom-left" style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            color: "#00ffff",
            fontFamily: "monospace",
            zIndex: 10
          }}>
            <div style={{
              border: "1px solid #00aaff",
              borderRadius: "4px",
              padding: "10px",
              background: "rgba(0,10,20,0.7)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 0 10px rgba(0,170,255,0.3)"
            }}>
              <div style={{ fontSize: "14px", marginBottom: "5px", color: "#00ffff" }}>NAVIGATION</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ 
                  width: "100px", 
                  height: "100px", 
                  border: "1px solid #00aaff",
                  borderRadius: "50%",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <div style={{ 
                    width: "80%", 
                    height: "80%", 
                    borderRadius: "50%", 
                    border: "1px solid #0088aa",
                    position: "absolute"
                  }}></div>
                  <div style={{ 
                    width: "60%", 
                    height: "60%", 
                    borderRadius: "50%", 
                    border: "1px solid #0088aa",
                    position: "absolute"
                  }}></div>
                  <div style={{ 
                    width: "40%", 
                    height: "40%",
                    borderRadius: "50%", 
                    border: "1px solid #0088aa",
                    position: "absolute"
                  }}></div>
                  <div style={{ 
                    width: "20%", 
                    height: "20%", 
                    borderRadius: "50%", 
                    background: "#00ffff",
                    position: "absolute"
                  }}></div>
                  
                  <div style={{ 
                    width: "100%", 
                    height: "100%", 
                    borderRadius: "50%", 
                    border: "1px solid #00ffff",
                    position: "absolute",
                    animation: "ping 3s infinite",
                    opacity: 0
                  }}></div>
                </div>
                <div>
                  <div>LOC: G754.223</div>
                  <div>ALT: +35.7 AU</div>
                  <div>VEL: 2.45C</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="corner bottom-right" style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            color: "#00ffff",
            fontFamily: "monospace",
            zIndex: 10
          }}>
            <div style={{
              border: "1px solid #00aaff",
              borderRadius: "4px",
              padding: "10px",
              background: "rgba(0,10,20,0.7)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 0 10px rgba(0,170,255,0.3)"
            }}>
              <div style={{ fontSize: "14px", marginBottom: "5px", color: "#00ffff" }}>SCAN RESULTS</div>
              <div style={{ fontSize: "12px" }}>
                <div>Objects: 5</div>
                <div>Lifeforms: 4.3B</div>
                <div>Anomalies: 1</div>
                <div>
                  <span style={{ color: "#ffaa00" }}>⚠ WARNING:</span> Gravitational distortion detected
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Hover Info */}
      {hovered && !focusedObject && objectData[hovered] && (
        <div style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          color: "#00ffff",
          background: "rgba(0,10,20,0.85)",
          backdropFilter: "blur(5px)",
          padding: "15px",
          borderRadius: "4px",
          border: "1px solid #00aaff",
          fontFamily: "monospace",
          width: "300px",
          boxShadow: "0 0 20px rgba(0,170,255,0.5)",
          zIndex: 100,
          animation: "fadeIn 0.3s"
        }}>
          <div style={{ 
            borderBottom: "1px solid #00aaff", 
            paddingBottom: "10px", 
            marginBottom: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span>{hovered === "spaceship" ? "TECH FEST CONTROL CENTER" : objectData[hovered].name}</span>
            <span style={{ 
              background: "#00aaff", 
              color: "#000", 
              fontSize: "10px", 
              padding: "2px 6px", 
              borderRadius: "10px" 
            }}>
              SCANNING
            </span>
          </div>
          
          {hovered === "spaceship" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {objectData[hovered].events.slice(0, 3).map((event, index) => (
                <div key={index} style={{ 
                  padding: "8px",
                  borderLeft: `3px solid ${event.color}`,
                  background: "rgba(0,50,80,0.3)"
                }}>
                  <div style={{ fontWeight: "bold", color: event.color }}>{event.name}</div>
                  <div style={{ fontSize: "12px" }}>⏱ {event.time}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {objectData[hovered].stats.map((stat, index) => (
                <div key={index} style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  animation: `slideIn 0.5s ${index * 0.1}s both`
                }}>
                  <span>{stat.label}:</span>
                  <span style={{ 
                    color: stat.color,
                    fontWeight: "bold",
                    display: "inline-block",
                    width: "100px", 
                    position: "relative",
                    textAlign: "right"
                  }}>
                    {stat.value}
                    <span style={{ 
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "100%",
                      background: `linear-gradient(90deg, transparent 0%, ${stat.color}33 100%)`,
                      animation: "scanLine 2s infinite"
                    }}></span>
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <div style={{ 
            marginTop: "15px", 
            height: "4px", 
            background: "#003344",
            borderRadius: "2px",
            overflow: "hidden"
          }}>
            <div style={{ 
              height: "100%", 
              background: "linear-gradient(90deg, #00aaff, #00ffaa)",
              width: "70%",
              animation: "progress 3s infinite"
            }}></div>
          </div>
        </div>
      )}
      
      {/* Focused View */}
      {focusedObject && objectData[focusedObject] && (
        <>
          <div style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 1000,
            color: "#00ffff",
            background: "rgba(0,10,20,0.7)",
            border: "1px solid #00aaff",
            padding: "10px 15px",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "monospace",
            backdropFilter: "blur(4px)",
            boxShadow: "0 0 10px rgba(0,170,255,0.5)"
          }} onClick={handleBackClick}>
            ← BACK TO SYSTEM VIEW
          </div>
          
          <div ref={infoPanelRef} style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "350px",
            maxHeight: "70vh",
            background: "rgba(0,10,20,0.85)",
            border: "1px solid #00aaff",
            borderRadius: "8px",
            padding: "20px",
            color: "#00ffff",
            fontFamily: "monospace",
            zIndex: 1000,
            backdropFilter: "blur(5px)",
            boxShadow: "0 0 20px rgba(0,170,255,0.5)",
            overflowY: focusedObject === "spaceship" ? "auto" : "visible",
            overflowX: "hidden"
          }}>
            <h2 style={{ 
              borderBottom: "1px solid #00aaff", 
              paddingBottom: "10px",
              marginTop: 0,
              fontSize: "24px",
              position: "sticky",
              top: 0,
              background: "rgba(0,10,20,0.85)",
              zIndex: 1
            }}>
              {objectData[focusedObject].name}
            </h2>
            
            {focusedObject === "spaceship" ? (
              <div style={{ marginTop: "20px" }}>
                <div style={{ 
                  color: "#00aaff", 
                  marginBottom: "15px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  position: "sticky",
                  top: "60px",
                  background: "rgba(0,10,20,0.85)",
                  zIndex: 1
                }}>
                  EVENT SCHEDULE:
                </div>
                
                <div style={{ maxHeight: "50vh", overflowY: "auto", paddingRight: "10px" }}>
                  {objectData[focusedObject].events.map((event, i) => (
                    <div key={i} style={{ 
                      marginBottom: "15px",
                      borderLeft: `4px solid ${event.color}`,
                      padding: "10px 15px",
                      background: "rgba(0,50,80,0.3)",
                      borderRadius: "0 4px 4px 0"
                    }}>
                      <div style={{ 
                        fontSize: "18px", 
                        fontWeight: "bold",
                        color: event.color,
                        marginBottom: "5px"
                      }}>
                        {event.name}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>⏱ {event.time}</span>
                        <span>📍 {event.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "20px" }}>
                {objectData[focusedObject].stats.map((stat, i) => (
                  <div key={i} style={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    fontSize: "16px"
                  }}>
                    <span>{stat.label}:</span>
                    <span style={{ color: stat.color, fontWeight: "bold" }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ 
              marginTop: "30px",
              padding: "15px",
              background: "rgba(0,50,80,0.3)",
              borderRadius: "6px",
              border: "1px solid #0088aa"
            }}>
              <div style={{ 
                color: "#00aaff", 
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bold"
              }}>
                {focusedObject === "spaceship" ? "CONTROL CENTER STATUS:" : "SCIENTIFIC ANALYSIS:"}
              </div>
              <div style={{ lineHeight: "1.5" }}>
                {objectData[focusedObject].description}
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Interactive tooltip */}
      {!focusedObject && (
        <div style={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          transform: "translate(-50%, 50%)",
          color: "#ffffff",
          background: "rgba(0,10,20,0.7)",
          backdropFilter: "blur(5px)",
          padding: "10px 20px",
          borderRadius: "30px",
          border: "1px solid #00aaff",
          fontFamily: "monospace",
          fontSize: "14px",
          boxShadow: "0 0 20px rgba(0,170,255,0.5)",
          zIndex: 5,
          opacity: 0.8,
          transition: "opacity 0.3s",
          animation: "float 3s infinite ease-in-out"
        }}>
          CLICK ON OBJECTS TO EXAMINE THEM
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-50%) translateX(20px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes scanLine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          75% { width: 85%; }
          90% { width: 95%; }
          100% { width: 100%; }
        }

        @keyframes float {
          0%, 100% { transform: translate(-50%, 50%); }
          50% { transform: translate(-50%, calc(50% - 5px)); }
        }

        @keyframes ping {
          0% { transform: scale(0.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Custom scrollbar for info panel */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 20, 40, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #00aaff;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #00ffff;
        }

        /* Add hover effects for the control panel buttons */
        .glow-effect-0:hover, 
        .glow-effect-1:hover, 
        .glow-effect-2:hover, 
        .glow-effect-3:hover,
        .glow-effect-4:hover,
        .glow-effect-5:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

// Clock component
const Clock = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <div style={{ 
        background: "rgba(0,50,80,0.5)", 
        padding: "5px", 
        borderRadius: "3px",
        border: "1px solid #00aaff"
      }}>
        {hours}
      </div>
      <div style={{ animation: "blink 1s infinite" }}>:</div>
      <div style={{ 
        background: "rgba(0,50,80,0.5)", 
        padding: "5px", 
        borderRadius: "3px",
        border: "1px solid #00aaff"
      }}>
        {minutes}
      </div>
      <div style={{ animation: "blink 1s infinite" }}>:</div>
      <div style={{ 
        background: "rgba(0,50,80,0.5)", 
        padding: "5px", 
        borderRadius: "3px",
        border: "1px solid #00aaff"
      }}>
        {seconds}
      </div>
      
      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Planets;