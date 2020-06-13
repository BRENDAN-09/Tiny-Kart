THREE.KartMat = new THREE.ShaderMaterial({
  uniforms: {
    color:{value:new THREE.Color()},
    mat:{value:new THREE.Matrix4()},
    steer:{value:new THREE.Matrix4()}
  },
  vertexShader:`
  varying vec2 vUv;
  uniform mat4 mat;
  uniform mat4 steer;
  void main()
  {
    vUv = uv;
    vec3 rotated = mat3(mat) * mat3(steer) * position;
    vec4 mvPosition = modelViewMatrix * vec4(rotated, 1.);
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  fragmentShader:`
  uniform vec3 color;
  varying vec2 vUv;
  void main( void ) {
    gl_FragColor = vec4(vUv.x*color,1.0);
  }
  `
});
