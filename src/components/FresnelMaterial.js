import * as THREE from "three";

export function getFresnelMat({ rimHex = 0x0088ff, facingHex = 0x000000 } = {}) {
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  const vs = `
    varying float vReflectionFactor;
    void main() {
      vec3 worldNormal = normalize(normal);
      vec3 I = normalize(position - cameraPosition);
      vReflectionFactor = 0.1 + 1.0 * pow(1.0 + dot(I, worldNormal), 4.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fs = `
    uniform vec3 color1;
    uniform vec3 color2;
    varying float vReflectionFactor;
    void main() {
      gl_FragColor = vec4(mix(color2, color1, vec3(vReflectionFactor)), vReflectionFactor);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
}
