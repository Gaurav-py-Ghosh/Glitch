import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import getStarfield from "./Starfield";
import Navbar from "./Navbar";// import BlackHoleOverlay from "./BlackHoleOverlay";

// ErrorBoundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "black",
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <h1>Something went wrong. Please refresh the page.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

const Planets = () => {
  const mountRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [focusedObject, setFocusedObject] = useState(null);
  const [isTraveling, setIsTraveling] = useState(false);
  const [objectData, setObjectData] = useState({
    spaceship: {
      name: "Events",
      events: [
        {
          name: "HackBMU 7.0",
          date: "2025-04-19 to 2025-04-20",
          time: "10:00 AM - 6:00 PM",
          location: "",
          color: "#00ff44",
          description: "The flagship hackathon event to solve real-world problems.",
        },
        {
          name: "Emoji Explorer",
          date: "2025-04-19",
          time: "4:30 PM - 6:30 PM",
          location: "ROOM A & B",
          color: "#00aaff",
          description: "Explore creative coding through emoji-based challenges.",
        },
        {
          name: "Duality Extended",
          date: "2025-04-18",
          time: "11:00 AM - 1:00 PM",
          location: "AUDITORIUM",
          color: "#ffaa00",
          description: "A unique event exploring dual perspectives in tech.",
        },
        {
          name: "Bit-by-Bit",
          date: "2025-04-19",
          time: "7:00 PM - 9:00 PM",
          location: "EXHIBITION HALL",
          color: "#ff00aa",
          description: "Showcasing innovative projects in digital art.",
        },
        {
          name: "Dev Dash",
          date: "2025-04-18",
          time: "3:30 PM - 6:30 PM",
          location: "MAIN STAGE",
          color: "#aa00ff",
          description: "Fast-paced development competition finale.",
        },
        {
          name: "Paint Off",
          date: "2025-04-18",
          time: "1:00 PM - 3:00 PM",
          location: "QUIZ ROOM",
          color: "#ff8800",
          description: "Creative digital art battle with tech tools.",
        },
        {
          name: "Capture the Flag",
          date: "2025-04-20",
          time: "10:30 AM - 12:00 PM",
          location: "LAB 3",
          color: "#00ffaa",
          description: "Cybersecurity challenge event.",
        },
        {
          name: "CodeSprint",
          date: "2025-04-20",
          time: "2:00 AM - 4:00 AM",
          location: "AI LAB",
          color: "#ff4444",
          description: "Rapid coding competition against the clock.",
        },
        {
          name: "TechTrap",
          date: "2025-04-19",
          time: "10:00 PM - 12:30 AM",
          location: "ROOM C",
          color: "#4444ff",
          description: "Puzzle-solving event with technical twists.",
        },
        {
          name: "Horizon Talks",
          date: "2025-04-19",
          time: "3:00 PM - 4:00 PM",
          location: "LOUNGE",
          color: "#88ff88",
          description: "Visionary talks about future technologies.",
        },
      ],
      description: "Central control hub for all Tech Fest activities and events.",
    },
    blackhole: {
      name: "MEET THE TEAM",
      teams: [
        {
          name: "CORE TEAM",
          members: [
            { name: "Aditya Rastogi", role: "Convenor", img: "/images/adityarast.webp" },
            { name: "Shrey Jaiswal", role: "Co-Convenor", img: "/images/shrey.webp" },
            { name: "Prakhar Srivastava", role: "Core", img: "/images/prakhar.webp" },
            { name: "Divyansh Verma", role: "Core", img: "/images/divyansh.webp" },
            { name: "Guneet Chawal", role: "Core", img: "/images/Guneet.webp" },
            { name: "Ananya Aggarwal", role: "Core", img: "/images/Ananya.webp" },
          ],
        },
        {
          name: "SPONSORSHIP TEAM",
          members: [
            { name: "Purvanshu", role: "Lead", img: "/images/purvanshu.webp" },
            { name: "Shrey", role: "Lead", img: "/images/shrey.webp" },
          ],
        },
        {
          name: "OPERATIONS TEAM",
          members: [
            { name: "Vanshita", role: "Lead", img: "/images/vanshita.webp" },
            { name: "Tanmay", role: "Lead", img: "/images/tanmay.webp" },
          ],
        },
        {
          name: "SOCIAL MEDIA TEAM",
          members: [
            { name: "Shreya", role: "Lead", img: "/images/shreya.webp" },
            { name: "Vanshika", role: "Lead", img: "/images/vanshika.webp" },
          ],
        },
        {
          name: "ENTRY MANAGEMENT TEAM",
          members: [
            { name: "Akriti", role: "Lead", img: "/images/akriti.webp" },
            { name: "Kavya", role: "Lead", img: "/images/kavya.webp" },
          ],
        },
        {
          name: "DECOR TEAM",
          members: [
            { name: "Vanshita", role: "Lead", img: "/images/vanshita.webp" },
            { name: "Tanmay", role: "Lead", img: "/images/tanmay.webp" },
            { name: "Sejal", role: "Lead", img: "/images/sejal.webp" },
            { name: "Gaurav", role: "Lead", img: "/images/gaurav.webp" },
            { name: "Purvanshu", role: "Lead", img: "/images/purvanshu.webp" },
          ],
        },
        {
          name: "TECHNICAL TEAM",
          members: [
            { name: "Sejal", role: "Lead", img: "/images/sejal.webp" },
            { name: "Gaurav", role: "Lead", img: "/images/gaurav.webp" },
          ],
        },
        {
          name: "DESIGN TEAM",
          members: [{ name: "Suvansh", role: "Lead", img: "/images/suvansh.webp" }],
        },
        {
          name: "OFFLINE MARKETING TEAM",
          members: [
            { name: "Molly", role: "Lead", img: "/images/molly.webp" },
            { name: "Yash", role: "Lead", img: "/images/yash.webp" },
          ],
        },
        {
          name: "CONTENT TEAM",
          members: [{ name: "Kavya", role: "Lead", img: "/images/kavya.webp" }],
        },
      ],
      description: "Our talented team behind the event, working together to make it a success.",
    },
    moon: {
      name: "CONTACT US",
      contacts: [{ type: "Email", value: "acm@bmu.edu.in", color: "#00aaff" }],
      description: "Reach out to us for any inquiries or support.",
    },
    saturn: {
      name: "SPONSORS",
      sponsors: [
        {
          name: "Spheron",
          logo: "https://cdn.brandfetch.io/idc9pQIv4m/w/820/h/984/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
          description: "Decentralized cloud hosting for modern web apps.",
          tier: "PLATINUM",
          color: "#00ffff",
        },
        {
          name: "Balsamiq",
          logo: "https://cdn.brandfetch.io/idG_yTIc33/w/820/h/206/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
          description: "Wireframing tool that helps teams plan user interfaces quickly.",
          tier: "GOLD",
          color: "#ffaa00",
        },
        {
          name: "1Password",
          logo: "https://cdn.brandfetch.io/ids0xxqhX-/w/272/h/52/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
          description: "A secure password manager to protect your online accounts.",
          tier: "GOLD",
          color: "#ffaa00",
        },
        {
          name: "MLH",
          logo: "https://cdn.brandfetch.io/id76pHTjeR/w/820/h/346/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
          description: "Official student hackathon league supporting innovation and learning.",
          tier: "SILVER",
          color: "#cccccc",
        },
        {
          name: "Axure",
          logo: "https://cdn.brandfetch.io/id99STEpoQ/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
          description: "UX prototyping and wireframing software for teams.",
          tier: "SILVER",
          color: "#cccccc",
        },
      ],
      description: "Our amazing sponsors who make this event possible.",
    },
    mars: {
      name: "RED FRONTIER",
      stats: [
        { label: "Colony Status", value: "EXPANDING", color: "#00ff44" },
        { label: "Atmosphere", value: "TERRAFORMING", color: "#aaddff" },
        { label: "Surface Temp", value: "-60°C", color: "#ff8888" },
        { label: "Resources", value: "MINING ACTIVE", color: "#ffaa00" },
        { label: "Water Reserves", value: "INCREASING", color: "#00aaff" },
      ],
      description: "Humanity's first extraterrestrial colony.",
    },
  });
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
    earth: null,
  });
  const infoPanelRef = useRef(null);
  const [selectedTeam, setSelectedTeam] = useState(0); // Default to the first team
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showOrientationPrompt, setShowOrientationPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768 || window.innerHeight <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleObjectClick = (objectKey) => {
    if (isTraveling || focusedObject) return;

    setIsTraveling(true);
    setFocusedObject(objectKey);

    Object.entries(objects.current).forEach(([key, obj]) => {
      if (obj) {
        obj.userData.originalPosition = obj.position.clone();
        obj.userData.originalRotation = obj.rotation.clone();
        obj.userData.originalVisibility = obj.visible;
        obj.userData.originalScale = obj.scale.clone();

        if (key !== objectKey) {
          obj.visible = false;
        }
      }
    });
  };

  const handleBackClick = () => {
    setFocusedObject(null);
    setSelectedTeam(null);
  };

  useEffect(() => {
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

    const w = window.innerWidth;
    const h = window.innerHeight;
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.current.position.set(0, -20, 35);
    camera.current.lookAt(new THREE.Vector3(0, 0, -40));

    renderer.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.current.setSize(w, h);
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.current.outputColorSpace = THREE.LinearSRGBColorSpace;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.current.domElement);
    }

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

    controls.current = new OrbitControls(
      camera.current,
      renderer.current.domElement
    );
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.05;
    controls.current.enabled = !focusedObject;
    controls.current.maxDistance = 80;
    controls.current.minDistance = 20;

    const stars = getStarfield({ numStars: 4000 });
    scene.current.add(stars);

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

    // Texture loader with error handling
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load(
      "/textures/earth.jpg",
      undefined,
      undefined,
      (error) => console.error("Error loading earth texture:", error)
    );
    const moonTexture = loader.load(
      "/textures/moonbg.jpeg",
      undefined,
      undefined,
      (error) => console.error("Error loading moon texture:", error)
    );
    const saturnTexture = loader.load(
      "/textures/saturnbg.jpeg",
      undefined,
      undefined,
      (error) => console.error("Error loading saturn texture:", error)
    );
    const marsTexture = loader.load(
      "/textures/marsbg.jpeg",
      undefined,
      undefined,
      (error) => console.error("Error loading mars texture:", error)
    );

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
            emissiveIntensity: 0.2,
          });

          if (
            child.name.includes("engine") ||
            child.name.includes("thruster")
          ) {
            child.material.emissive = new THREE.Color(0x00aaff);
            child.material.emissiveIntensity = 2;
          }
        }
      });

      scene.current.add(spaceship);
      objects.current.spaceship = spaceship;
    });

    gltfLoader.load("/models/blackhole1.glb", (gltf) => {
      const blackhole = gltf.scene;
      blackhole.scale.set(10, 10, 10);
      blackhole.position.set(160, 110, -58);
      blackhole.userData.clickable = true;

      const coreGeometry = new THREE.SphereGeometry(3, 32, 32);
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.9,
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      blackhole.add(core);

      const glowGeometry = new THREE.SphereGeometry(3.5, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x00ffff) },
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
        transparent: true,
      });

      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      blackhole.add(glow);

      scene.current.add(blackhole);
      objects.current.blackhole = blackhole;
    });

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
            roughness: 0.8,
          });
        }
      });

      scene.current.add(moon);
      objects.current.moon = moon;
    });

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
            emissiveIntensity: 0.3,
          });

          if (
            child.name.includes("ring") ||
            child.geometry.type === "RingGeometry"
          ) {
            child.material.emissive = new THREE.Color(0xffaa00);
            child.material.emissiveIntensity = 0.5;
          }
        }
      });

      scene.current.add(saturn);
      objects.current.saturn = saturn;
    });

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
            roughness: 0.7,
          });
        }
      });

      scene.current.add(mars);
      objects.current.mars = mars;
    });

    let time = 0;
    let animationFrameId = null;
    let cameraTargetPosition = new THREE.Vector3(10, 5, 30);
    let objectTargetPosition = new THREE.Vector3(-20, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      if (isTraveling && focusedObject) {
        const targetObject = objects.current[focusedObject];

        if (!targetObject.userData.animationProgress) {
          targetObject.userData.animationProgress = 0;

          if (focusedObject === "spaceship") {
            targetObject.userData.targetScale = new THREE.Vector3(
              0.03,
              0.03,
              0.03
            );
          } else if (focusedObject === "blackhole") {
            targetObject.userData.targetScale = new THREE.Vector3(7, 7, 7);
          } else if (focusedObject === "moon") {
            targetObject.userData.targetScale = new THREE.Vector3(3, 3, 3);
          } else if (focusedObject === "saturn" || focusedObject === "mars") {
            targetObject.userData.targetScale = new THREE.Vector3(
              0.07,
              0.07,
              0.07
            );
          }
        }

        targetObject.userData.animationProgress += 0.01;
        const progress = Math.min(targetObject.userData.animationProgress, 1);

        camera.current.position.lerp(cameraTargetPosition, 0.05);
        camera.current.lookAt(objectTargetPosition);

        targetObject.position.lerp(objectTargetPosition, 0.05);

        if (targetObject.userData.targetScale) {
          targetObject.scale.lerp(targetObject.userData.targetScale, 0.05);
        }

        Object.entries(objects.current).forEach(([key, obj]) => {
          if (key !== focusedObject && obj) {
            obj.visible = false;
          }
        });

        if (objects.current.earth) {
          objects.current.earth.visible = false;
        }

        if (progress >= 1) {
          setIsTraveling(false);
          camera.current.position.copy(cameraTargetPosition);
          camera.current.lookAt(objectTargetPosition);
        }
      }

      if (focusedObject && !isTraveling) {
        const targetObject = objects.current[focusedObject];
        camera.current.position.copy(cameraTargetPosition);
        camera.current.lookAt(objectTargetPosition);
        targetObject.position.copy(objectTargetPosition);

        Object.entries(objects.current).forEach(([key, obj]) => {
          if (key !== focusedObject && obj) {
            obj.visible = false;
          }
        });

        if (objects.current.earth) {
          objects.current.earth.visible = false;
        }
      }

      scene.current.traverse((object) => {
        if (
          object.material &&
          object.material.uniforms &&
          object.material.uniforms.time
        ) {
          object.material.uniforms.time.value = time;
        }
      });

      if (objects.current.earth && !focusedObject) {
        objects.current.earth.rotation.y += 0.0004;
      }

      const stars = scene.current.children.find((c) => c.name === "starfield");
      if (stars) {
        stars.rotation.y -= 0.0002;
      }

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

      // Dispose of textures
      [earthTexture, moonTexture, saturnTexture, marsTexture].forEach(
        (texture) => {
          if (texture) texture.dispose();
        }
      );

      renderer.current.dispose();
      scene.current.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [focusedObject, isTraveling]);

  useEffect(() => {
    const updateObjectScreenPositions = () => {
      if (!camera.current || !renderer.current) return;

      Object.entries(objects.current).forEach(([key, obj]) => {
        if (obj) {
          const vector = new THREE.Vector3();
          obj.getWorldPosition(vector);
          vector.project(camera.current);

          const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
          const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

          obj.userData.screenPosition = { x, y };
        }
      });
    };

    // Update positions on resize
    window.addEventListener("resize", updateObjectScreenPositions);

    // Define the animate function in the same scope
    const animateWithPositionUpdate = () => {
      updateObjectScreenPositions();
      requestAnimationFrame(animateWithPositionUpdate);
      composer.current.render();
    };

    animateWithPositionUpdate();

    return () => {
      window.removeEventListener("resize", updateObjectScreenPositions);
    };
  }, []);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeMode = window.matchMedia(
        "(orientation: landscape)"
      ).matches;
      setShowOrientationPrompt(!isLandscapeMode);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >{!focusedObject && (
      <div
        style={{
          position: "absolute",
          top: isMobile ? "100px" : "200px", // Changed from fixed 200px to 100px for mobile
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src="/images/logo.webp"
          alt="Mission Logo"
          style={{
            height: isMobile ? "80px" : "120px", // Reduced from 120px to 80px for mobile
            objectFit: "contain",
            marginBottom: "10px",
          }}
        />
        <div
          style={{
            color: "#ffffff",
            fontFamily: "Orbitron",
            padding: "5px 10px",
            textAlign: "center",
            fontSize: isMobile ? "36px" : "48px", // Reduced from 48px to 36px for mobile
            backdropFilter: "blur(4px)",
            fontWeight: "bold",
            opacity: 0.8,
          }}
        >
          GLITCH
        </div>
      </div>
    )}
      {!focusedObject && (
        <>
          {Object.entries(objects.current).map(([key, obj]) => {
            if (key === "earth" || !obj) return null;

            // Calculate the object's position dynamically
            const objectScreenPosition = obj.userData?.screenPosition || {
              x: 0,
              y: 0,
            };

            return (
              <div
                key={key}
                style={{
                  position: "absolute",
                  top: `${objectScreenPosition.y}px`,
                  left: `${objectScreenPosition.x}px`,
                  transform: "translate(-50%, -50%)",
                  color: "#00ffff",
                  fontFamily: "monospace",
                  fontSize: "18px",
                  textAlign: "center",
                  textShadow: "0 0 5px #000",
                  zIndex: 10,
                  pointerEvents: "none",
                  opacity: hovered === key ? 1 : 0.7,
                  transition: "opacity 0.3s",
                }}
              >
                {objectData[key]?.name}
              </div>
            );
          })}
        </>
      )}

      <Navbar focused={!!focusedObject} handleObjectClick={handleObjectClick} />

      {!focusedObject && (
        <>
          <div
            className="corner top-left"
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              color: "#00ffff",
              fontFamily: "monospace",
              zIndex: 10,
            }}
          >
            <div
              style={{
                border: "1px solid #00aaff",
                borderRadius: "4px",
                padding: "10px",
                background: "rgba(0,10,20,0.7)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 0 10px rgba(0,170,255,0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  marginBottom: "8px",
                  color: "#00ffff",
                }}
              >
                MISSION TIME
              </div>
              <Clock />
            </div>
          </div>

          <div
            className="corner top-right"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#00ffff",
              fontFamily: "monospace",
              zIndex: 10,
            }}
          >
            <div
              style={{
                border: "1px solid #00aaff",
                borderRadius: "4px",
                padding: "10px",
                background: "rgba(0,10,20,0.7)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 0 10px rgba(0,170,255,0.3)",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <div style={{ fontSize: "14px", color: "#00ffff" }}>
                SYSTEM STATUS
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span>Navigation</span>
                <span style={{ color: "#00ff44" }}>ONLINE</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span>Comms</span>
                <span style={{ color: "#00ff44" }}>ONLINE</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span>Shields</span>
                <span style={{ color: "#ffaa00" }}>85%</span>
              </div>
            </div>
          </div>

          <div
            className="corner bottom-left"
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              color: "#00ffff",
              fontFamily: "monospace",
              zIndex: 10,
            }}
          >
            <div
              style={{
                border: "1px solid #00aaff",
                borderRadius: "4px",
                padding: "10px",
                background: "rgba(0,10,20,0.7)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 0 10px rgba(0,170,255,0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  color: "#00ffff",
                }}
              >
                NAVIGATION
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #00aaff",
                    borderRadius: "50%",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "80%",
                      height: "80%",
                      borderRadius: "50%",
                      border: "1px solid #0088aa",
                      position: "absolute",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "60%",
                      height: "60%",
                      borderRadius: "50%",
                      border: "1px solid #0088aa",
                      position: "absolute",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "40%",
                      height: "40%",
                      borderRadius: "50%",
                      border: "1px solid #0088aa",
                      position: "absolute",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "20%",
                      height: "20%",
                      borderRadius: "50%",
                      background: "#00ffff",
                      position: "absolute",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: "1px solid #00ffff",
                      position: "absolute",
                      animation: "ping 3s infinite",
                      opacity: 0,
                    }}
                  ></div>
                </div>
                <div>
                  <div>LOC: G754.223</div>
                  <div>ALT: +35.7 AU</div>
                  <div>VEL: 2.45C</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="corner bottom-right"
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              color: "#00ffff",
              fontFamily: "monospace",
              zIndex: 10,
            }}
          >
            <div
              style={{
                border: "1px solid #00aaff",
                borderRadius: "4px",
                padding: "10px",
                background: "rgba(0,10,20,0.7)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 0 10px rgba(0,170,255,0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  color: "#00ffff",
                }}
              >
                SCAN RESULTS
              </div>
              <div style={{ fontSize: "12px" }}>
                <div>Objects: 5</div>
                <div>Lifeforms: 4.3B</div>
                <div>Anomalies: 1</div>
                <div>
                  <span style={{ color: "#ffaa00" }}>⚠ WARNING:</span>{" "}
                  Gravitational distortion detected
                </div>
              </div>
            </div>
          </div>

          <a
  href="https://unstop.com/college-fests/glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-355060"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    position: "absolute",
    bottom: isMobile ? "50px" : "100px",
    left: isMobile ? "60%" : "50%", // Shifted to 55% for desktop
    transform: isMobile ? "translateX(-50%)" : "none",
    zIndex: 10,
    textDecoration: "none",
  }}
>
  <div
    style={{
      color: "#00ffff",
      background: "rgba(0,20,40,0.7)",
      border: "2px solid #00aaff",
      padding: isMobile ? "8px 16px" : "10px 20px", // Reduced padding
      borderRadius: "8px",
      fontFamily: "monospace",
      fontSize: isMobile ? "14px" : "16px", // Reduced font size
      boxShadow: "0 0 20px rgba(0,170,255,0.7)",
      cursor: "pointer",
      textAlign: "center",
      width: isMobile ? "200px" : "220px", // Reduced width
      backdropFilter: "blur(5px)",
      position: "relative",
      overflow: "hidden",
      animation: "pulseGlow 2s infinite alternate",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        background:
          "linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(0,170,255,0.3) 50%, rgba(0,255,255,0.1) 100%)",
        animation: "hologramScan 4s linear infinite",
      }}
    ></div>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background:
          "linear-gradient(90deg, transparent, #00ffff, transparent)",
        animation: "hologramLine 3s linear infinite",
        boxShadow: "0 0 10px #00ffff",
      }}
    ></div>

    <div
      style={{
        position: "relative",
        zIndex: 2,
        textShadow: "0 0 10px #00aaff",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          color: "#00ffaa",
          fontSize: isMobile ? "16px" : "18px", // Reduced font size
          marginBottom: "5px",
          letterSpacing: "1px",
        }}
      >
        REGISTER NOW
      </div>
      <div
        style={{
          fontSize: isMobile ? "10px" : "12px", // Reduced font size
          marginTop: "5px",
          color: "#ffffff",
        }}
      >
        GLITCH 2025 · APRIL 18-20
      </div>
      <div
        style={{
          fontSize: isMobile ? "8px" : "10px", // Reduced font size
          marginTop: "5px",
          color: "#00ffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3px",
        }}
      >
        <span style={{ animation: "blink 1.5s infinite" }}>▼</span>
        CLICK TO BEGIN
        <span
          style={{
            animation: "blink 1.5s infinite",
            animationDelay: "0.5s",
          }}
        >
          ▼
        </span>
      </div>
    </div>
  </div>
</a>
        </>
      )}

      {hovered && !focusedObject && objectData[hovered] && (
        <div
          style={{
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
            animation: "fadeIn 0.3s",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #00aaff",
              paddingBottom: "10px",
              marginBottom: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{objectData[hovered].name}</span>
            <span
              style={{
                background: "#00aaff",
                color: "#000",
                fontSize: "10px",
                padding: "2px 6px",
                borderRadius: "10px",
              }}
            >
              SCANNING
            </span>
          </div>

          {hovered === "spaceship" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {objectData[hovered].events.slice(0, 3).map((event, index) => (
                <div
                  key={index}
                  style={{
                    padding: "8px",
                    borderLeft: `3px solid ${event.color}`,
                    background: "rgba(0,50,80,0.3)",
                  }}
                >
                  <div style={{ fontWeight: "bold", color: event.color }}>
                    {event.name}
                  </div>
                  <div style={{ fontSize: "12px" }}>⏱ {event.time}</div>
                </div>
              ))}
            </div>
          )}

          {(objectData[hovered]?.stats || []).map((stat, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                animation: `slideIn 0.5s ${index * 0.1}s both`,
              }}
            >
              <span>{stat.label}:</span>
              <span
                style={{
                  color: stat.color,
                  fontWeight: "bold",
                  display: "inline-block",
                  width: "100px",
                  position: "relative",
                  textAlign: "right",
                }}
              >
                {stat.value}
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    background: `linear-gradient(90deg, transparent 0%, ${stat.color}33 100%)`,
                    animation: "scanLine 2s infinite",
                  }}
                ></span>
              </span>
            </div>
          ))}

          <div
            style={{
              marginTop: "15px",
              height: "4px",
              background: "#003344",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #00aaff, #00ffaa)",
                width: "70%",
                animation: "progress 3s infinite",
              }}
            ></div>
          </div>
        </div>
      )}

      {focusedObject && objectData[focusedObject] && (
        <>
          {focusedObject === "spaceship" && !selectedEvent && (
            <>
              <div
                style={{
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
                  boxShadow: "0 0 10px rgba(0,170,255,0.5)",
                }}
                onClick={handleBackClick}
              >
                ← BACK TO SYSTEM VIEW
              </div>

              {/* 10-Grid Layout */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gridTemplateRows: "repeat(2, 1fr)",
                  gap: "20px",
                  width: "70%",
                  height: "50%",
                  zIndex: 999,
                }}
              >
                {objectData.spaceship.events.map((event, index) => (
                  <div
                    key={index}
                    style={{
                      border: `2px solid ${event.color}`,
                      borderRadius: "8px",
                      background: "rgba(0,20,40,0.7)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      boxShadow: `0 0 10px ${event.color}`,
                      color: "#ffffff",
                      fontFamily: "Orbitron",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    {event.name}
                  </div>
                ))}
              </div>
            </>
          )}

          {selectedEvent && (
            <>
              <div
                style={{
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
                  boxShadow: "0 0 10px rgba(0,170,255,0.5)",
                }}
                onClick={() => setSelectedEvent(null)}
              >
                ← BACK TO EVENTS
              </div>

              {/* Event Details */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  background: "rgba(0,10,20,0.85)",
                  border: `2px solid ${selectedEvent.color}`,
                  borderRadius: "8px",
                  padding: "20px",
                  color: "#ffffff",
                  fontFamily: "Orbitron",
                  textAlign: "center",
                  boxShadow: `0 0 20px ${selectedEvent.color}`,
                  zIndex: 1000,
                }}
              >
                <h2
                  style={{ color: selectedEvent.color, marginBottom: "20px" }}
                >
                  {selectedEvent.name}
                </h2>
                <p style={{ marginBottom: "10px" }}>⏱ {selectedEvent.time}</p>
                <p style={{ marginBottom: "10px" }}>
                  📍 {selectedEvent.location}
                </p>
                <p>{selectedEvent.description}</p>
              </div>
            </>
          )}
        </>
      )}

{focusedObject === "blackhole" && (
  <>
    <div
      style={{
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
        boxShadow: "0 0 10px rgba(0,170,255,0.5)",
      }}
      onClick={handleBackClick}
    >
      ← BACK TO SYSTEM VIEW
    </div>

    {/* Overlay */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(5px)",
        zIndex: 998,
      }}
    ></div>

    {/* Team Selection */}
    {isMobile ? (
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "80%",
          maxWidth: "300px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <select
            value={selectedTeam !== null ? selectedTeam : ""}
            onChange={(e) => setSelectedTeam(parseInt(e.target.value))}
            style={{
              width: "100%",
              padding: "12px",
              background: "rgba(0,20,40,0.7)",
              border: "2px solid #00aaff",
              borderRadius: "6px",
              color: "#00ffff",
              fontFamily: "monospace",
              fontSize: "16px",
              backdropFilter: "blur(4px)",
              appearance: "none",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(0,170,255,0.3)",
            }}
          >
            <option value="" disabled>
              ▼ SELECT TEAM ▼
            </option>
            {objectData.blackhole.teams.map((team, index) => (
              <option key={index} value={index}>
                {team.name}
              </option>
            ))}
          </select>
          <div
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#00ffff",
            }}
          >
            ▼
          </div>
        </div>
      </div>
    ) : (
      // Desktop Team Navigation
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          maxWidth: "90vw",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        {objectData.blackhole.teams.map((team, index) => (
          <div
            key={index}
            style={{
              padding: "10px 15px",
              background:
                selectedTeam === index
                  ? "rgba(0,170,255,0.3)"
                  : "rgba(0,50,80,0.3)",
              border: `1px solid ${
                selectedTeam === index ? "#00ffff" : "#00aaff"
              }`,
              borderRadius: "4px",
              cursor: "pointer",
              color: selectedTeam === index ? "#00ffff" : "#ffffff",
              fontFamily: "monospace",
              transition: "all 0.3s",
              backdropFilter: "blur(4px)",
              flexShrink: 0,
            }}
            onClick={() => setSelectedTeam(index)}
          >
            {team.name}
          </div>
        ))}
      </div>
    )}

    {/* Team Display */}
    <div
      style={{
        position: "absolute",
        top: isMobile ? "80px" : "50%",
        left: "50%",
        transform: isMobile ? "translateX(-50%)" : "translate(-50%, -50%)",
        width: isMobile ? "90%" : "80%",
        maxHeight: isMobile ? "calc(100vh - 120px)" : "70vh",
        overflowY: "auto",
        padding: "20px",
        zIndex: 999,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {selectedTeam !== null ? (
        <>
          {!isMobile && (
            <h2
              style={{
                gridColumn: "1 / -1",
                color: "#00ffff",
                textAlign: "center",
                marginBottom: "20px",
                fontFamily: "Orbitron",
              }}
            >
              {objectData.blackhole.teams[selectedTeam].name}
            </h2>
          )}

          {objectData.blackhole.teams[selectedTeam].members.map(
            (member, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(0,20,40,0.7)",
                  border: "1px solid #00aaff",
                  borderRadius: "8px",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 0 10px rgba(0,170,255,0.3)",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: `url(${member.img}) center/cover`,
                    border: "2px solid #00ffff",
                    boxShadow: "0 0 20px rgba(0,255,255,0.5)",
                  }}
                ></div>

                <h3
                  style={{
                    color: "#00ffff",
                    margin: "5px 0",
                    textAlign: "center",
                    fontFamily: "Orbitron",
                  }}
                >
                  {member.name}
                </h3>

                <p
                  style={{
                    color: "#ffffff",
                    margin: "5px 0",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {member.role}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "10px",
                  }}
                >
                  {member.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#00aaff",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>🔗</span> LinkedIn
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#ffffff",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>🔗</span> GitHub
                    </a>
                  )}
                </div>
              </div>
            )
          )}
        </>
      ) : (
        <div
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            color: "#00ffff",
            fontFamily: "Orbitron",
          }}
        >
          {isMobile ? "SELECT A TEAM FROM THE DROPDOWN" : "SELECT A TEAM TO VIEW MEMBERS"}
        </div>
      )}
    </div>
  </>
)}
      {focusedObject === "saturn" &&
        objectData.saturn &&
        objectData.saturn.sponsors && (
          <>
            <div
              style={{
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
                boxShadow: "0 0 10px rgba(0,170,255,0.5)",
              }}
              onClick={handleBackClick}
            >
              ← BACK TO SYSTEM VIEW
            </div>

            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(5px)",
                zIndex: 998,
              }}
            ></div>

            {/* Sponsors Title */}
            <div
              style={{
                position: "absolute",
                top: "80px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "#00ffff",
                fontFamily: "Orbitron",
                fontSize: "2.5rem",
                textAlign: "center",
                zIndex: 1000,
                textShadow: "0 0 15px rgba(0,255,255,0.5)",
                letterSpacing: "2px",
              }}
            >
              OUR SPONSORS
              <div
                style={{
                  width: "100px",
                  height: "3px",
                  background: "linear-gradient(90deg, #00aaff, #00ffaa)",
                  margin: "10px auto",
                  boxShadow: "0 0 10px #00ffff",
                }}
              ></div>
            </div>

            {/* Sponsors Grid */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                maxHeight: "70vh",
                overflowY: "auto",
                padding: "20px",
                zIndex: 999,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
              }}
            >
              {objectData.saturn.sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(0,20,40,0.7)",
                    border: `2px solid ${sponsor.color}`,
                    borderRadius: "8px",
                    padding: "25px",
                    textAlign: "center",
                    boxShadow: `0 0 20px ${sponsor.color}80`,
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Sponsor Tier */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: sponsor.color,
                      color: "#000",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                    }}
                  >
                    {sponsor.tier}
                  </div>

                  {/* Sponsor Logo */}
                  <div
                    style={{
                      height: "80px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                      }}
                    />
                  </div>

                  {/* Sponsor Name */}
                  <h3
                    style={{
                      color: "#00ffff",
                      margin: "10px 0",
                      fontFamily: "Orbitron",
                      fontSize: "1.5rem",
                      textShadow: "0 0 10px rgba(0,255,255,0.5)",
                    }}
                  >
                    {sponsor.name}
                  </h3>

                  {/* Sponsor Description */}
                  <p
                    style={{
                      color: "#ffffff",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      opacity: 0.8,
                      marginBottom: "0",
                    }}
                  >
                    {sponsor.description}
                  </p>

                  {/* Glow effect on hover */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(45deg, transparent, ${sponsor.color}20, transparent)`,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </>
        )}

      {focusedObject === "moon" && (
        <>
          <div
            style={{
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
              boxShadow: "0 0 10px rgba(0,170,255,0.5)",
            }}
            onClick={handleBackClick}
          >
            ← BACK TO SYSTEM VIEW
          </div>

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(5px)",
              zIndex: 998,
            }}
          ></div>

          {/* Contact Title */}
          <div
            style={{
              position: "absolute",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#00ffff",
              fontFamily: "Orbitron",
              fontSize: "2.5rem",
              textAlign: "center",
              zIndex: 1000,
              textShadow: "0 0 15px rgba(0,255,255,0.5)",
              letterSpacing: "2px",
            }}
          >
            CONTACT US
            <div
              style={{
                width: "100px",
                height: "3px",
                background: "linear-gradient(90deg, #00aaff, #00ffaa)",
                margin: "10px auto",
                boxShadow: "0 0 10px #00ffff",
              }}
            ></div>
          </div>

          {/* Contact Cards */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              zIndex: 999,
              width: "80%",
              maxWidth: "1000px",
            }}
          >
            {/* Aditya Rastogi Card */}
            <div
              style={{
                background: "rgba(0,20,40,0.7)",
                border: "1px solid #00aaff",
                borderRadius: "8px",
                padding: "25px",
                width: "300px",
                boxShadow: "0 0 20px rgba(0,170,255,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backdropFilter: "blur(5px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  border: "2px solid #00ffff",
                  background: "url('/images/adityarast.webp') center/cover",
                  marginBottom: "20px",
                  boxShadow: "0 0 20px rgba(0,255,255,0.5)",
                }}
              ></div>

              <h3
                style={{
                  color: "#00ffff",
                  margin: "0 0 10px 0",
                  fontFamily: "Orbitron",
                  fontSize: "1.5rem",
                }}
              >
                Aditya Rastogi
              </h3>

              <div
                style={{
                  width: "100%",
                  margin: "15px 0",
                  borderTop: "1px solid #00aaff",
                }}
              ></div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#00aaff", fontSize: "20px" }}>✉️</span>
                  <span style={{ color: "#ffffff" }}>aditya.rastogi.22cse@bmu.edu.in</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#00aaff", fontSize: "20px" }}>📱</span>
                  <span style={{ color: "#ffffff" }}>+91 88264 27240</span>
                </div>
              </div>

              {/* Glow effect */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(45deg, transparent, rgba(0,170,255,0.1), transparent)",
                  pointerEvents: "none",
                  opacity: 0.5,
                }}
              ></div>
            </div>

            {/* Shrey Jaiswal Card */}
            <div
              style={{
                background: "rgba(0,20,40,0.7)",
                border: "1px solid #00aaff",
                borderRadius: "8px",
                padding: "25px",
                width: "300px",
                boxShadow: "0 0 20px rgba(0,170,255,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backdropFilter: "blur(5px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  border: "2px solid #00ffff",
                  background: "url('/images/shrey.webp') center/cover",
                  marginBottom: "20px",
                  boxShadow: "0 0 20px rgba(0,255,255,0.5)",
                }}
              ></div>

              <h3
                style={{
                  color: "#00ffff",
                  margin: "0 0 10px 0",
                  fontFamily: "Orbitron",
                  fontSize: "1.5rem",
                }}
              >
                Shrey Jaiswal
              </h3>

              <div
                style={{
                  width: "100%",
                  margin: "15px 0",
                  borderTop: "1px solid #00aaff",
                }}
              ></div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#00aaff", fontSize: "20px" }}>✉️</span>
                  <span style={{ color: "#ffffff" }}>shrey.jaiswal.23cse@bmu.edu.in</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#00aaff", fontSize: "20px" }}>📱</span>
                  <span style={{ color: "#ffffff" }}>+91 88823 45939</span>
                </div>
              </div>

              {/* Glow effect */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(45deg, transparent, rgba(0,170,255,0.1), transparent)",
                  pointerEvents: "none",
                  opacity: 0.5,
                }}
              ></div>
            </div>
          </div>

          {/* General Contact Info */}
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#ffffff",
              background: "rgba(0,10,20,0.7)",
              border: "1px solid #00aaff",
              padding: "15px 25px",
              borderRadius: "8px",
              fontFamily: "monospace",
              textAlign: "center",
              zIndex: 999,
              backdropFilter: "blur(5px)",
              boxShadow: "0 0 15px rgba(0,170,255,0.3)",
            }}
          >
            <h4
              style={{
                color: "#00ffff",
                margin: "0 0 10px 0",
                fontFamily: "Orbitron",
              }}
            >
              GENERAL INQUIRIES
            </h4>
            <div
              style={{ display: "flex", gap: "20px", justifyContent: "center" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <span>✉️</span>
                <span >acm@bmu.edu.in</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
               
              </div>
            </div>
          </div>
        </>
      )}

      {!focusedObject && (
        <div
          style={{
            position: "absolute",
            bottom: "40%",
            left: "50%",
            transform: "translate(-50%, 50%)",
            color: "#ffffff",
            background: "rgba(0,10,20,0.7)",
            backdropFilter: "blur(5px)",
            padding: "10px 20px",
            borderRadius: "30px",
            border: "1px solid #00aaff",
            fontFamily: "monospace",
            fontSize: "16px",
            boxShadow: "0 0 20px rgba(0,170,255,0.5)",
            zIndex: 5,
            opacity: 0.8,
            transition: "opacity 0.3s",
            animation: "float 3s infinite ease-in-out",
          }}
        >
          CLICK ON OBJECTS TO EXAMINE THEM
        </div>
      )}

      {focusedObject === "mars" && (
        <>
          <div
            style={{
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
              boxShadow: "0 0 10px rgba(0,170,255,0.5)",
            }}
            onClick={handleBackClick}
          >
            ← BACK TO SYSTEM VIEW
          </div>

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(5px)",
              zIndex: 998,
            }}
          ></div>

          {/* About Title */}
          <div
            style={{
              position: "absolute",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#00ffff",
              fontFamily: "Orbitron",
              fontSize: "2.5rem",
              textAlign: "center",
              zIndex: 1000,
              textShadow: "0 0 15px rgba(0,255,255,0.5)",
              letterSpacing: "2px",
            }}
          >
            ABOUT GLITCH
            <div
              style={{
                width: "100px",
                height: "3px",
                background: "linear-gradient(90deg, #00aaff, #00ffff)",
                margin: "10px auto",
                boxShadow: "0 0 10px #00ffff",
              }}
            ></div>
          </div>

          {/* About Content */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              maxWidth: "800px",
              background: "rgba(0,20,40,0.7)",
              border: "1px solid #00aaff",
              borderRadius: "8px",
              padding: "30px",
              color: "#ffffff",
              fontFamily: "monospace",
              zIndex: 999,
              backdropFilter: "blur(5px)",
              boxShadow: "0 0 20px rgba(0,170,255,0.3)",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              <h2
                style={{
                  color: "#00ffff",
                  fontFamily: "Orbitron",
                  fontSize: "1.8rem",
                  marginBottom: "15px",
                  textShadow: "0 0 10px rgba(0,255,255,0.5)",
                }}
              >
                <span style={{ color: "#00aaff" }}>GLITCH 2025</span> is an
                annual technical celebration
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                }}
              >
                Organized by the BML Munjal University ACM Student Chapter in
                collaboration with regional ACM student chapters across India.
              </p>
            </div>

            <div
              style={{
                borderTop: "1px solid #00aaff",
                borderBottom: "1px solid #00aaff",
                padding: "20px 0",
                margin: "20px 0",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                }}
              >
                Join us for three days of cutting-edge technology, thrilling
                competitions, hands-on workshops, and immersive entertainment as
                we bring together tech enthusiasts, coders, innovators, and
                creators from across the nation.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                marginBottom: "20px",
                color: "#00ffff",
              }}
            >
              <div style={{ fontSize: "24px" }}>🗓️</div>
              <div style={{ fontSize: "1.2rem" }}>April 18-20, 2025</div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <a
                href="https://unstop.com/college-fests/glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-355060"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    padding: "12px 30px",
                    background: "linear-gradient(90deg, #00aaff, #00ffff)",
                    color: "#000",
                    borderRadius: "4px",
                    fontFamily: "Orbitron",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    boxShadow: "0 0 15px rgba(0,170,255,0.5)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  REGISTER NOW
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transform: "translateX(-100%)",
                      transition: "transform 0.3s",
                    }}
                  ></div>
                </div>
              </a>
            </div>

            {/* Stats Section */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  background: "rgba(0,50,80,0.5)",
                  border: "1px solid #00aaff",
                  borderRadius: "8px",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    color: "#00ffff",
                    marginBottom: "10px",
                  }}
                >
                  50+
                </div>
                <div style={{ fontSize: "0.9rem" }}>EVENTS & WORKSHOPS</div>
              </div>
              <div
                style={{
                  background: "rgba(0,50,80,0.5)",
                  border: "1px solid #00aaff",
                  borderRadius: "8px",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    color: "#00ffff",
                    marginBottom: "10px",
                  }}
                >
                  1000+
                </div>
                <div style={{ fontSize: "0.9rem" }}>PARTICIPANTS</div>
              </div>
              <div
                style={{
                  background: "rgba(0,50,80,0.5)",
                  border: "1px solid #00aaff",
                  borderRadius: "8px",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    color: "#00ffff",
                    marginBottom: "10px",
                  }}
                >
                  20+
                </div>
                <div style={{ fontSize: "0.9rem" }}>SPEAKERS</div>
              </div>
              <div
                style={{
                  background: "rgba(0,50,80,0.5)",
                  border: "1px solid #00aaff",
                  borderRadius: "8px",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    color: "#00ffff",
                    marginBottom: "10px",
                  }}
                >
                  3
                </div>
                <div style={{ fontSize: "0.9rem" }}>DAYS OF INNOVATION</div>
              </div>
            </div>
          </div>
        </>
      )}

      {showOrientationPrompt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#00ffff",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "20px" }}>
            🔄 Please rotate your device to landscape mode
          </div>
          <div style={{ fontSize: "16px", marginBottom: "30px" }}>
            For the best experience, we recommend viewing this site in landscape
            orientation.
          </div>
          <div
            style={{
              width: "80px",
              height: "80px",
              border: "4px solid #00ffff",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "rotatePrompt 2s infinite",
            }}
          >
            <div style={{ fontSize: "40px" }}>↷</div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scanLine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          75% {
            width: 85%;
          }
          90% {
            width: 95%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, 50%);
          }
          50% {
            transform: translate(-50%, calc(50% - 5px));
          }
        }

        @keyframes ping {
          0% {
            transform: scale(0.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 20px rgba(0, 170, 255, 0.7);
            transform: translateX(-50%) translateY(0) scale(1);
          }
          100% {
            box-shadow: 0 0 40px rgba(0, 255, 255, 0.9);
            transform: translateX(-50%) translateY(-5px) scale(1.02);
          }
        }

        @keyframes hologramScan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes hologramLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes beamPulse {
          0%,
          100% {
            opacity: 0.5;
            height: 40px;
          }
          50% {
            opacity: 1;
            height: 50px;
          }
        }

        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0.5;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 20, 40, 0.5);
          borderradius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #00aaff;
          borderradius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #00ffff;
        }
        @keyframes rotatePrompt {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(90deg);
          }
        }

        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

const Clock = ({ isMobile }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div style={{ display: "flex", gap: isMobile ? "3px" : "5px", alignItems: "center" }}>
      <div
        style={{
          background: "rgba(0,50,80,0.5)",
          padding: isMobile ? "3px" : "5px",
          fontSize: isMobile ? "12px" : "14px",
          borderRadius: "3px",
          border: "1px solid #00aaff",
        }}
      >
        {hours}
      </div>
      <div style={{ animation: "blink 1s infinite" }}>:</div>
      <div
        style={{
          background: "rgba(0,50,80,0.5)",
          padding: isMobile ? "3px" : "5px",
          fontSize: isMobile ? "12px" : "14px",
          borderRadius: "3px",
          border: "1px solid #00aaff",
        }}
      >
        {minutes}
      </div>
      <div style={{ animation: "blink 1s infinite" }}>:</div>
      <div
        style={{
          background: "rgba(0,50,80,0.5)",
          padding: isMobile ? "3px" : "5px",
          fontSize: isMobile ? "12px" : "14px",
          borderRadius: "3px",
          border: "1px solid #00aaff",
        }}
      >
        {seconds}
      </div>
    </div>
  );
};

// Wrap Planets with ErrorBoundary
export default function App() {
  return (
    <ErrorBoundary>
      <Planets />
    </ErrorBoundary>
  );
}